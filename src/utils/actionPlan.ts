import OpenAI from 'openai';
import { ACTION_PROMPT } from '../prompts/action_prompts';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateActionPlan = async (suggestion: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: ACTION_PROMPT 
        },
        { 
          role: "user", 
          content: `Generate a detailed action plan for this suggestion: ${suggestion}` 
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating action plan:', error);
    throw new Error('Failed to generate action plan');
  }
};