// src/services/api.ts

interface IdeasApiResponse {
  ideas: string[];
}

interface IdeaDetailsApiResponse {
  details: string[];
}

// Temporarily comment out mock ideas for real API integration
/*
const MOCK_IDEAS = [
    "새로운 모바일 앱 아이디어",
    "혁신적인 마케팅 캠페인 전략",
    "콘텐츠 제작을 위한 창의적인 주제",
    "스타트업을 위한 비즈니스 모델 개선",
    "효율적인 시간 관리를 위한 도구 개발",
];

export const generateIdeasMock = (topic: string): Promise<string[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate AI generating ideas based on topic
            const ideas = MOCK_IDEAS.map(idea => `${topic}과 관련된 ${idea}`);
            resolve(ideas);
        }, 1500); // Simulate network delay
    });
};
*/

export const generateIdeasFromAPI = async (topic: string, numIdeas?: number): Promise<string[]> => {
  const response = await fetch('/api/ideas', { // Call the Cloudflare Pages Function endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, numIdeas }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown API error' }));
    throw new Error(errorData.error || `API error: ${response.statusText}`);
  }

  const data: IdeasApiResponse = await response.json(); // Cast to IdeasApiResponse
  if (!data.ideas || !Array.isArray(data.ideas)) {
    throw new Error('Invalid response format from AI API');
  }
  return data.ideas;
};

export const getIdeaDetailsFromAPI = async (idea: string): Promise<string[]> => {
  const response = await fetch('/api/idea-detail', { // Call the new Cloudflare Pages Function endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown API error' }));
    throw new Error(errorData.error || `API error: ${response.statusText}`);
  }

  const data: IdeaDetailsApiResponse = await response.json(); // Cast to IdeaDetailsApiResponse
  if (!data.details || !Array.isArray(data.details)) {
    throw new Error('Invalid response format from AI for idea details');
  }
  return data.details;
};
