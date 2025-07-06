"use client"

import { useState } from "react"
import { Brain, Lightbulb, FlaskConical, Rocket, TreePine, User } from "lucide-react"
import { CopyButton } from "./CopyButton"
import { LoadingSpinner } from "./LoadingSpinner"
import { transformPromptAPI } from "../utils/api"
import type { TransformerData, PromptStyle } from "../types"

const promptStyles: PromptStyle[] = [
  { id: "cot", label: "Chain of Thought", icon: Brain },
  { id: "react", label: "ReAct", icon: Lightbulb },
  { id: "fewshot", label: "Few-shot", icon: FlaskConical },
  { id: "zeroshot", label: "Zero-shot", icon: Rocket },
  { id: "tot", label: "Tree of Thought", icon: TreePine },
  { id: "role", label: "Role Prompting", icon: User },
]

interface TransformerTabProps {
  copiedStates: { [key: string]: boolean }
  copyToClipboard: (text: string, key: string) => void
}

export const TransformerTab = ({ copiedStates, copyToClipboard }: TransformerTabProps) => {
  const [activeStyle, setActiveStyle] = useState<string>("")
  const [inputPrompt, setInputPrompt] = useState("")
  const [transformedText, setTransformedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTransformed, setIsTransformed] = useState(false)

  const handleStyleSelect = (styleId: string) => {
    setActiveStyle(activeStyle === styleId ? "" : styleId)
    setIsTransformed(false)
  }

  const enhanceWithAI = async () => {
    if (!activeStyle || !inputPrompt.trim()) return

    setIsLoading(true)
    try {
      const data: TransformerData = {
        inputPrompt,
        selectedStyle: promptStyles.find((s) => s.id === activeStyle)?.label || activeStyle,
      }

      const response = await transformPromptAPI(data)
      if (response.success) {
        setTransformedText(response.data)
        setIsTransformed(true)
      }
    } catch (error) {
      console.error("Transformation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <CopyButton
          onCopy={() => copyToClipboard(transformedText, "transformer")}
          isCopied={copiedStates.transformer}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Convert your prompt into various LLM techniques</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptStyles.map((style) => {
            const Icon = style.icon
            const isActive = activeStyle === style.id
            return (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style.id)}
                className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{style.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {activeStyle && (
        <div className="bg-slate-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-100 mb-2">Selected Technique:</h4>
          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
            {promptStyles.find((s) => s.id === activeStyle)?.label}
          </span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-100 mb-2">Input Prompt</label>
        <textarea
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="w-full h-24 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
          placeholder="Enter your prompt to transform..."
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={enhanceWithAI}
          disabled={isLoading || !activeStyle || !inputPrompt.trim()}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
        >
          {isLoading ? "Transforming..." : "Enhance with AI"}
        </button>
      </div>

      {isLoading && <LoadingSpinner />}

      {isTransformed && !isLoading && (
        <div>
          <label className="block text-sm font-medium text-slate-100 mb-2">Transformed Output</label>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 min-h-[100px]">
            <pre className="text-slate-300 whitespace-pre-wrap text-sm">{transformedText}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
