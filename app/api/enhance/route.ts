import { NextRequest, NextResponse } from "next/server";
import { agentEnhacer } from "@/utils/agents";
import type { EnhancerData } from "@/types";

export async function POST(req: NextRequest) {
  const data: EnhancerData = await req.json();
  console.log("Enhancer Data Received:", data);

  const {
    rawText = "Your enhanced prompt will appear here.",
    tone = "neutral",
    language = "English",
    context = "No additional context provided",
    tokenLimit = null,
  } = data;

  const systemPrompt = `
You are a prompt refinement assistant.
Take the following raw prompt and improve it with clear instructions, structure, and tone adjustments.

User Prompt:
"${rawText}"

Configuration:
{
  "tone": "${tone}",
  "language": "${language}",
  "context": "${context}",
  "tokenLimit": ${tokenLimit}
}

Please return only the refined prompt. No explanations.
`;

  const enhanced = await agentEnhacer(systemPrompt);
  if (!enhanced) {
    return NextResponse.json({ success: false, error: "Failed to enhance prompt" }, { status: 500 });
  }



  return NextResponse.json({ data: enhanced[0].content });
}
export const dynamic = "force-dynamic"; // Ensure this route is always fresh
export const revalidate = 0; // Disable caching for this route