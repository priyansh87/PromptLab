import type {
  EnhancerData,
  TransformerData,
  WorkflowData,
  APIResponse,
} from "../types";
// import { agentEnhacer } from "./agents";

// import { createAgent, gemini } from "@inngest/agent-kit";

// Mock API delay function
const mockDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// export const enhancePromptAPI = async (
//   data: EnhancerData
// ): Promise<APIResponse> => {
//   // TODO: Replace with actual API call
//   const agent = createAgent({
//     name: "Prompt Enhancer",
//     system: "You are an AI assistant that enhances prompts for better clarity and effectiveness. You will receive a raw prompt and additional parameters to optimize it. Make sure to follow the provided tone, language, and context guidelines. If no context is provided, assume a general context.",
//     model: gemini({
//       model: "gemini-1.5-flash",
//       apiKey: "AIzaSyDIKVUzeHayJllQbGdppm0jkCGwBbJ3Ees",
//     }),
//   });

  

//   const userPrompt = `User Prompt :  ${
//     data.rawText || "Your enhanced prompt will appear here"
//   }

// Configuration:
// {
//   "tone": "${data.tone}",
//   "language": "${data.language}",
//   "context": "${data.context || "No additional context provided"}",
//   "tokenLimit": ${data.tokenLimit || "null"}
// }
// Enhance the prompt by applying the following guidelines:`;
// const { output } = await agent.run(userPrompt);
// console.log(output);
// return {
//   success: true,
//     data: enhancedPrompt,
//   };
// };

// import type {
//   EnhancerData,
//   TransformerData,
//   WorkflowData,
//   APIResponse,
// } from "../types";
// import { agentEnhacer } from "./agents";

// // Optional: Simulate delay (good for testing loading UI)
// const mockDelay = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// export const enhancePromptAPI = async (data: EnhancerData): Promise<string> => {
//   // Handle defaults + formatting
//   const {
//     rawText = "Your enhanced prompt will appear here.",
//     tone = "neutral",
//     language = "English",
//     context = "No additional context provided",
//     tokenLimit = null,
//   } = data;

//   const systemPrompt = `
// You are a prompt refinement assistant.
// Take the following raw prompt and improve it with clear instructions, good structure, and tone adjustments.

// User Prompt:
// "${rawText}"

// Configuration:
// {
//   "tone": "${tone}",
//   "language": "${language}",
//   "context": "${context}",
//   "tokenLimit": ${tokenLimit || "null"}
// }

// Please return only the refined prompt, no explanations.
// `;

//   // Optional fake delay for testing
//   // await mockDelay(1000);

//   // Pass to agent
//   const enhancedPrompt = await agentEnhacer(systemPrompt);
//   return {
//     success: true,
//       data: enhancedPrompt,
//     };
// };


// import { agentEnhacer } from "./agents";

// export const enhancePromptAPI = async (data: EnhancerData): Promise<APIResponse> => {
//   try {
//     const {
//       rawText = "Your enhanced prompt will appear here.",
//       tone = "neutral",
//       language = "English",
//       context = "No additional context provided",
//       tokenLimit = null,
//     } = data;

//     const systemPrompt = `
// You are a prompt refinement assistant.
// Take the following raw prompt and improve it with clear instructions, structure, and tone adjustments.

// User Prompt:
// "${rawText}"

// Configuration:
// {
//   "tone": "${tone}",
//   "language": "${language}",
//   "context": "${context}",
//   "tokenLimit": ${tokenLimit}
// }

// Please return only the refined prompt. No explanations.
// `;

//     const enhancedPrompt = await agentEnhacer(systemPrompt);

//     return {
//       success: true,
//       data: enhancedPrompt,
//     };
//   } catch (err: any) {
//     console.error("Enhancer error:", err.message);
//     return {
//       success: false,
//       data: null,
//       error: err.message || "Enhancement failed",
//     };
//   }
// };
// import type { TransformerData, WorkflowData, APIResponse } from "../types";

export const enhancePromptAPI = async (
  data: EnhancerData
): Promise<APIResponse> => {
  try {
    const res = await fetch("/api/style-transformer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    return {
      success: true,
      data: json.data,
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || "API call failed",
    };
  }
};











export const transformPromptAPI = async (
  data: TransformerData
): Promise<APIResponse> => {
  try {
    console.log("Transforming prompt with data: in api.ts", data);
    const res = await fetch("/api/style-transformer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    return {
      success: true,
      data: json.data,
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || "API call failed",
    };
  }
};

export const generateWorkflowAPI = async (
  data: WorkflowData
): Promise<APIResponse> => {
  // TODO: Replace with actual API call
  await mockDelay(2000);

  const workflowText = `Recommended LLM Pipeline Architecture:

Task: ${data.taskDescription || "No task description provided"}

Suggested Flow:
1. Input Processing & Validation
2. Chunking Strategy (if needed)
3. Parallel Processing with Map-Reduce
4. Retry Logic & Error Handling
5. Output Aggregation & Formatting

Implementation Notes:
- Use async processing for better performance
- Implement exponential backoff for retries
- Consider rate limiting for API calls
- Add comprehensive logging and monitoring`;

  return {
    success: true,
    data: workflowText,
  };
};
