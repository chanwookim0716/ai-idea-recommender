import React from 'react';
import IdeaCard from './IdeaCard';

interface IdeaListProps {
  ideas: string[];
  onIdeaClick: (idea: string) => void;
  likedIdeas: string[]; // New prop
  onToggleLike?: (idea: string) => void;
}

const IdeaList: React.FC<IdeaListProps> = React.memo(({ ideas, onIdeaClick, likedIdeas, onToggleLike }) => {
  IdeaList.displayName = 'IdeaList';
  if (ideas.length === 0) {
    return <p className="text-muted text-center mt-3">아직 생성된 아이디어가 없습니다. 위 입력창에 주제를 입력하고 아이디어를 생성해보세요!</p>;
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
});

export default React.memo(IdeaList);
