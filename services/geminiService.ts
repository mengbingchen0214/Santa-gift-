import { GoogleGenAI, Type } from "@google/genai";
import { GiftMessage, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGiftMessages = async (wish: string, languagePreference: Language): Promise<GiftMessage[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user has made this wish: "${wish}". 
      Christmas is coming. Create 3 distinct gifts.
      
      TASK:
      1. Detect the language of the wish (likely English or Chinese).
      2. Provide **profound wisdom, philosophical insight, or practical life advice** related specifically to this wish.
      3. **LANGUAGE RULE**: If the wish is in Chinese, the Output MUST be in Chinese. If the wish is in English, the Output MUST be in English. (As a fallback, use ${languagePreference === 'zh' ? 'Chinese' : 'English'}).
      
      For example:
      - If the wish is about money, offer wisdom about value, hard work, or the nature of wealth.
      - If the wish is about love, offer wisdom about patience, self-worth, or connection.
      
      Each message should be short, impactful, and deeply meaningful.
      Assign a relevant emoji to each.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "A short, 2-3 word wise title" },
              message: { type: Type.STRING, description: "The wisdom or advice (max 25 words)" },
              emoji: { type: Type.STRING, description: "A single relevant emoji" }
            },
            required: ["title", "message", "emoji"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as GiftMessage[];
  } catch (error) {
    console.error("Error generating gifts:", error);
    
    // Fallback based on language preference if API fails
    if (languagePreference === 'zh') {
      return [
        { title: "耐心", message: "伟大的事物需要时间成长。相信过程。", emoji: "🌱" },
        { title: "视角", message: "幸福不是终点，而是旅途中的方式。", emoji: "🧭" },
        { title: "力量", message: "你内心拥有一切所需，去面对世界给予的一切。", emoji: "🦁" },
      ];
    }
    
    return [
      { title: "Patience", message: "Great things take time to grow. Trust the process.", emoji: "🌱" },
      { title: "Perspective", message: "Happiness is not a destination, but a way of traveling.", emoji: "🧭" },
      { title: "Strength", message: "You have within you right now, everything you need to deal with whatever the world can throw at you.", emoji: "🦁" },
    ];
  }
};
