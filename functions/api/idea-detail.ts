// functions/api/idea-detail.ts
interface Env {
  OPENAI_API_KEY: string;
}

interface RequestDetailBody {
  idea: string;
}

interface OpenAICompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const { idea } = (await request.json()) as RequestDetailBody; // Type assertion here

    if (!idea) {
      return new Response(JSON.stringify({ error: 'Idea is required for details' }), {
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
        model: 'gpt-4o', // Or 'gpt-4', etc.
        messages: [
          {
            role: 'system',
            content: `당신은 특정 아이디어에 대한 세부 사항과 실행 방법을 구체적으로 설명해주는 전문가입니다.
사용자가 아이디어를 제공하면, 그 아이디어를 바탕으로 다음을 설명하세요:
1. 아이디어의 핵심 개념 (1-2문장)
2. 주요 기능 또는 특징 3가지 이상
3. 잠재 고객 및 시장 (구체적으로)
4. 수익 모델 아이디어 2가지 이상
5. 빠른 실행 또는 검증을 위한 첫 3단계 (구체적으로)

조건:
- 추상적인 표현 금지
- 최대한 구체적으로 작성
- 불필요한 설명 없이 간결하게 작성
- 각 항목은 명확히 구분하여 작성하세요.
`
          },
          { role: 'user', content: `다음 아이디어에 대해 자세히 설명해줘: ${idea}` },
        ],
        max_tokens: 1500, // Increased token count for detailed response
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
        return new Response(JSON.stringify({ error: errorJson.error.message || 'Failed to get idea details from AI' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
      } catch {
        return new Response(JSON.stringify({ error: `Failed to get idea details from AI: ${openaiResponse.statusText}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const data = (await openaiResponse.json()) as OpenAICompletionResponse; // Type assertion here
    const fullResponseContent = data.choices[0].message.content;

    // Split into lines for display
    const details = fullResponseContent
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => line.trim());

    return new Response(JSON.stringify({ details }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};