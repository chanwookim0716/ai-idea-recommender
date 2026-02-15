// functions/api/ideas.ts
interface Env {
  OPENAI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const { topic } = await request.json();

    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`, // Use secret here
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Or 'gpt-4', etc.
        messages: [
          { role: 'system', content: "You are a creative idea generator. Provide 5 distinct, concise ideas related to the user's topic." },
          { role: 'user', content: `Generate 5 creative ideas for: ${topic}` },
        ],
        max_tokens: 200,
        n: 1, // Number of completions to generate
        stop: null, // No specific stop sequence
        temperature: 0.7, // Creativity level
      }),
    });

    if (!openaiResponse.ok) {
      console.error('OpenAI API Error:', await openaiResponse.text());
      return new Response(JSON.stringify({ error: 'Failed to get ideas from AI' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await openaiResponse.json();
    const ideas = data.choices[0].message.content
      .split('
')
      .filter((line: string) => line.trim() !== '' && !/^\d+\./.test(line.trim())) // Filter out empty lines and numbered lists
      .map((line: string) => line.replace(/^- /, '').trim()); // Clean up bullet points

    // Ensure we return 5 ideas
    while (ideas.length < 5) {
      ideas.push(`Additional idea for ${topic} (AI did not provide enough)`);
    }

    return new Response(JSON.stringify({ ideas: ideas.slice(0, 5) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
