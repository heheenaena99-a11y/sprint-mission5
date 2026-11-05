<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---
# 리스크노트 (스프린트 미션5)

## 서비스
- 소규모(5~50인) 사업장 관리자가 위험성평가를 단계별로 작성하고, 작성한 평가를 목록으로 관리하는 서비스의 랜딩·UI. 과제용 가상 서비스.
- 문제: 엑셀·종이 양식이 어렵고 기록이 흩어짐 → 해결: 단계별 화면 작성 → 기대효과: 작성 시간 단축, 한곳에서 관리
- 핵심 CTA: "위험성평가 시작하기" → /assessments/new

## 기술 스택
- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui(components/ui), Prettier
- 글꼴: IBM Plex Sans KR (next/font/google)
- 윈도우 환경: npm → npm.cmd, npx → npx.cmd

## 페이지 (라우팅)
- / 랜딩, /assessments 목록, /assessments/[id] 상세, /assessments/new 작성, /login 로그인, /signup 회원가입, /preview 기기별 미리보기, /preview/[device] 기기별 단독 보기

## 디자인 원칙 (Figma 시안 기준)
- Figma 파일: https://www.figma.com/design/9RPPVsUGQPFUyCSj9Wd4gX 의 "03 Slack 스타일" 페이지가 기준. 구현 전 Figma MCP로 해당 화면을 확인한다.
- 색: 글자 #1D1C1D, 보조글자 #5E5D60, 주색(버튼·링크·강조) #1D4ED8, 짙은 띠 배경 #0B1F3A, 띠 위 보조글자 #C7D6F2, 연파랑 배경 #EEF4FF, 연파랑 강조 배경 #E0EAFF, 선 #EBEAEB, 입력칸 테두리 #CDD5E0
- 위험등급: 높음(16~25) 빨강 #DC2626/#FEE2E2, 보통(9~15) 주황 #D97706/#FEF3C7, 낮음(1~8) 초록 #16A34A/#DCFCE7. 위험도 = 빈도(1~5) × 강도(1~5)
- 모서리: 버튼 4px, 카드 16px(옅은 테두리 #EBEAEB), 입력칸 8px, 알약 버튼 완전 둥글게
- 제목: 굵게(Bold). 랜딩 큰 제목 64px, 섹션 제목 48px, 모바일에서는 줄인다
- shadcn 컴포넌트를 우선 사용하고, 반복 UI(버튼, 카드, 배지, 입력칸)는 재사용 컴포넌트로 만든다
- 섹션(히어로, 기능 소개, CTA 등)은 역할별 컴포넌트로 분리한다

## 데이터
- 가짜 데이터는 lib/data.ts 한 곳에 둔다 (평가 7건, 체험 계정 2개: a@a.com / 1234, s@s.com / 5678). 가입 계정만 쿠키에 저장하고, 새 평가는 저장하지 않는다.

## 인터랙션
- 페이지 이동·목록 등급 필터(?level=)·업종 알약(?industry=)·유해·위험요인 추가/삭제(?hazards=)는 링크(next/link)와 서버의 searchParams로만 처리한다(클라이언트 JS 없음, searchParams 읽는 부분은 Suspense로 감싼다).
- 폼 3개(새 평가 작성·회원가입·로그인)만 예외로 Server Action + useActionState 클라이언트 컴포넌트를 쓴다. 검사는 service(판단) → repository(조회) 순서, 실패 시 경고 상자(role="alert")와 칸별 오류, 브라우저 기본 검사는 끈다(noValidate).
- 회원가입·로그인은 쿠키로 동작한다. 가입 계정은 rn_users(30일, 비밀번호는 scrypt로 바꾼 값만), 로그인 상태는 rn_session(세션 쿠키)에 두고, 읽기·쓰기는 서버 쪽에서만 한다. 로그아웃은 서버 컴포넌트의 폼 + Server Action이다(클라이언트 JS 없음).
- 새 평가는 저장되지 않는다. 작성 완료 화면에 "데모라 실제로 저장되지 않아요"를 표시한다. 열고 닫기는 모양만 만든다.

## 품질
- 모바일·데스크톱에서 잘리거나 겹치지 않게 반응형
- 이미지 alt, 버튼(동작)과 링크(이동) 구분, 페이지 제목·설명 메타데이터
- 콘솔 에러·깨진 링크 없음

## 작업 규칙
- 설치 전에 무엇을 왜 설치하는지 설명하고 승인을 받는다
- 요청하지 않은 파일은 수정하지 않는다. 더 나은 방법이 있으면 먼저 제안한다
- 설정 변경, MCP 등록, 메모리 저장도 먼저 묻는다
- git add/commit/push는 사용자가 요청할 때만 단계별 승인 후 한다
- 작업이 끝나면 바꾼 파일과 내용을 요약한다
---
