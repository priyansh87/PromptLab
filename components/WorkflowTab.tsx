"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"
import { LoadingSpinner } from "./LoadingSpinner"
import { generateWorkflowAPI } from "../utils/api"
import type { WorkflowData } from "../types"

interface WorkflowTabProps {
  copiedStates: { [key: string]: boolean }
  copyToClipboard: (text: string, key: string) => void
}

export const WorkflowTab = ({ copiedStates, copyToClipboard }: WorkflowTabProps) => {
  const [taskDescription, setTaskDescription] = useState("")
  const [workflowText, setWorkflowText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const enhanceWithAI = async () => {
    if (!taskDescription.trim()) return

    setIsLoading(true)
    try {
      const data: WorkflowData = {
        taskDescription,
      }

      const response = await generateWorkflowAPI(data)
      if (response.success) {
        setWorkflowText(response.data)
        setIsGenerated(true)
      }
    } catch (error) {
      console.error("Workflow generation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <CopyButton onCopy={() => copyToClipboard(workflowText, "workflow")} isCopied={copiedStates.workflow} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-100 mb-2">Task Description</label>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none text-sm sm:text-base"
          placeholder="Describe your LLM task or pipeline requirements..."
        />
      </div>

      <div className="bg-slate-800 rounded-lg p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-4">Suggested Architecture</h4>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full flex-shrink-0"></div>
            <span className="text-slate-100 text-sm sm:text-base">Input Processing & Validation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full flex-shrink-0"></div>
            <span className="text-slate-100 text-sm sm:text-base">Chunking Strategy (if needed)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full flex-shrink-0"></div>
            <span className="text-slate-100 text-sm sm:text-base">Parallel Processing with Map-Reduce</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full flex-shrink-0"></div>
            <span className="text-slate-100 text-sm sm:text-base">Retry Logic & Error Handling</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full flex-shrink-0"></div>
            <span className="text-slate-100 text-sm sm:text-base">Output Aggregation & Formatting</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={enhanceWithAI}
          disabled={isLoading || !taskDescription.trim()}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          {isLoading ? "Generating..." : "Enhance with AI"}
        </button>
      </div>

      {isLoading && <LoadingSpinner />}

      {isGenerated && !isLoading && (
        <div className="bg-slate-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm font-medium text-slate-100 mb-3">Workflow Details</h4>
          <pre className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap font-mono overflow-x-auto">{workflowText}</pre>
        </div>
      )}
    </div>
  )
}