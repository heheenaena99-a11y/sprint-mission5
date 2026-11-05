# 리스크노트 — 위험성평가 작성 도우미

> 스프린트 미션5 과제용 **가상 서비스**입니다. 화면 속 평가와 체험 계정은 예시(가짜) 데이터이고, 새 평가는 저장되지 않습니다. 회원가입·로그인은 브라우저 쿠키로 동작합니다.

## 1. 서비스 소개

5~50인 소규모 사업장 관리자가 위험성평가를 단계별로 작성하고, 작성한 평가를 한곳에서 관리하도록 돕는 서비스의 랜딩·UI입니다.

| 문제                                                     | 해결                                                 | 기대효과                                  |
| -------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| 엑셀·종이 양식이 어렵고, 작성한 기록이 여기저기 흩어진다 | 법정 절차 순서대로 이어지는 단계별 화면에서 작성한다 | 작성 시간 단축, 평가 기록을 한곳에서 관리 |

- **타깃:** 5~50인 사업장의 안전 담당 관리자·사업주
- **핵심 CTA:** "위험성평가 시작하기" → `/assessments/new`

## 2. 배포 주소

- 서비스: https://risknote.vercel.app
- 기기별 한 번에 보기: https://risknote.vercel.app/preview

## 3. 페이지 구성

| 주소                | 화면                                                    |
| ------------------- | ------------------------------------------------------- |
| `/`                 | 랜딩                                                    |
| `/assessments`      | 평가 목록                                               |
| `/assessments/[id]` | 평가 상세 (1~7)                                         |
| `/assessments/new`  | 새 평가 작성                                            |
| `/login`            | 로그인                                                  |
| `/signup`           | 회원가입                                                |
| `/preview`          | 기기별 미리보기                                         |
| `/preview/[device]` | 기기별 단독 보기 (`fold-folded`, `fold-unfolded`, `pc`) |

## 4. 기술 스택

| 분류        | 사용 기술 (설치 버전)                                                |
| ----------- | -------------------------------------------------------------------- |
| 프레임워크  | Next.js 16.4.3 (App Router, Cache Components), React 19.3.0          |
| 언어        | TypeScript 5.9.3                                                     |
| 스타일      | Tailwind CSS 4.3.3                                                   |
| UI 컴포넌트 | shadcn/ui (shadcn 4.23.0, Base UI 1.9.0), 아이콘 lucide-react 1.64.0 |
| 글꼴        | IBM Plex Sans KR (`next/font/google`)                                |
| 코드 정리   | Prettier 3.9.10, ESLint 9.39.5                                       |
| 배포        | Vercel                                                               |

## 5. 구현한 인터랙션

인터랙션은 **링크(`next/link`, `<a>`)·서버의 `searchParams`·CSS로** 구현했습니다. 클라이언트 자바스크립트는 **폼 3개(새 평가 작성·회원가입·로그인)만 예외로 `useActionState`** 를 씁니다. 로그아웃은 서버 컴포넌트의 폼과 Server Action이라 클라이언트 자바스크립트가 필요 없습니다.

- **페이지 이동:** 버튼·링크를 누르면 해당 페이지로 이동합니다. 열고 닫기는 모양만 만들었습니다.
- **업종 알약:** 알약을 누르면 주소가 `/?industry=manufacturing#overview`처럼 바뀌고, 서버가 그 값을 읽어 아래 예시 카드(제목·설명·위험요인 3줄·상세 링크)를 해당 업종의 평가로 바꿉니다.
- **등급 필터 알약:** 평가 목록의 전체·높음·보통·낮음 알약을 누르면 주소가 `/assessments?level=high`처럼 바뀌고, 서버가 그 등급의 평가만 걸러 보여줍니다. 알약 숫자는 거르기 전 전체 기준이고, 알 수 없는 값이면 전체로 봅니다.
- **유해·위험요인 추가·삭제:** 새 평가 작성에서 "+ 유해·위험요인 추가"를 누르면 `/assessments/new?hazards=2#hazard-2`처럼 카드 개수(1~5)가 늘고 새 카드로 이동합니다. 마지막 카드의 "삭제"는 하나를 줄입니다. 추가·삭제할 때 페이지를 다시 그리므로 입력한 값은 초기화됩니다.
- **폼 입력 검사 (Server Action):** 새 평가 작성·회원가입·로그인은 서버에서 검사합니다(`app/actions.ts` → `lib/service.ts` 판단 → `lib/repository.ts` 조회).
  - 실패하면 폼 맨 위에 "N개 항목을 확인해 주세요" 경고 상자(`role="alert"`)와 칸마다 빨간 오류 문구(`aria-invalid`, `aria-describedby`)를 보여주고, 입력값은 유지합니다(비밀번호 칸만 비움). 브라우저 기본 검사는 끄고(`noValidate`) 문구를 한국어로 통일했습니다.
  - 새 평가 작성: 필수 칸, 빈도·강도 1~5 정수, 유해·위험요인 중복(공백·대소문자 무시), 확인 체크 2개 → 성공 시 `/assessments/new/complete`
  - 회원가입: 이메일 형식, 비밀번호 4자 이상·확인 일치, 이미 가입된 이메일(`findUserByEmail`, 체험 계정 + 쿠키 가입 계정) → 성공 시 계정을 `rn_users` 쿠키에 저장하고 `/login?email=…&joined=1`
  - 로그인: 체험 계정과 쿠키 가입 계정을 모두 확인합니다. 사용자가 없거나 비밀번호가 틀리면 구분 없이 "이메일 또는 비밀번호가 맞지 않아요" → 성공 시 `rn_session` 쿠키를 만들고 `/assessments?welcome=1`
  - 새 평가는 저장되지 않습니다. 작성 완료 화면에 "데모라 실제로 저장되지 않아요"를 표시합니다.
