"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Zap, Brain } from "lucide-react"
import { EnhancerTab } from "../components/EnhancerTab"
import { TransformerTab } from "../components/TransformerTab"
import { WorkflowTab } from "../components/WorkflowTab"
import { useClipboard } from "../hooks/useClipboard"
import type { Tab } from "../types"

const tabs: Tab[] = [
  { id: "enhancer", label: "Enhancer", icon: Zap },
  { id: "transformer", label: "Style Transformer", icon: Settings },
  { id: "workflow", label: "Workflow Recommender", icon: Brain },
]

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState("enhancer")
  const { copiedStates, copyToClipboard } = useClipboard()

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "enhancer":
        return <EnhancerTab copiedStates={copiedStates} copyToClipboard={copyToClipboard} />
      case "transformer":
        return <TransformerTab copiedStates={copiedStates} copyToClipboard={copyToClipboard} />
      case "workflow":
        return <WorkflowTab copiedStates={copiedStates} copyToClipboard={copyToClipboard} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Prompt Engineering Toolkit</h1>
          <p className="text-slate-400">Enhance, transform, and optimize your AI prompts</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-sky-500 text-white shadow-lg"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
          {activeTab && (
            <div className="mt-4 flex justify-center">
              <div className="w-96 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-sky-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "33.33%", x: `${tabs.findIndex((t) => t.id === activeTab) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-700/50"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
