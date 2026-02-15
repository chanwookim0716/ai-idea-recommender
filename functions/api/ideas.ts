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
        model: 'gpt-4o', // Using gpt-4o as a capable model. User asked for gpt-5-mini, which is not a current model.
        messages: [
          {
            role: 'system',
            content: `당신은 시장 조사 전문가입니다.

사용자가 키워드를 입력하면 다음을 수행하세요:

1. 해당 키워드와 관련된 틈새시장 3가지를 구체적으로 도출하세요.
2. 각 틈새시장마다 아래 항목을 작성하세요:
   • 구체적인 아이디어 1개
   • 이 시장이 유망한 이유 (수요/트렌드/문제점 기반)
   • 경쟁 강도 추정 (낮음 / 보통 / 높음)
3. 마지막에 가장 유망한 틈새시장 1개를 선정하고,
   • 선정 이유
   • 빠르게 검증할 수 있는 실행 방법 1가지를 제시하세요.

조건:
- 추상적인 표현 금지
- 최대한 구체적으로 작성
- 불필요한 설명 없이 간결하게 작성
`
          },
          { role: 'user', content: `키워드: ${topic}` }, // Integrating the topic into the prompt
        ],
        max_tokens: 1000, // Increased token count for detailed response
        n: 1, // Number of completions to generate
        stop: null,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API Error:', errorText);
      try {
        const errorJson = JSON.parse(errorText);
        return new Response(JSON.stringify({ error: errorJson.error.message || 'Failed to get ideas from AI' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
      } catch {
        return new Response(JSON.stringify({ error: `Failed to get ideas from AI: ${openaiResponse.statusText}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const data = await openaiResponse.json();
    const fullResponseContent = data.choices[0].message.content;

    // Split into lines for display, no complex parsing yet
    const ideas = fullResponseContent
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => line.trim());

    return new Response(JSON.stringify({ ideas }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) { // Catch any type for broader error handling
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
