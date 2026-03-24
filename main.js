/**
 * 행운의 로또 번호 생성기 컴포넌트
 */
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.numbers = [];
  }

  connectedCallback() {
    this.render();
  }

  generateNumbers() {
    const set = new Set();
    while (set.size < 6) {
      set.add(Math.floor(Math.random() * 45) + 1);
    }
    this.numbers = Array.from(set).sort((a, b) => a - b);
    this.updateDisplay();
  }

  getBallColor(num) {
    if (num <= 10) return 'oklch(85% 0.18 85)';   // 노랑
    if (num <= 20) return 'oklch(65% 0.18 250)';  // 파랑
    if (num <= 30) return 'oklch(60% 0.22 25)';   // 빨강
    if (num <= 40) return 'oklch(60% 0.05 250)';  // 회색
    return 'oklch(75% 0.18 150)';                 // 초록
  }

  updateDisplay() {
    const ballContainer = this.shadowRoot.querySelector('.ball-container');
    ballContainer.innerHTML = '';
    
    this.numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = 'ball';
      ball.textContent = num;
      ball.style.animationDelay = `${index * 0.1}s`;
      ball.style.setProperty('--ball-color', this.getBallColor(num));
      ballContainer.appendChild(ball);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: oklch(30% 0.05 250 / 0.6);
          backdrop-filter: blur(24px);
          padding: 3rem 2rem;
          border-radius: 32px;
          border: 1px solid oklch(100% 0 0 / 0.1);
          text-align: center;
          box-shadow: 0 30px 60px -12px oklch(0% 0 0 / 0.5);
          color: white;
          margin-bottom: 2rem;
        }
        h2 {
          font-size: 2.2rem;
          margin-bottom: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, oklch(90% 0.1 250), oklch(80% 0.2 330));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ball-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
          min-height: 72px;
        }
        .ball {
          width: 60px;
          height: 60px;
          background: var(--ball-color);
          color: oklch(20% 0.05 250);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.5rem;
          box-shadow: 0 8px 16px -4px oklch(from var(--ball-color) l c h / 0.5);
          animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: scale(0.5);
        }
        @keyframes pop-in { to { opacity: 1; transform: scale(1); } }
        button {
          background: linear-gradient(135deg, oklch(75% 0.2 250), oklch(65% 0.25 250));
          color: white;
          border: none;
          padding: 1.25rem 3rem;
          font-size: 1.2rem;
          font-weight: 800;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px oklch(70% 0.2 250 / 0.4); }
        .hint { opacity: 0.6; margin-bottom: 2rem; font-size: 0.9rem; }
      </style>
      <h2>행운의 로또 번호</h2>
      <div class="ball-container"><p class="hint">행운을 빌어요!</p></div>
      <button id="generateBtn">번호 생성하기</button>
    `;
    this.shadowRoot.getElementById('generateBtn').onclick = () => this.generateNumbers();
  }
}

/**
 * AI 동물상 테스트 컴포넌트
 */
class AnimalFaceTest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.model = null;
    this.webcam = null;
    this.isPredicting = false;
    this.modelURL = "https://teachablemachine.withgoogle.com/models/tNoeu3oKW/";
  }

  connectedCallback() {
    this.render();
  }

  async init() {
    const btn = this.shadowRoot.getElementById('startBtn');
    btn.disabled = true;
    btn.textContent = "모델 로딩 중...";

    try {
      this.model = await tmImage.load(this.modelURL + "model.json", this.modelURL + "metadata.json");
      this.maxPredictions = this.model.getTotalClasses();

      this.webcam = new tmImage.Webcam(300, 300, true);
      await this.webcam.setup();
      await this.webcam.play();
      this.isPredicting = true;
      window.requestAnimationFrame(() => this.loop());

      this.shadowRoot.getElementById("webcam-container").appendChild(this.webcam.canvas);
      const labelContainer = this.shadowRoot.getElementById("label-container");
      labelContainer.innerHTML = '';
      for (let i = 0; i < this.maxPredictions; i++) {
        const div = document.createElement("div");
        div.className = 'prediction-item';
        div.innerHTML = `<span class="name"></span><div class="bar-bg"><div class="bar-fill"></div></div><span class="val"></span>`;
        labelContainer.appendChild(div);
      }
      btn.style.display = 'none';
    } catch (e) {
      btn.textContent = "카메라 에러!";
      btn.disabled = false;
    }
  }

  async loop() {
    if (!this.isPredicting) return;
    this.webcam.update();
    await this.predict();
    window.requestAnimationFrame(() => this.loop());
  }

  async predict() {
    const prediction = await this.model.predict(this.webcam.canvas);
    const items = this.shadowRoot.querySelectorAll('.prediction-item');
    prediction.forEach((p, i) => {
      const prob = (p.probability * 100).toFixed(0);
      items[i].querySelector('.name').textContent = p.className;
      items[i].querySelector('.bar-fill').style.width = prob + '%';
      items[i].querySelector('.val').textContent = prob + '%';
      items[i].classList.toggle('active', p.probability > 0.4);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: oklch(30% 0.05 250 / 0.6);
          backdrop-filter: blur(24px);
          padding: 3rem 2rem;
          border-radius: 32px;
          border: 1px solid oklch(100% 0 0 / 0.1);
          text-align: center;
          color: white;
        }
        h2 {
          font-size: 2.2rem;
          margin-bottom: 1rem;
          font-weight: 900;
          background: linear-gradient(135deg, oklch(85% 0.2 60), oklch(75% 0.15 150));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        #webcam-container {
          width: 240px;
          height: 240px;
          margin: 2rem auto;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          border: 3px solid oklch(100% 0 0 / 0.2);
        }
        #webcam-container canvas { width: 100% !important; height: 100% !important; object-fit: cover; }
        #label-container { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.8rem; }
        .prediction-item {
          display: flex; align-items: center; gap: 1rem; opacity: 0.6; transition: 0.3s;
        }
        .prediction-item.active { opacity: 1; transform: scale(1.02); }
        .name { width: 70px; font-weight: 700; text-align: left; }
        .bar-bg { flex: 1; height: 10px; background: oklch(100% 0 0 / 0.1); border-radius: 5px; overflow: hidden; }
        .bar-fill { height: 100%; background: oklch(75% 0.2 150); transition: width 0.2s; }
        .val { width: 40px; font-weight: 800; font-size: 0.8rem; }
        button {
          background: linear-gradient(135deg, oklch(65% 0.2 330), oklch(55% 0.25 330));
          color: white; border: none; padding: 1.25rem 3rem; font-size: 1.2rem; font-weight: 800; border-radius: 100px; cursor: pointer;
        }
      </style>
      <h2>AI 동물상 테스트</h2>
      <div id="webcam-container"></div>
      <button id="startBtn">테스트 시작하기</button>
      <div id="label-container"></div>
    `;
    this.shadowRoot.getElementById('startBtn').onclick = () => this.init();
  }
}

/**
 * 네비게이션 로직 및 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = {
    lotto: document.getElementById('lotto-section'),
    animal: document.getElementById('animal-section')
  };

  // 초기 상태 설정
  sections.animal.style.display = 'none';

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      
      // 네비 버튼 활성화 상태 전환
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // 섹션 가시성 전환
      Object.keys(sections).forEach(key => {
        sections[key].style.display = key === target ? 'block' : 'none';
      });
    });
  });
});

customElements.define('lotto-generator', LottoGenerator);
customElements.define('animal-face-test', AnimalFaceTest);
