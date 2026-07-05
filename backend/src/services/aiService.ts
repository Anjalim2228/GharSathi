import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const aiService = {
  generateBriefing: async (userData: any) => {
    const { name, expenses, tasks, health, inventory, weather } = userData;

    const prompt = `
      You are HomeHero AI, a smart family assistant. 
      Generate a personalized morning briefing for ${name}.
      
      Current Context:
      - Weather: ${JSON.stringify(weather)}
      - Recent Expenses: ${JSON.stringify(expenses)}
      - Pending Tasks: ${JSON.stringify(tasks)}
      - Health Status: ${JSON.stringify(health)}
      - Low Inventory: ${JSON.stringify(inventory)}

      Format the response as a JSON object with:
      1. greeting: A warm "Good Morning" message.
      2. weatherSummary: A brief one-liner about the weather.
      3. alerts: An array of 2-3 most critical items (due bills, low stock, medicine).
      4. suggestions: 2-3 intelligent proactive tips (saving money, healthy habits, meal ideas).
    `;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
        response_format: { type: 'json_object' },
      });

      return JSON.parse(chatCompletion.choices[0].message.content || '{}');
    } catch (error) {
      console.error('AI Briefing Error:', error);
      return {
        greeting: `Good Morning, ${name}!`,
        weatherSummary: "The weather data is currently unavailable.",
        alerts: [],
        suggestions: ["I'm having trouble analyzing your data right now, but I'm still here to help!"]
      };
    }
  },

  chat: async (message: string, history: any[], userData: any) => {
    const { name, familyData } = userData;

    const systemPrompt = `
      You are HomeHero AI, a sophisticated household manager for ${name}'s family.
      You have access to the family's expenses, tasks, and inventory.
      Current context: ${JSON.stringify(familyData)}
      
      Your goal is to be helpful, proactive, and concise. 
      If asked about chores, look at the tasks. If asked about money, look at expenses.
      Always try to provide intelligent insights.
    `;

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
      ];

      const chatCompletion = await groq.chat.completions.create({
        messages: messages as any,
        model: 'llama3-70b-8192',
      });

      return chatCompletion.choices[0].message.content || "I'm sorry, I'm unable to process your request at the moment.";
    } catch (error) {
      console.error('AI Chat Error:', error);
      return "I'm having some trouble connecting to my brain right now. Please try again later.";
    }
  }
};
