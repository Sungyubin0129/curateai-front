// src/components/Signup.tsx
import { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../utils/auth';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const doSignup = async () => {
    try {
           interface TokenResponse { access_token: string; token_type: string }
           const res = await axios.post<TokenResponse>('/signup', { username, password });
      saveToken(res.data.access_token);
      setError(null);
      alert('회원가입 성공! 이제 로그인 페이지로 이동하세요.');
    } catch (e: any) {
      console.error(e);
      setError(
        '회원가입 실패: ' + (e.response?.data?.detail || e.message)
      );
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        className="block w-full mb-2 p-2 border"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="block w-full mb-4 p-2 border"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={doSignup}
        className="w-full py-2 bg-green-600 text-white rounded"
      >
        회원가입
      </button>
    </div>
  );
}
