import React from 'react';
import './App.css';
import IdeaInput from './components/IdeaInput';
import GenerateButton from './components/GenerateButton';
import IdeaList from './components/IdeaList';
import LoadingSpinner from './components/LoadingSpinner';
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

  // Placeholder data for display
  const dummyIdeas = [
    '새로운 앱 아이디어 (기능 비활성화됨)',
    '마케팅 전략 (기능 비활성화됨)',
    '콘텐츠 아이디어 (기능 비활성화됨)',
  ];

  return (
    <div className="container">
      <h1 className="text-center mb-4">AI 아이디어 추천기</h1>
      <div className="card p-4 shadow-sm">
        <p className="text-center text-muted">
          현재는 UI 요소만 표시됩니다. 기능은 비활성화되어 있습니다.
        </p>
        
        <IdeaInput
          value="" // Dummy value
          onChange={() => {}} // Dummy handler
          placeholder="예: 새로운 앱, 마케팅 전략"
          disabled={true} // Always disabled
        />
        <GenerateButton onClick={() => alert('기능이 비활성화되어 있습니다.')} disabled={true} />

        <LoadingSpinner isLoading={false} /> {/* Not loading */}

        {/* Error display placeholder */}
        {false && (
          <div className="alert alert-danger mt-3" role="alert">
            오류 메시지 (비활성화됨)
          </div>
        )}

        <IdeaList ideas={dummyIdeas} />
      </div>
    </div>
  );
}

export default App;