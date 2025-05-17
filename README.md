# 🖥️ CurateAI Frontend

> **AI 추천 플랫폼의 사용자 인터페이스 (React 기반)**  
> 🎨 직관적인 UX/UI로 콘텐츠 추천 경험을 제공합니다.

---

## 📌 개요

이 프론트엔드는 CurateAI 프로젝트의 사용자 인터페이스를 담당합니다.  
React.js 기반으로 설계되었으며, 추천 결과 시각화, 리뷰 확인, 콘텐츠 검색 등의 기능을 제공합니다.

---

## 🚀 주요 기능

- 🔍 영화/책/영상 검색 기능 (예정)
- 🎯 추천 콘텐츠 리스트 및 상세보기(진행중)
- 📊 추천 결과 시각화 (Chart.js or Recharts)(예정)
- 📱 반응형 디자인
- ⭐ 즐겨찾기 및 사용자 기록 저장 
---

---

## 📂 프로젝트 구조

curateai-frontend/
├── public/                # 정적 파일
├── src/
│   ├── components/       # UI 컴포넌트
│   ├── contexts/         # 전역 상태 관리
│   ├── services/         # API 호출 로직
│   ├── utils/            # 유틸리티 함수
│   ├── index.css         # 전역 스타일 (Tailwind)
│   └── index.tsx         # 앱 진입점
├── tailwind.config.js    # Tailwind 설정
├── postcss.config.js     # PostCSS 설정
├── package.json
└── README.md

---

## 🛠️ 사용 기술

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 18 |
| 데이터 통신 | Axios |
| 상태관리 | React Context / useState |
| 차트 | Recharts (or Chart.js) |

---


