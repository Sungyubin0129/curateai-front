// src/components/Recommendation.tsx
import React, { useState } from 'react';
import { fetchRecommendations, postRating } from '../services/api';
import { toast } from 'react-toastify';

export default function Recommendation() {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = 'user1'; // 실제 로그인 유저로 대체

  const loadRecommendations = async (method: 'cf' | 'gpt') => {
    setLoading(true);
    try {
      const recs = await fetchRecommendations(userId, method);
      setList(recs);
      toast.success(`${method === 'cf' ? 'CF' : 'GPT'} 추천이 업데이트 되었습니다.`);
    } catch (e: any) {
      toast.error('추천을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (content: string, score: number) => {
    try {
      await postRating(userId, content, score);
      toast.success(`⭐️ '${content}'에 ${score}점이 저장되었습니다.`);
      await loadRecommendations('cf');
    } catch (e: any) {
      toast.error('평점 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => loadRecommendations('cf')}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '로딩 중…' : 'CF 추천받기'}
          </button>
          <button
            onClick={() => loadRecommendations('gpt')}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? '로딩 중…' : 'GPT 추천받기'}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mb-6">
            <svg className="w-8 h-8 text-gray-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        )}

        <div className="grid gap-6">
          {list.map((content) => (
            <div key={content} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">{content}</span>
              <div className="space-x-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRating(content, r)}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    {r}★
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!loading && list.length === 0 && (
            <p className="text-center text-gray-500">추천 결과가 없습니다. 버튼을 눌러 추천을 받아보세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
