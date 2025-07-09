"use client"

import { useState } from "react"
import { Brain, Lightbulb, FlaskConical, Rocket, TreePine, User } from "lucide-react"
import { CopyButton } from "./CopyButton"
import { LoadingSpinner } from "./LoadingSpinner"
import { transformPromptAPI } from "../utils/api"
import type { TransformerData, PromptStyle } from "../types"
import ReactMarkdown from 'react-markdown';

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
      let output = response.data

      // If output is object (like JSON), pretty-print it
      if (typeof output === "object") {
        output = JSON.stringify(output, null, 2)
      }
      // Remove ```json or ``` from start and end
      output = output.trim();
      if (output.startsWith("```json")) {
        output = output.slice(7); // remove ```json\n
      }
      if (output.endsWith("```")) {
        output = output.slice(0, -3); // remove ending ```
      }
      // Remove any leading/trailing whitespace
      output = output.trim();
      // convert to json object and extract content if needed
      const parsed = JSON.parse(output);
      const prompt = parsed?.[0]?.rewrittenPrompt;
      setTransformedText(prompt)
      setIsTransformed(true)
    } catch (error) {
      console.error("Transformation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <CopyButton
          onCopy={() => copyToClipboard(transformedText, "transformer")}
          isCopied={copiedStates.transformer}
        />
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-4">
          Convert your prompt into various LLM techniques
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {promptStyles.map((style) => {
            const Icon = style.icon
            const isActive = activeStyle === style.id
            return (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style.id)}
                className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg transition-all text-sm sm:text-base ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium text-left">{style.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {activeStyle && (
        <div className="bg-slate-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm font-medium text-slate-100 mb-2">Selected Technique:</h4>
          <span className="px-2 sm:px-3 py-1 bg-green-500 text-white text-xs sm:text-sm rounded-full">
            {promptStyles.find((s) => s.id === activeStyle)?.label}
          </span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-100 mb-2">Input Prompt</label>
        <textarea
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none text-sm sm:text-base"
          placeholder="Enter your prompt to transform..."
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={enhanceWithAI}
          disabled={isLoading || !activeStyle || !inputPrompt.trim()}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          {isLoading ? "Transforming..." : "Enhance with AI"}
        </button>
      </div>

      {isLoading && <LoadingSpinner />}

      {isTransformed && !isLoading && (
        <div>
          <label className="block text-sm font-medium text-slate-100 mb-2">Transformed Output</label>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 sm:p-4 min-h-[100px]">
            <pre className="text-slate-300 whitespace-pre-wrap text-xs sm:text-sm overflow-x-auto">
              
              <ReactMarkdown>{transformedText}</ReactMarkdown>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
