import React from 'react';
import IdeaCard from './IdeaCard'; // Re-use IdeaCard for displaying liked ideas

interface LikedIdeasListProps {
  likedIdeas: string[];
  onIdeaClick: (idea: string) => void;
  onToggleLike: (idea: string) => void;
}

const LikedIdeasList: React.FC<LikedIdeasListProps> = ({ likedIdeas, onIdeaClick, onToggleLike }) => {
  if (likedIdeas.length === 0) {
    return (
      <div className="text-center mt-4">
        <p className="text-muted">아직 찜한 아이디어가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-center mb-3">찜한 아이디어</h3>
      {likedIdeas.map((idea, index) => (
        <IdeaCard
          key={idea} // Use idea content as key for uniqueness
          idea={idea}
          index={index}
          onClick={onIdeaClick}
          isLiked={true} // Always true for liked ideas list
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  );
};

export default LikedIdeasList;