- **회원가입·로그인 쿠키:** 두 쿠키 모두 `httpOnly`, `sameSite=lax`, `path=/`이고 배포에서는 `secure`입니다. 읽기·쓰기는 서버 쪽에서만 합니다.
  - `rn_users`(가입 계정): 유효기간 30일이라 브라우저를 닫아도 남습니다. 비밀번호는 `node:crypto`의 scrypt와 랜덤 salt로 바꾼 값만 저장하고, 값 전체는 base64url로 바꿔 넣습니다. 쿠키 크기 한도(약 4KB)를 넘으면 가입 폼에 "이 브라우저에는 계정을 더 저장할 수 없어요"를 보여줍니다.
  - `rn_session`(로그인 상태): 이메일만 담고 `maxAge`·`expires`가 없는 세션 쿠키라 브라우저 전체를 닫으면 삭제됩니다. 화면에 쓸 이름은 요청마다 계정에서 찾아옵니다.
  - 읽을 수 없게 망가진 쿠키는 빈 목록으로 처리합니다. 없는 계정을 가리키는 `rn_session`은 비로그인으로 봅니다.
- **헤더·탭 바 계정 영역:** 로그인 상태면 헤더에 "○○님"과 로그아웃 버튼을, 폴드 앱 화면의 마지막 탭에 로그아웃 버튼을 보여줍니다. 비로그인이면 기존 로그인 링크가 그대로 나옵니다. 쿠키를 읽는 부분은 `Suspense`로 감쌌고, 잘못된 상태가 잠깐 보이지 않도록 대체 화면은 비워 두었습니다. 로그아웃은 `rn_session`만 지우고 홈(`/`)으로 이동합니다.
- **바로가기 메뉴:** 섹션 앵커(`#overview` 등)로 이동하고, CSS `position: sticky`로 스크롤할 때 화면 위에 붙어 따라옵니다. `scroll-margin`으로 섹션 제목이 메뉴에 가려지지 않게 했습니다.
- **폴드8 앱 탭 바:** 1023px 이하에서 화면 아래에 고정되는 4개 탭(홈 · 평가 목록 · 새 평가 · 로그인 또는 로그아웃)입니다. 현재 탭은 각 페이지가 `active` 값을 넘겨 표시하고, 안전 영역(`env(safe-area-inset-bottom)`)만큼 여백을 둡니다.
- **기기별 미리보기:** `/preview`에서 같은 주소(`/`)를 폴드8 접은 화면·펼친 화면·PC 크기의 `iframe` 틀로 동시에 보여줍니다. iframe은 원래 크기로 두고 CSS `transform: scale()`로 줄이며, 축소 비율은 화면 폭 구간마다 고정값을 씁니다. 틀 안에서 스크롤하고 누를 수 있고, "이 화면만 크게 보기 →"로 `/preview/[device]` 단독 화면에 갈 수 있습니다.

## 6. 반응형

| 화면 폭     | 기준 기기                          | 화면 모양                                  |
| ----------- | ---------------------------------- | ------------------------------------------ |
| 640px 미만  | 갤럭시 Z 폴드8 접은 화면 (475×605) | 앱 제목줄 + 아래 탭 바, 1열, 꽉 찬 폭 버튼 |
| 640~1023px  | 갤럭시 Z 폴드8 펼친 화면 (932×560) | 앱 제목줄 + 아래 탭 바, 2~3열              |
| 1024px 이상 | 데스크톱                           | 웹 헤더·푸터, 넓은 섹션 레이아웃           |

## 7. 디자인

