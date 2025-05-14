// src/components/Recommendation.tsx
import React, { useState } from 'react';
import { fetchRecommendations, postRating } from '../services/api';

export default function Recommendation() {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = 'user1';  // 나중엔 로그인된 유저 ID로 대체

  // 추천 목록 불러오기
  const loadRecs = async () => {
    setLoading(true);
    setError(null);
    try {
      const recs = await fetchRecommendations(userId);
      setList(recs);
    } catch (e: any) {
      console.error(e);
      setError('추천 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

    const loadGptRecs = async () => {
      const recs = await fetchRecommendations(userId, 'gpt');
      setList(recs);
      alert('GPT 기반 추천이 업데이트 되었습니다!');
    };

  // 평점 남기기
  const handleRating = async (content: string, score: number) => {
    setError(null);
    try {
      await postRating(userId, content, score);
      // 평점 후엔 바로 추천 다시 가져오기
      await loadRecs();
    } catch (e: any) {
      console.error(e);
      setError('평점 저장에 실패했습니다.');
    }
  };

  return (
    <div className="p-4">
       <button onClick={loadGptRecs}>GPT 추천받기</button>
        {/* 기존 CF 버튼도 그대로 두면 두 가지를 비교해 볼 수 있습니다 */}
         <button onClick={() => loadRecs()}>CF 추천받기</button>
      <button
        onClick={loadRecs}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        {loading ? '로딩 중…' : '추천받기'}
      </button>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <ul>
        {list.map((c) => (
          <li key={c} className="mb-2 flex items-center">
            <span className="font-medium">{c}</span>
            <div className="ml-auto space-x-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRating(c, r)}
                  className="text-sm px-2 py-0.5 border rounded hover:bg-gray-100"
                >
                  {r}★
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
