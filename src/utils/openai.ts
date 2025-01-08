import OpenAI from 'openai';
import { ChatAnalysis } from '../types/chat';
import { ANALYSIS_PROMPT } from '../prompts/analysis-prompt';
import { CHAT_PROMPTS } from '../prompts/chat-prompts';

// Enhanced OpenAI initialization with better error handling
const initializeOpenAI = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key is not configured. Using fallback responses.');
    return null;
  }

  try {
    return new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error);
    return null;
  }
};

const openai = initializeOpenAI();

// Fallback responses for when OpenAI is unavailable
const FALLBACK_RESPONSES = {
  chat: "I'm currently in demo mode. To enable full AI features, please configure your OpenAI API key.",
  analysis: {
    headline: "Analysis Not Available",
    analysis: "The analysis feature requires an OpenAI API key to be configured.",
    keyInsight: "Please set up your API key to unlock full features.",
    emotions: [{ emoji: "🔧", name: "Setup Required" }],
    suggestions: ["Configure your OpenAI API key to access all features"]
  }
};

export const generateChatResponse = async (
  message: string,
  mode: string,
  conversationHistory: { role: 'user' | 'assistant', content: string }[] = []
) => {
  if (!openai) {
    return FALLBACK_RESPONSES.chat;
  }

  try {
    const promptContent = CHAT_PROMPTS[mode];
    if (!promptContent) {
      throw new Error(`No prompt found for mode: ${mode}`);
    }

    const systemMessage = `${promptContent}\n\n
         CRITICAL: Structure your response in exactly three parts:
         1. Validation: Acknowledge the user's feelings (1 sentence)
         2. Advice/Insight: Provide practical suggestion (1 sentence)
         3. Question: Ask a targeted follow-up question (1 sentence)

        Each part should be on a new line. DO NOT include labels or bullet points.`;

    const messages = [
      { role: 'system', content: systemMessage },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any[],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.1
    });

    const content = response.choices[0].message.content;
    if (!content) return FALLBACK_RESPONSES.chat;

    const parts = content
      .split(/\n(?=Validation:|Advice\/Insight:|Question:)/i)
      .map(section => section
        .replace(/^(Validation|Advice\/Insight|Question):\s*/i, '')
        .replace(/^[-•]\s+/gm, '')
        .trim()
      )
      .filter(Boolean);

    return parts.join('\n\n');

  } catch (error) {
    console.error('Error generating chat response:', error);
    return FALLBACK_RESPONSES.chat;
  }
};

export const generateAnalysis = async (conversationText: string): Promise<ChatAnalysis> => {
  if (!openai) {
    return FALLBACK_RESPONSES.analysis;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: ANALYSIS_PROMPT
        },
        {
          role: 'user',
          content: `Analyze this conversation and provide insights:\n\n${conversationText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No analysis generated');
    }

    const sections = content.split('\n\n').filter(Boolean);
    
    return {
      headline: sections[0]?.trim() || 'Chat Analysis',
      analysis: sections[1]?.trim() || 'No detailed analysis available.',
      keyInsight: sections[2]?.replace(/^Key Insight:\s*/i, '').trim() || 'No key insight available.',
      emotions: parseEmotions(sections[3] || ''),
      suggestions: parseSuggestions(sections[4] || '')
    };
  } catch (error) {
    console.error('Error generating analysis:', error);
    return FALLBACK_RESPONSES.analysis;
  }
};

// Helper function to parse emotions from the response
const parseEmotions = (emotionsText: string): { emoji: string; name: string }[] => {
  try {
    const emotionMatches = emotionsText.match(/[😃💪😞😳🌟😨😓🧍🎯❤️🙏❓😡😤😩🤝🤔😌🔥]\s*\w+/g) || [];
    return emotionMatches.map(match => {
      const [emoji, ...nameParts] = match.split(/\s+/);
      return {
        emoji,
        name: nameParts.join(' ')
      };
    });
  } catch (error) {
    console.error('Error parsing emotions:', error);
    return [{ emoji: "❓", name: "Unknown" }];
  }
};

// Helper function to parse suggestions from the response
const parseSuggestions = (suggestionsText: string): string[] => {
  try {
    return suggestionsText
      .split('\n')
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean);
  } catch (error) {
    console.error('Error parsing suggestions:', error);
    return ['No suggestions available'];
  }
};