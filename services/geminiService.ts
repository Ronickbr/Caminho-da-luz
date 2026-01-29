
import { GoogleGenAI, Modality } from "@google/genai";

// Use process.env.API_KEY directly in the constructor as per guidelines.
export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getAI() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey || apiKey === "undefined") {
      throw new Error("API Key não configurada. Por favor, configure a variável GEMINI_API_KEY no arquivo .env.local");
    }
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  async speak(text: string, voiceName: string = 'Zephyr') {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp", // Updated to a more common model name if needed, but keeping logic
        contents: [{ parts: [{ text: `Leia calmamente e com tom espiritual: ${text}` }] }],
        config: {
          responseModalities: ["AUDIO" as any],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("Audio content not found");

      return base64Audio;
    } catch (error) {
      console.error("Error generating speech:", error);
      throw error;
    }
  }

  static decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  static async decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }
}

export const geminiService = new GeminiService();
