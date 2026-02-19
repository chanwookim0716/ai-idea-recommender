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

export const parseAIResponse = (content: string, numIdeas: number = 3) => {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');
  const extractedIdeas: string[] = [];
  
  let currentIdea: string[] = [];
  for (const line of lines) {
    // Check if the line starts a new numbered idea (e.g., "1. 틈새시장", "2. 아이디어")
    // or if it's a specific idea line (e.g., "• 구체적인 아이디어")
    const isNewNicheStart = /^\d+\.\s*(.+)/.test(line); // e.g., "1. 해당 키워드..."
    const isSpecificIdeaLine = /^\*\s*구체적인 아이디어\s*(.+)/.test(line) || /^•\s*구체적인 아이디어\s*(.+)/.test(line);


    if (isNewNicheStart && currentIdea.length > 0) {
      extractedIdeas.push(currentIdea.join(' '));
      currentIdea = [];
    }
    
    // Always add lines that are part of the current idea's description,
    // or new niche market heading if it's the start of a new one.
    // Clean markdown before adding.
    const cleanedLine = line.replace(/^(\d+\.|[*-•])\s*/, '').replace(/\*\*/g, '');
    if (isNewNicheStart || isSpecificIdeaLine || currentIdea.length > 0) {
        currentIdea.push(cleanedLine);
    }

    if (extractedIdeas.length >= numIdeas) {
        break; // Stop if we've extracted enough ideas
    }
  }

  if (currentIdea.length > 0 && extractedIdeas.length < numIdeas) {
    extractedIdeas.push(currentIdea.join(' '));
  }

  // Refine the extracted ideas to focus on just the 'specific idea' within each niche
  const finalIdeas: string[] = [];
  extractedIdeas.forEach(ideaBlock => {
    const specificIdeaMatch = /(구체적인 아이디어\s*:\s*)(.+)/.exec(ideaBlock) || /(구체적인 아이디어\s*)(.+)/.exec(ideaBlock);
    if (specificIdeaMatch && specificIdeaMatch[2]) {
      finalIdeas.push(specificIdeaMatch[2].trim());
    } else {
        // Fallback if specific pattern not found, just take the first meaningful line or the whole block
        finalIdeas.push(ideaBlock.split(' ').slice(0, 5).join(' ').trim() + '...'); // Take first few words
    }
  });

  return finalIdeas.slice(0, numIdeas); // Ensure exact limit
};

export const parseAIDetailResponse = (content: string) => {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');
  return lines;
};
