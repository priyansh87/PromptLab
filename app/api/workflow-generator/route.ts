import {WorkflowData} from "@/types";
import {NextRequest, NextResponse} from "next/server";  
import {agentWorkflow} from "@/utils/agents";

export async function POST(req: NextRequest) {
  const data: WorkflowData = await req.json();
  console.log("Workflow Data Received:", data);

  const {taskDescription} = data;

  const systemPrompt = `
Take the following project description and provide a detailed workflow recommendation.

Project Description:
"${taskDescription}"

Workflow Recommendation:
`;

  const enhanced = await agentWorkflow(systemPrompt);
  if (!enhanced) {
    return NextResponse.json({ success: false, error: "Failed to enhance prompt" }, { status: 500 });
  }

  return NextResponse.json({ data: enhanced[0]?.content });
}

export const dynamic = "force-dynamic"; // Ensure this route is always fresh
export const revalidate = 0; // Disable caching for this route