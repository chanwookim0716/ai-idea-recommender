import React from 'react';
import IdeaCard from './IdeaCard';

interface IdeaListProps {
  ideas: string[];
  onIdeaClick: (idea: string) => void; // Added onIdeaClick prop
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onIdeaClick }) => {
  if (ideas.length === 0) {
    return <p className="text-muted">생성된 아이디어가 없습니다.</p>;
  }

  return (
    <div className="mt-4">
      {ideas.map((idea, index) => (
        <IdeaCard key={index} idea={idea} index={index} onClick={onIdeaClick} />
      ))}
    </div>
  );
};

export default IdeaList;
