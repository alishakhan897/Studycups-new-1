
import { GoogleGenAI, Type } from "@google/genai";
import type { College } from "../types";

// Fix: Updated the return type to match the shape of the recommendation object.
export const getAIRecommendations = async (
  query: string,
  colleges: College[]
): Promise<{ collegeName: string; collegeId: number }[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return Promise.reject("API key not configured.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const collegeInfoForAI = colleges.map(({ id, name, location, description, highlights, feesRange, courses }) => ({
      id,
      name,
      location,
      description,
      highlights,
      fees: `approx ${feesRange.min} to ${feesRange.max} per year`,
      courses: courses.map(c => c.name).join(', '),
    }));

    const prompt = `
      You are an expert college counselor. Based on the user's request and the provided college data, recommend up to 3 colleges.
      User request: "${query}"
      
      Available colleges:
      ${JSON.stringify(collegeInfoForAI, null, 2)}

      Analyze the user's request for location, course preferences, budget, and other keywords. Match it against the college data.
      Provide your response as a JSON object.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reasoning: {
              type: Type.STRING,
              description: "A brief explanation of why you chose these colleges for the user."
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  collegeName: {
                    type: Type.STRING,
                    description: "The exact name of a recommended college from the provided list."
                  },
                  collegeId: {
                    type: Type.INTEGER,
                    description: "The ID of the recommended college."
                  }
                }
              }
            }
          }
        }
      }
    });
    
    const textResponse = response.text.trim();
    if (textResponse) {
        const jsonResponse = JSON.parse(textResponse);
        return jsonResponse.recommendations || [];
    }
    return [];

  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    throw new Error("Failed to get recommendations from AI.");
  }
};
