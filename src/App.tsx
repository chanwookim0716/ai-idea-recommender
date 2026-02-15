import React from 'react';
import './App.css';
// import IdeaInput from './components/IdeaInput';
// import GenerateButton from './components/GenerateButton';
// import IdeaList from './components/IdeaList';
// import LoadingSpinner from './components/LoadingSpinner';
// import { generateIdeasMock } from './services/api';

function App() {
  // const [topic, setTopic] = useState<string>('');
  // const [ideas, setIdeas] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTopic(e.target.value);
  // };

  // const generateIdeas = async () => {
  //   if (!topic.trim()) {
  //     alert('주제를 입력해주세요!');
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError(null);
  //   setIdeas([]); // Clear previous ideas

  //   try {
  //     const generatedIdeas = await generateIdeasMock(topic);
  //     setIdeas(generatedIdeas);
  //   } catch (err) {
  //     setError('아이디어 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="container">
      <h1 className="text-center mb-4">AI Idea Recommender (화면만)</h1>
      <div className="card p-4 shadow-sm">
        <p className="text-center">
          이것은 AI 아이디어 추천기의 기본적인 화면입니다. 
          향후 여기에 아이디어 입력 필드와 추천 결과가 표시될 예정입니다.
        </p>
        {/*
        <IdeaInput
          value={topic}
          onChange={handleTopicChange}
          disabled={isLoading}
        />
        <GenerateButton onClick={generateIdeas} disabled={isLoading} />

        <LoadingSpinner isLoading={isLoading} />

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {!isLoading && ideas.length > 0 && <IdeaList ideas={ideas} />}
        {!isLoading && ideas.length === 0 && !error && topic.trim() && (
            <p className="text-muted mt-3">아이디어를 생성하려면 버튼을 클릭하세요.</p>
        )}
        */}
      </div>
    </div>
  );
}

export default App;
