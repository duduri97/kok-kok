# 콕콕 (KOK-KOK) 🎯
**"반석 위에 세워진 우리 가족 신앙 놀이터"**  
전 세대(주일학교, 중고등부, 장년부)를 아우르는 교회 출석 및 신앙 관리 통합 플랫폼입니다.

![Project Banner](https://via.placeholder.com/1200x400?text=KOK-KOK+Platform)

## ✨ 주요 기능 (Features)
| 모드 | 대상 | 주요 기능 | 테마 색상 |
|---|---|---|---|
| **Kids** | 주일학교 | QR 출석, 달란트 확인, 칭찬 도장 | 🟡 Yellow |
| **Teens** | 중고등부 | 실시간 랭킹 시스템, 티어(Tier) 관리 | 🟢 Neon Green |
| **Classic** | 장년부 | 성경 1독 체크리스트, 중보기도 릴레이 | 🔵 Dark Navy |
| **Teacher** | 선생님 | QR 스캔 앱, 출석/적립 원터치 처리 | ⚪️ Default |

## 🛠 기술 스택 (Tech Stack)
- **Framework**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS, shadcn/ui
- **PWA**: `next-pwa` (모바일 앱 설치 지원)
- **Deployment**: Vercel (권장)

---

## 🚀 배포 가이드 (Deployment Guide)

### 1단계: Supabase 설정
1. [Supabase](https://supabase.com) 프로젝트 생성
2. **SQL Editor**로 이동하여 다음 스크립트를 순서대로 실행하세요. (`/supabase` 폴더 내에 위치)
    - `schema.sql`: 기본 테이블 생성 (`attendance_logs`, `points`, `profiles`) (처음 1회만)
    - `fix_mvp_data.sql`: 테스트 데이터 생성 및 FK 제약 해제 (MVP 테스트용)
    - `multi_tenancy.sql`: B2B 확장을 위한 `church_id` 추가 (선택 사항)

### 2단계: 환경 변수 설정 (.env.local)
프로젝트 루트에 `.env.local` 파일을 생성하고 Supabase 정보를 입력합니다.
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3단계: 로컬 실행
```bash
npm install
npm run dev
```
- 브라우저에서 `http://localhost:3000` 접속

### 4단계: 프로덕션 배포 (Vercel)
1. GitHub 저장소를 Vercel에 연동
2. Environment Variables에 위 `.env.local` 내용 등록
3. **Build Command**: `next build --webpack` (중요: PWA 호환성을 위해 webpack 플래그 필수)
4. Deploy!

---

## 📱 PWA 설치 방법
1. 모바일 브라우저(Safari/Chrome)로 배포된 사이트 접속
2. **공유하기** -> **홈 화면에 추가** 클릭
3. 앱처럼 아이콘이 생성되고, 전체 화면 모드로 실행됩니다.

## 🤝 기여 (Contributing)
이 프로젝트는 서울반석교회를 위해 제작되었습니다. 기능 제안이나 버그 제보는 Issue를 등록해주세요.

---
**Developers**: Gemini Agent & User Pair Programming 🤖❤️🧑‍💻