- Figma 시안: https://www.figma.com/design/9RPPVsUGQPFUyCSj9Wd4gX (03 Slack 스타일, 04 앱 (폴드8) 페이지)
- Figma 시안의 **"03 Slack 스타일"(데스크톱)**과 **"04 앱 (폴드8)"(앱 화면)** 페이지를 기준으로 구현했습니다.
- Figma MCP로 각 화면의 구조·여백·글자 크기를 읽어 구현 맥락으로 전달했습니다.
- 작성자 칸·동의 체크 초기 해제 등 폼 검사용 작은 변경은 Figma 시안 이후 코드에서 추가했습니다.
- 헤더·탭 바의 로그인 상태("○○님", 로그아웃)와 로그인 화면의 "로그인 상태 유지" 체크박스 제거는 Figma에 반영되어 있지 않고 코드에서만 적용했습니다.
- **색 선택 이유:** 안전보건표지의 색 의미를 따랐습니다.
  - 빨강·노랑·초록 → 위험등급 (높음 16~25 / 보통 9~15 / 낮음 1~8, 위험도 = 빈도 × 강도)
  - 파랑(`#1D4ED8`) → '지시'를 뜻하는 색이라, 버튼·링크·강조에 쓰는 주색으로 정했습니다.

## 8. 데이터 구조

