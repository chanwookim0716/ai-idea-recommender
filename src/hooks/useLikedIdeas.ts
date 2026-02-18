import { useState, useEffect } from 'react';

const LOCAL_STORAGE_LIKED_IDEAS_KEY = 'likedIdeas';

export const useLikedIdeas = () => {
  const [likedIdeas, setLikedIdeas] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LIKED_IDEAS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LIKED_IDEAS_KEY, JSON.stringify(likedIdeas));
  }, [likedIdeas]);

  const toggleLike = (idea: string) => {
    setLikedIdeas(prev => 
      prev.includes(idea) ? prev.filter(i => i !== idea) : [...prev, idea]
    );
  };

  return { likedIdeas, toggleLike };
};
