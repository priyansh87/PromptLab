import { createAgent, gemini } from "@inngest/agent-kit";

export const agentEnhacer = async (data:string) => {
  const agent = createAgent({
    name: "Prompt Enhancer",
    system: "You are an AI assistant that enhances prompts for better clarity and effectiveness. You will receive a raw prompt and additional parameters to optimize it. Make sure to follow the provided tone, language, and context guidelines. If no context is provided, assume a general context.",
    model: gemini({
      model: "gemini-1.5-flash",
      apiKey: process.env.GEMINI_API_KEY ,
    }),
  });

  const { output } = await agent.run(data);
  return output;
};


export const agentStyleTransformer = async (data:string) => {
  const agent = createAgent({
    name: "Prompt Style Transformer",
    system: "You are an AI prompt engineer. Your task is to convert a given raw prompt into various specified prompting techniques. You will receive a raw prompt and a list of target prompting techniques. Use the provided list to rewrite the raw prompt, ensuring each rewritten prompt exemplifies the specified technique. Output should clearly label each rewritten prompt with the corresponding technique used. Assume a general context if none is provided.",
    model: gemini({
      model: "gemini-1.5-flash",
      apiKey: process.env.GEMINI_API_KEY ,
    }),
  });

  const { output } = await agent.run(data);
  return output;
};