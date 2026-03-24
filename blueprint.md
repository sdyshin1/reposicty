# 도파민 충전소 (Dopamine Station) 블루프린트

## 개요 (Overview)
'도파민 충전소'는 현대인의 일상에 소소한 즐거움과 행운을 제공하는 인터랙티브 웹 애플리케이션입니다. 네온 테마의 강렬한 비주얼과 매끄러운 사용자 경험을 통해 '행운(로또)'과 '매력(AI 동물상)'을 충전할 수 있는 공간을 제공합니다.

## 주요 기능 (Features)
- **행운 충전 (로또 번호 생성기):**
  - 클릭 한 번으로 1-45 사이의 중복 없는 6개 번호 생성 및 정렬.
  - 번호 구간별 한국 로또 표준 색상 적용.
- **매력 충전 (AI 동물상 테스트):**
  - Teachable Machine Image Model 연동을 통한 실시간 얼굴 분석.
  - 웹캠을 활용한 즉각적인 결과 확인 및 확률 그래프 표시.
- **도파민 스테이션 네비게이션:**
  - 탭 방식의 인터페이스를 통해 '행운'과 '매력' 섹션을 매끄럽게 전환.
  - 현재 활성화된 섹션에 따른 시각적 피드백 제공.
- **웹 컴포넌트 기반 아키텍처:**
  - `<lotto-generator>` 및 `<animal-face-test>`로 캡슐화된 독립적 UI 컴포넌트.

## 디자인 및 스타일 (Design & Aesthetics)
- **컨셉:** 사이버펑크 및 네온 스타일의 '도파민 충전소'.
- **색상 팔레트:** 
  - Neon Pink (`oklch(70% 0.3 350)`), Neon Blue (`oklch(75% 0.3 250)`), Neon Yellow (`oklch(85% 0.2 85)`).
- **시각 효과:**
  - **Glassmorphism:** 강한 블러(`backdrop-filter: blur(24px)`)와 반투명 배경.
  - **Dynamic Background:** 방사형 그라데이션과 미세한 노이즈 텍스처로 깊이감 구현.
  - **Animations:** 로또 공의 `pop-in`, 네온 로고의 `flicker`, 배터리 바의 `charging` 애니메이션.
- **타이포그래피:** Pretendard 기반의 굵고 표현력 있는 서체 활용.

## 기술 스택 (Technical Stack)
- **HTML5/CSS3:** Baseline 기능을 활용한 현대적인 레이아웃 및 스타일링.
- **Modern JavaScript:** ES Modules 및 Web Components (Shadow DOM).
- **AI Library:** TensorFlow.js, Teachable Machine Image SDK.
- **Deployment:** Firebase Hosting (예정).

## 프로젝트 구조 (Project Structure)
- `index.html`: 메인 레이아웃 및 네비게이션 구조.
- `style.css`: 네온 테마 및 컴포넌트 공통 스타일.
- `main.js`: 웹 컴포넌트 정의 및 네비게이션 전환 로직.
- `blueprint.md`: 프로젝트 전체 설계 및 진행 상황 기록.

## 검증 및 완료 사항 (Verification)
- [x] 네온 테마 UI/UX 전면 개편 완료.
- [x] 로또 번호 생성 및 색상 로직 정상 작동.
- [x] AI 동물상 테스트 모델 로딩 및 실시간 분석 확인.
- [x] 섹션 전환 네비게이션 구현 및 반응성 확인.
- [x] 모바일 대응 반응형 레이아웃 최적화.
