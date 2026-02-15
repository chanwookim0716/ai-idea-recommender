// src/services/api.ts
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

// Placeholder for future real API integration
// export const generateIdeasFromAPI = async (topic: string): Promise<string[]> => {
//   // In a real scenario, this would call your backend proxy (e.g., Cloudflare Worker)
//   // const response = await fetch('/api/generate-ideas', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({ topic }),
//   // });
//   // if (!response.ok) {
//   //   throw new Error('Failed to fetch ideas from API');
//   // }
//   // const data = await response.json();
//   // return data.ideas;
//   return Promise.resolve([`Real AI idea for ${topic}`]);
// };
