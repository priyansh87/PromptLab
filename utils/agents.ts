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



export const agentWorkflow = async (data:string) => {
  const agent = createAgent({
    name: "Workflow Recommender",
    system: `You are an AI assistant that recommends workflows for generative ai projects. You will receive a project description with requirements and constraints. Based on this, provide a detailed workflow recommendation that includes the use of orchestrators, parallelization, routing mechanisms, and fan-out embeddings where applicable. Ensure the workflow is efficient, scalable, and meets the project's requirements. Provide examples to illustrate your recommendations.
    Format your response as a JSON object with the following structure:
    {
      "workflow": "Detailed description of the recommended workflow",
      "examples": [
        {
          "example": "Example 1 description",
          "details": "using few shot technique would be better for this project. Fanout the initial prompt to multiple models for diverse outputs. Use an orchestrator to manage the workflow and ensure efficient routing of tasks. Can you Hyde Technique and also embeed the data in qdrant db, since relations are required use graph db as well"
        },
        {
          "example": "Example 2 description",
          "details": "using zero shot technique would be better for this project. Leverage existing knowledge and context without additional examples."
        }
      ]
    }`,

    model: gemini({
      model: "gemini-1.5-flash",
      apiKey: process.env.GEMINI_API_KEY ,
    }),
  });

  const { output } = await agent.run(data);
  return output;
};



