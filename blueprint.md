# 로또 번호 생성기 블루프린트 (Lotto Generator Blueprint)

## 개요 (Overview)
현대적이고 직관적이며 시각적으로 생동감 넘치는 로또 번호 생성기입니다. 사용자는 버튼 클릭 한 번으로 1부터 45 사이의 고유한 번호 6개를 생성할 수 있으며, 프리미엄 사용자 경험을 제공합니다.

## 주요 기능 (Features)
- **로또 번호 생성:** 클릭 시 1-45 사이의 중복 없는 6개 번호를 생성하고 오름차순으로 정렬합니다.
- **AI 동물상 테스트:** Teachable Machine Image Model을 연동하여 웹캠으로 사용자의 동물상을 분석합니다.
  - 실시간 예측 및 확률 바(Bar) 표시.
  - 가장 높은 확률의 결과 강조 표시.
- **웹 컴포넌트 아키텍처:** Shadow DOM을 사용하여 캡슐화된 `<lotto-generator>` 및 `<animal-face-test>` 커스텀 엘리먼트 구현.
- **최신 CSS 기술 적용:**
  - **oklch()**: 시각적으로 균일하고 생생한 색상 시스템 적용.
  - **Cascade Layers (@layer)**: 스타일 구조화 (base, components, utilities).
  - **Container Queries**: 생성기 카드의 반응형 레이아웃 최적화.
  - **Glassmorphism**: `backdrop-filter: blur()`와 반투명 배경을 통한 프리미엄 느낌 구현.
  - **노이즈 텍스처 (Noise Texture)**: 배경에 미세한 SVG 노이즈를 추가하여 질감 표현.
- **반응형 디자인:** CSS Grid를 활용한 중앙 정렬 및 모바일/데스크탑 최적화.
- **인터랙티브 UI:** 로또 공의 `pop-in` 애니메이션과 버튼의 글로우(Glow) 효과.

## 프로젝트 구조 (Project Structure)
- `index.html`: `<lotto-generator>` 엘리먼트를 포함하는 엔트리 포인트.
- `style.css`: 전역 기본 스타일, 테마 변수 및 유틸리티 클래스.
- `main.js`: `LottoGenerator` 웹 컴포넌트 정의 및 로직.

## 디자인 세부 사항 (Design Details)
- **주요 색상 (Primary Color)**: 밝은 사이언 (`oklch(75% 0.2 250)`).
- **배경 (Background)**: 방사형 그라데이션과 노이즈 텍스처가 적용된 깊은 다크 블루.
- **로또 공 (Lotto Balls)**: 한국 로또 공의 표준 색상을 `oklch`로 재해석하여 적용 (1-10 노랑, 11-20 파랑, 21-30 빨강, 31-40 회색, 41-45 초록).
- **타이포그래피 (Typography)**: 높은 가독성의 산세리프 시스템 폰트 및 굵은 서체 활용.

## 검증 결과 (Verification Results)
- [x] 1-45 사이의 고유한 6개 번호 생성 확인.
- [x] 생성된 번호의 오름차순 정렬 확인.
- [x] 웹 컴포넌트 캡슐화 및 스타일 격리 확인.
- [x] 컨테이너 쿼리를 통한 반응형 레이아웃 작동 확인.
- [x] 최신 CSS 기능 (oklch, layers) 정상 작동 확인.
- [x] 한국어 인터페이스 적용 완료.
