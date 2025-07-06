"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"
import { LoadingSpinner } from "./LoadingSpinner"
import { enhancePromptAPI } from "../utils/api"
import type { EnhancerData } from "../types"

const tones = ["Formal", "Creative", "Funny", "Neutral"]
const languages = ["EN", "FR", "HI", "ES", "DE", "JA"]

interface EnhancerTabProps {
  copiedStates: { [key: string]: boolean }
  copyToClipboard: (text: string, key: string) => void
}

export const EnhancerTab = ({ copiedStates, copyToClipboard }: EnhancerTabProps) => {
  const [selectedTone, setSelectedTone] = useState("Neutral")
  const [selectedLanguage, setSelectedLanguage] = useState("EN")
  const [rawText, setRawText] = useState("")
  const [context, setContext] = useState("")
  const [tokenLimit, setTokenLimit] = useState("")
  const [enhancedText, setEnhancedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEnhanced, setIsEnhanced] = useState(false)

  const enhanceWithAI = async () => {
    setIsLoading(true)
    try {
      const data: EnhancerData = {
        rawText,
        context,
        tokenLimit,
        tone: selectedTone,
        language: selectedLanguage,
      }

      const response = await enhancePromptAPI(data)
      if (response.success) {
        setEnhancedText(response.data)
        setIsEnhanced(true)
      }
    } catch (error) {
      console.error("Enhancement failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <CopyButton onCopy={() => copyToClipboard(enhancedText, "enhancer")} isCopied={copiedStates.enhancer} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-100 mb-2">Raw Text Input</label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="w-full h-24 sm:h-32 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none text-sm sm:text-base"
          placeholder="Enter your raw text to enhance into a solid prompt..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-100 mb-2">Add Context</label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm sm:text-base"
            placeholder="Additional context..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-100 mb-2">Token Limit</label>
          <input
            type="number"
            value={tokenLimit}
            onChange={(e) => setTokenLimit(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm sm:text-base"
            placeholder="e.g., 1000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-100 mb-3">Tone Selection</label>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                selectedTone === tone ? "bg-sky-500 text-white" : "bg-slate-700 text-slate-100 hover:bg-slate-600"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-100 mb-3">Language Selection</label>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                selectedLanguage === lang ? "bg-sky-500 text-white" : "bg-slate-700 text-slate-100 hover:bg-slate-600"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={enhanceWithAI}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          {isLoading ? "Enhancing..." : "Enhance with AI"}
        </button>
      </div>

      {isLoading && <LoadingSpinner />}

      {isEnhanced && !isLoading && (
        <div className="bg-slate-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm font-medium text-slate-100 mb-3">Enhanced Output</h4>
          <pre className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap font-mono bg-slate-900 p-3 sm:p-4 rounded overflow-x-auto">
            {enhancedText}
          </pre>
        </div>
      )}
    </div>
  )
}