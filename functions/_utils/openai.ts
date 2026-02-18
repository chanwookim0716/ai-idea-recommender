export const createOpenAIResponse = async (
  env: { OPENAI_API_KEY: string },
  messages: any[],
  maxTokens: number = 1000
) => {
  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API Error:', errorText);
      try {
        const errorJson = JSON.parse(errorText);
        return { error: errorJson.error.message || 'Failed to get ideas from AI', status: 500 };
      } catch {
        return { error: `Failed to get ideas from AI: ${openaiResponse.statusText}`, status: 500 };
      }
    }

    const data: any = await openaiResponse.json();
    return { data, status: 200 };
  } catch (error: any) {
    console.error('Function error:', error);
    return { error: error.message || 'Internal server error', status: 500 };
  }
};

export const parseAIResponse = (content: string) => {
  return content
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line !== '')
    .map((line: string) => {
      // Remove leading numbers, bullet points, and markdown bolding
              return line.replace(/^(\d+\.|[*\-•])\s*/, '').replace(/\*\*/g, '');    });
};
