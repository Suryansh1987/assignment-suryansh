import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';
import { InternalServerError } from '../utils/errorClasses';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import type { WeatherData } from './weatherService';
import type { User, Message } from '../db/schema';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

export interface ChatContext {
  userProfile: {
    name: string;
    city?: string;
    prefecture?: string;
    farmSize?: string;
    cropTypes?: string[];
    farmingMethods?: string[];
  };
  currentWeather?: WeatherData;
  conversationHistory: Message[];
  currentQuestion: string;
}

/**
 * Generate AI response using Gemini
 * @param context - Context including user profile, weather, and conversation history
 * @returns AI-generated response
 */
export async function generateAIResponse(context: ChatContext): Promise<string> {
  try {
    // Build system prompt
    const systemPrompt = buildSystemPrompt(context);

    // Prepare conversation history
    const history = context.conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start chat with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: '了解しました。農業に関するご質問にお答えします。' }],
        },
        ...history,
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(context.currentQuestion);
    const response = result.response.text();

    if (!response) {
      throw new Error('AI response is empty');
    }

    return response;
  } catch (error) {
    console.error('Gemini AI error:', error);
    throw new InternalServerError(ERROR_MESSAGES.chat.aiError);
  }
}

/**
 * Build system prompt with context
 */
function buildSystemPrompt(context: ChatContext): string {
  const { userProfile, currentWeather } = context;

  let prompt = `あなたは日本の農家向けのAIアシスタント「AgriSense」です。
農業に関する質問に、親切で専門的に答えてください。

【あなたの専門分野】
1. 作物栽培管理（植え付け、収穫時期、肥料、水やり）
2. 病害虫対策（予防、早期発見、対処法）
3. 天候に応じた農作業アドバイス
4. 有機農法・減農薬栽培の技術
5. 収穫量向上のヒント
6. 季節ごとの農作業カレンダー
7. 農業機械・設備のアドバイス

【回答の方針】
- 具体的で実践的なアドバイスを提供
- 現在の天気・季節を考慮
- ユーザーの栽培作物と農法に合わせる
- 日本の気候・土壌条件に適した方法を推奨
- 必要に応じて注意事項や警告を含める

`;

  // Add user profile information
  prompt += `【ユーザー情報】\n`;
  prompt += `名前: ${userProfile.name}さん\n`;

  if (userProfile.prefecture && userProfile.city) {
    prompt += `地域: ${userProfile.prefecture}${userProfile.city}\n`;
  } else if (userProfile.city) {
    prompt += `地域: ${userProfile.city}\n`;
  }

  if (userProfile.farmSize) {
    prompt += `農地面積: ${userProfile.farmSize}\n`;
  }

  if (userProfile.cropTypes && userProfile.cropTypes.length > 0) {
    prompt += `栽培作物: ${userProfile.cropTypes.join(', ')}\n`;
  }

  if (userProfile.farmingMethods && userProfile.farmingMethods.length > 0) {
    prompt += `農法: ${userProfile.farmingMethods.join(', ')}\n`;
  }

  // Add weather information if available
  if (currentWeather) {
    prompt += `\n【現在の天気】\n`;
    prompt += `気温: ${currentWeather.temperature}\n`;
    prompt += `湿度: ${currentWeather.humidity}\n`;
    prompt += `天気: ${currentWeather.description}\n`;
    prompt += `降水量: ${currentWeather.rainfall}\n`;
  }

  prompt += `\nこの情報を考慮して、ユーザーの質問に答えてください。\n`;
  prompt += `天気や栽培作物に応じた具体的なアドバイスを提供してください。\n`;

  return prompt;
}

/**
 * Generate session title from first message
 * @param message - First user message
 * @returns Generated title
 */
export async function generateSessionTitle(message: string): Promise<string> {
  try {
    // Use first 50 characters of message as title, or generate with AI
    if (message.length <= 50) {
      return message;
    }

    // Generate title using Gemini
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `次のメッセージから、短いタイトル（20文字以内）を生成してください：\n\n${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 50,
      },
    });

    const title = result.response.text().trim();
    return title.substring(0, 50); // Ensure max 50 characters
  } catch (error) {
    console.error('Error generating title:', error);
    // Fallback: use first 50 characters
    return message.substring(0, 47) + '...';
  }
}
