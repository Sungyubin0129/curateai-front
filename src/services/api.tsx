// src/services/api.tsx
import axios from 'axios';
import { getToken } from '../utils/auth';



// 1) Axios 기본 인스턴스 설정
const api = axios.create({
  baseURL: '/api',              // proxy로 FastAPI 서버(http://localhost:8000)를 가리킴
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers!['Authorization'] = `Bearer ${token}`;
  return config;
});

// 2) 추천 리스트 가져오기
// export async function fetchRecommendations(userId: string): Promise<string[]> {
//   const res = await api.get<{ recommendations: string[] }>(`/recommend/${userId}`);
//   return res.data.recommendations;
// }
export async function fetchRecommendations(userId: string, method = 'cf') {
  const res = await api.get<{ recommendations: string[] }>(
    `/recommend/${userId}`,
    { params: { method } }
  );
  return res.data.recommendations;
}

// 3) 평점 보내기
export async function postRating(
  userId: string,
  contentId: string,
  rating: number
): Promise<void> {
  await api.post('/ratings', {
    user_id: userId,
    content_id: contentId,
    rating,
  });
}
