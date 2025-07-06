"use client"

import { Copy, Check } from "lucide-react"

interface CopyButtonProps {
  onCopy: () => void
  isCopied: boolean
}

export const CopyButton = ({ onCopy, isCopied }: CopyButtonProps) => {
  return (
    <button
      onClick={onCopy}
      className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded text-sm transition-colors"
    >
      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {isCopied ? "Copied!" : "Copy"}
    </button>
  )
}
