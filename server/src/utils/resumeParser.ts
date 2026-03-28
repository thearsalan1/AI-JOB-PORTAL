import Groq from "groq-sdk";
import { ParsedResume } from "../types/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export const parseResumeWithAI = async (rawText: string): Promise<ParsedResume> => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
    messages: [
      {
        role: "user",
        content: `You are a resume parser. Extract structured data from the resume text below.

Return ONLY valid JSON with this exact structure, no markdown, no extra text:
{
  "extracted_name": "string",
  "extracted_email": "string",
  "phone": "string",
  "skills": ["array", "of", "skills"],
  "experience_years": number,
  "education": ["array of degrees"],
  "current_role": "string",
  "confidence_score": number between 0-100
}

Resume Text:
${rawText}`,
      },
    ],
  });

  const raw = response.choices[0].message.content ?? "";
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as ParsedResume;
};