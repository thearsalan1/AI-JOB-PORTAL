import * as pdfParseModule from "pdf-parse";

const pdfParse = (pdfParseModule as any).default ?? pdfParseModule;

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const data = await pdfParse(buffer);
    return data.text ?? "";
  } catch (error) {
    console.error("PDF extraction error:", error);
    return "";
  }
};
