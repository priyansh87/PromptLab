import { TransformerData } from "@/types/index";
import { NextRequest, NextResponse } from "next/server";
import { agentStyleTransformer } from "@/utils/agents";

export async function POST(req: NextRequest) {
  const data: TransformerData = await req.json();
  console.log("Transformer Data Received:", data);

  const { inputPrompt, selectedStyle } = data;

  const systemPrompt = `
Transform the following prompt into the selected style. if needed provide with a lot of examples and detailed instructions. with a valid json format output

Input Prompt: ${inputPrompt}
Selected Style: ${selectedStyle}
`;

  const enhanced = await agentStyleTransformer(systemPrompt);
  if (!enhanced) {
    return NextResponse.json({ success: false, error: "Failed to enhance prompt" }, { status: 500 });
  }

  
    return NextResponse.json({ data: enhanced[0]?.content });
}
