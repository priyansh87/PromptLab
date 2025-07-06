export interface Tab {
  id: string
  label: string
  icon: any
}

export interface PromptStyle {
  id: string
  label: string
  icon: any
}

export interface EnhancerData {
  rawText: string
  context: string
  tokenLimit: string
  tone: string
  language: string
}

export interface TransformerData {
  inputPrompt: string
  selectedStyle: string
}

export interface WorkflowData {
  taskDescription: string
}

export interface APIResponse {
  success: boolean
  data: string
  error?: string
}
