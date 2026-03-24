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
    // Standard Korean Lotto ball colors using oklch
    if (num <= 10) return 'oklch(85% 0.18 85)';   // Yellow/Gold
    if (num <= 20) return 'oklch(65% 0.18 250)';  // Blue
    if (num <= 30) return 'oklch(60% 0.22 25)';   // Red/Coral
    if (num <= 40) return 'oklch(60% 0.05 250)';  // Gray/Slate
    return 'oklch(75% 0.18 150)';                 // Green
  }

  updateDisplay() {
    const ballContainer = this.shadowRoot.querySelector('.ball-container');
    ballContainer.innerHTML = '';
    
    this.numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = 'ball';
      ball.textContent = num;
      ball.style.animationDelay = `${index * 0.1}s`;
      
      const ballColor = this.getBallColor(num);
      ball.style.setProperty('--ball-color', ballColor);
      
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
          padding: 4rem 2rem;
          border-radius: 32px;
          border: 1px solid oklch(100% 0 0 / 0.1);
          text-align: center;
          box-shadow: 
            0 30px 60px -12px oklch(0% 0 0 / 0.6),
            inset 0 1px 1px oklch(100% 0 0 / 0.15);
          color: white;
          transition: transform 0.3s ease;
        }

        h1 {
          font-size: 2.8rem;
          margin-bottom: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, oklch(90% 0.1 250), oklch(80% 0.2 330));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px oklch(0% 0 0 / 0.3));
        }

        .ball-container {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
          min-height: 80px;
        }

        .ball {
          width: 72px;
          height: 72px;
          background: var(--ball-color);
          color: oklch(20% 0.05 250);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.8rem;
          box-shadow: 
            0 12px 24px -6px oklch(from var(--ball-color) l c h / 0.5),
            inset 0 -6px 12px oklch(0% 0 0 / 0.2),
            inset 0 4px 8px oklch(100% 0 0 / 0.3);
          animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: translateY(20px) scale(0.5);
          text-shadow: 0 1px 2px oklch(100% 0 0 / 0.2);
        }

        @keyframes pop-in {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        button {
          background: linear-gradient(135deg, oklch(75% 0.2 250), oklch(65% 0.25 250));
          color: white;
          border: none;
          padding: 1.5rem 4rem;
          font-size: 1.4rem;
          font-weight: 800;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 0 30px oklch(70% 0.25 250 / 0.4);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          position: relative;
          overflow: hidden;
        }

        button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, oklch(100% 0 0 / 0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        button:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 20px 40px oklch(70% 0.25 250 / 0.6);
        }

        button:hover::after {
          opacity: 1;
        }

        button:active {
          transform: translateY(2px) scale(0.98);
        }

        .hint {
          opacity: 0.7;
          font-size: 1.1rem;
          margin-top: -2rem;
          margin-bottom: 3rem;
          font-weight: 500;
        }

        @container (max-width: 550px) {
          .ball {
            width: 56px;
            height: 56px;
            font-size: 1.4rem;
          }
          h1 {
            font-size: 2.2rem;
          }
        }
      </style>
      
      <h1>행운의 로또 번호</h1>
      <div class="ball-container">
        <!-- Balls will be injected here -->
        <p class="hint">번호 생성하기 버튼을 눌러보세요!</p>
      </div>
      <button id="generateBtn">번호 생성하기</button>
    `;

    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateNumbers());
  }
}

customElements.define('lotto-generator', LottoGenerator);
