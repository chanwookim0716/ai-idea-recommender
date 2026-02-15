import React from 'react';
import IdeaCard from './IdeaCard';

interface IdeaListProps {
  ideas: string[];
  onIdeaClick: (idea: string) => void;
  likedIdeas: string[]; // New prop
  onToggleLike: (idea: string) => void; // New prop
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onIdeaClick, likedIdeas, onToggleLike }) => {
  if (ideas.length === 0) {
    return <p className="text-muted">생성된 아이디어가 없습니다.</p>;
  }

  return (
    <div className="mt-4">
      {ideas.map((idea, index) => (
        <IdeaCard
          key={index}
          idea={idea}
          index={index}
          onClick={onIdeaClick}
          isLiked={likedIdeas.includes(idea)} // Determine if this idea is liked
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  );
};

export default IdeaList;