| 파일                  | 역할                                                                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/types.ts`        | 타입 모음: `userDataType`(비밀번호 포함, 체험 계정), `userStoredType`(salt·바꾼 값, 가입 계정), `userClientType`(비밀번호 제외, 화면용), `assessmentType`, `hazardType`, `riskLevelType`, `industryType`, `deviceType` |
| `lib/data.ts`         | 가짜 데이터: 체험 계정 2개, 평가 7건, 업종 연결표, 미리보기 기기 목록                                                                                                                                                  |
| `lib/repository.ts`   | 찾기: `findAssessmentById`, `filterAssessmentsByLevel`, `getDemoUser`, `findUserByEmail`(체험 + 쿠키 계정), `getCurrentUser` 등 (`find`·`filter` 사용, 없으면 `null`)                                                  |
| `lib/service.ts`      | 계산: 위험도(빈도 × 강도), 등급, 최고 위험도, 등급 분포, 위험요인 수, 폼 입력 검사. 클라이언트 폼도 불러오는 파일이라 `node:crypto`를 넣지 않습니다                                                                    |
| `lib/auth-service.ts` | 서버 전용 판단: 비밀번호 변환(`hashPassword`)과 비교, 로그인 판단(`checkLogin`)                                                                                                                                        |
| `lib/auth-cookie.ts`  | 쿠키 이름·옵션, `rn_users` 값 변환(`encodeUsers`, `decodeUsers`), 크기 검사                                                                                                                                            |

로그인 화면의 체험 계정 안내는 비밀번호를 뺀 `userClientType`으로 보여주고, 공개용 체험 비밀번호는 `demoPassword` 상수로 따로 둡니다.

## 9. 수업 내용 적용

| 수업 내용                                                           | 적용한 곳                                                                                                                                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 객체·배열·조건문·함수·템플릿 리터럴                                 | `lib/service.ts` (`riskLevelLabel` 객체, 검사 오류 배열, `if` 검사, `` `유해·위험요인 ${n}` `` 문구)                                                                                  |
| 회원가입 중복 검사·로그인(유저 \| null)                             | `app/actions.ts`(`signUpAction`, `loginAction`, `logoutAction`), `lib/repository.ts` `findUserByEmail`, `lib/auth-service.ts` `checkLogin`                                            |
| 쿠키 저장·세션 쿠키·비밀번호 해시                                   | `lib/auth-cookie.ts`(`httpOnly`·`sameSite`·`secure`·`maxAge`), `app/actions.ts`(`cookies().set`·`delete`), `lib/auth-service.ts`(scrypt + salt)                                       |
| data → repository(조회) → service(판단) 분리                        | `lib/` 폴더 (`data.ts` → `repository.ts` → `service.ts`·`auth-service.ts`, 둘을 잇는 곳은 `app/actions.ts`)                                                                           |
| `userDataType` / `userClientType`(`Omit`), `import type`, `\| null` | `lib/types.ts`(타입 정의), `import type`은 `lib/data.ts`·`repository.ts`·`service.ts`·`app/actions.ts`, `\| null`은 `repository.ts`의 `find…` 함수들과 `auth-service.ts` `checkLogin` |
| 화살표 함수·`map`·`filter`·`find`·`reduce`·삼항 연산자              | `lib/repository.ts`(`find`, `filter`), `lib/service.ts`(`map`, `filter`, `reduce`), `app/assessments/page.tsx`(`map`, `find`, 삼항 연산자)                                            |
| 펼치기·구조분해·`for...of`                                          | `app/actions.ts`(`{ ...form, password: "" }`), `lib/service.ts` `toUserClient`(구조분해)·`getRiskLevelCounts`(`for...of`)                                                             |
| 제네릭 타입                                                         | `lib/types.ts` `formStateType<T>`                                                                                                                                                     |
| Next.js App Router 동적 라우팅                                      | `app/assessments/[id]/page.tsx`, `app/preview/[device]/page.tsx` (`generateStaticParams`, `notFound()`)                                                                               |
| shadcn/ui                                                           | `components/ui/` (button, badge, card, input, label, textarea, checkbox)                                                                                                              |
| 가짜 데이터                                                         | `lib/data.ts` (사용자 2명, 평가 7건)                                                                                                                                                  |
| AI 작업 맥락                                                        | `AGENTS.md`, `CLAUDE.md`(`@AGENTS.md`) — 11절 참고                                                                                                                                    |
| Figma MCP                                                           | 시안 화면 구조·여백을 읽어 구현 (7절 참고)                                                                                                                                            |

## 10. AI 결과를 검토·수정한 기록

AI(Claude Code)가 만든 결과를 확인하고 다음과 같이 고쳤습니다.

- **동작 없는 `<button>`:** 업종 알약·FAQ 항목·목록 필터가 눌러도 아무 일이 없는 버튼이어서 일반 요소(`span`, `div`)로 바꿨습니다. 업종 알약과 목록 필터는 이후 실제 링크로 바꿨습니다.
- **아이콘 `alt` 누락:** 기능 아이콘의 `alt`가 비어 있어서 "위험도 자동 계산 아이콘"처럼 채웠습니다.
- **입력칸 테두리 색 대비:** 선 색과 같은 옅은 테두리 대신, 시안의 더 진한 입력칸 전용 색을 따로 토큰으로 만들었습니다.
- **FAQ 답변 누락:** 질문만 있던 FAQ에 답변 4개를 넣었습니다(`dl`/`dt`/`dd` 구조, 03번 답변의 "평가 목록"은 링크).
- **글꼴 변경:** Noto Sans KR → IBM Plex Sans KR
- **개발 서버 캐시 문제:** 소스의 색을 바꿨는데 개발 서버가 예전 CSS를 내보내서, Turbopack 개발 캐시(`.next/dev`)만 지우고 다시 시작해 해결했습니다.
- **디자인 방향 변경:** 기본 시안 → MS 스타일 → Slack 스타일 → 안전 파랑. 색은 토큰(`app/globals.css`) 값과 이름만 바꾸는 방식으로 진행했습니다.

## 11. AI 작업 맥락 파일

| 파일        | 역할                                                                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | 프로젝트 규칙의 원본. 서비스 설명, 기술 스택, 라우팅, 디자인 원칙(색·모서리·제목), 데이터·인터랙션·품질 기준, 작업 규칙(설치·설정 변경·git은 먼저 묻기 등) |
| `CLAUDE.md` | 한 줄 `@AGENTS.md`. Claude Code가 AGENTS.md를 불러오게 해서 규칙을 한 곳에서만 관리합니다                                                                  |

## 12. 실행 방법

```bash
npm install
npm run dev     # 개발 서버 http://localhost:3000
npm run build   # 배포용 빌드
```

윈도우 PowerShell에서는 `npm.cmd install`, `npm.cmd run dev`, `npm.cmd run build`처럼 `npm.cmd`를 씁니다.

## 13. 알려진 사항

- **`npm audit` low 3건:** shadcn CLI 내부의 `deepmerge`(→ `@shadcn/registry` → `shadcn`)에서 나옵니다. 컴포넌트를 추가할 때 쓰는 CLI 쪽 코드라 앱 화면 코드에는 영향이 적습니다. `npm audit fix --force`는 shadcn을 1.0.0으로 크게 되돌리는 변경이라 지금 구성(shadcn 4.x)과 맞지 않아 적용하지 않았습니다.
- **가입 계정은 가입한 브라우저에만 저장됩니다.** 서버에 저장하지 않으므로 다른 브라우저·기기에서는 로그인할 수 없고, 같은 이메일로 다시 가입할 수 있습니다. 쿠키 크기 한도 때문에 한 브라우저에 저장할 수 있는 계정 수에도 제한이 있습니다.
- **크롬 "이전 탭 다시 열기"를 켜 두면 로그인이 남을 수 있습니다.** 브라우저가 세션을 복원하면서 세션 쿠키도 함께 되살리기 때문입니다.
- **로그인 쿠키(`rn_session`)는 서명하지 않은 데모 수준입니다.** 값이 이메일뿐이라 쿠키를 직접 고치면 다른 계정으로 보일 수 있습니다. 실제 서비스라면 서명하거나 서버에 세션을 저장해야 합니다.
- **없는 평가·기기 주소**(예: `/assessments/99`, `/preview/abc`): "찾을 수 없음" 화면과 함께 HTTP **404**를 돌려줍니다. (로컬 `next start`에서는 서버를 켠 뒤 그 주소의 첫 요청만 200이 나오고, 다음 요청부터 404였습니다.)
