
import { GoogleGenAI, Type } from "@google/genai";
import { AIPriceResponse } from "../types";

// Always initialize GoogleGenAI with the apiKey property directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPriceSuggestion = async (
  title: string,
  description: string,
  category: string,
  condition: string
): Promise<AIPriceResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest a realistic second-hand market price in Indian Rupees (INR) for this item in India.
      Item: ${title}
      Description: ${description}
      Category: ${category}
      Condition: ${condition}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedPrice: { type: Type.NUMBER },
            minPrice: { type: Type.NUMBER },
            maxPrice: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["suggestedPrice", "minPrice", "maxPrice", "reasoning"]
        }
      }
    });

    // Directly access the .text property from the response
    return JSON.parse(response.text || '{}') as AIPriceResponse;
  } catch (error) {
    console.error("AI Price Suggestion Error:", error);
    return null;
  }
};

export const moderateListingContent = async (text: string): Promise<{ isSafe: boolean; reason?: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Is this listing text safe for a family-friendly marketplace? Detect scams, fraud, or inappropriate language.
      Text: ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["isSafe"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { isSafe: true }; // Fallback
  }
};
