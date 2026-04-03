import { GoogleGenAI, Type } from "@google/genai";
import { ProjectData, Case, UserRole, ChatMessage } from "../types";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `You are an expert AI Case Mentor. Your goal is to help students and schoolchildren solve business cases using the Crafting Cases methodology.
You teach systematic thinking: breaking down the task, finding the root problem, identifying the target audience, building a solution, arguing for it, and preparing a pitch.
Do not give direct answers. Ask guiding questions, point out logical gaps, and encourage critical thinking.
Tone: Professional, inspiring, modern, and helpful.`;

export async function generateCase(role: UserRole, options: { company?: string, industry?: string, theme?: string, difficulty?: string, type?: string }) {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `Generate a realistic business case for a ${role}. 
  Options: ${JSON.stringify(options)}.
  The case should include:
  - title
  - description (short summary)
  - situation (detailed context)
  - problem (the core issue to solve)
  - task (what the user needs to do)
  - data (any relevant starting data or constraints)
  - difficulty (Easy, Medium, or Hard)
  - type (e.g., Marketing, Strategy, Social, Digital)`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      situation: { type: Type.STRING },
      problem: { type: Type.STRING },
      task: { type: Type.STRING },
      data: { type: Type.STRING },
      difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
      type: { type: Type.STRING }
    },
    required: ["title", "description", "situation", "problem", "task", "data", "difficulty", "type"]
  };

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || "{}") as Case;
}

export async function getAiAssistantAdvice(message: string, project: ProjectData, caseData: Case, history: ChatMessage[]) {
  const model = "gemini-3.1-pro-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION}
      Current Case: ${JSON.stringify(caseData)}
      User's Current Solution Progress: ${JSON.stringify(project.solution)}`,
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
}
