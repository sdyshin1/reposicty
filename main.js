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

  updateDisplay() {
    const ballContainer = this.shadowRoot.querySelector('.ball-container');
    ballContainer.innerHTML = '';
    
    this.numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = 'ball';
      ball.textContent = num;
      ball.style.animationDelay = `${index * 0.1}s`;
      
      // Dynamic coloring based on number range
      const hue = (num * 8) % 360;
      ball.style.setProperty('--ball-color', `oklch(75% 0.2 ${hue})`);
      
      ballContainer.appendChild(ball);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: oklch(35% 0.05 250 / 0.7);
          backdrop-filter: blur(16px);
          padding: 3rem 2rem;
          border-radius: 24px;
          border: 1px solid oklch(100% 0 0 / 0.1);
          text-align: center;
          box-shadow: 
            0 20px 40px -10px oklch(0% 0 0 / 0.5),
            inset 0 1px 1px oklch(100% 0 0 / 0.1);
          color: white;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, oklch(80% 0.2 250), oklch(80% 0.2 330));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ball-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
          min-height: 80px;
        }

        .ball {
          width: 64px;
          height: 64px;
          background: var(--ball-color, oklch(85% 0.2 60));
          color: oklch(20% 0.1 60);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.5rem;
          box-shadow: 
            0 10px 20px -5px oklch(from var(--ball-color) l c h / 0.4),
            inset 0 -4px 8px oklch(0% 0 0 / 0.15);
          animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: scale(0);
        }

        @keyframes pop-in {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        button {
          background: oklch(70% 0.25 250);
          color: oklch(20% 0.05 250);
          border: none;
          padding: 1.25rem 3rem;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px oklch(70% 0.25 250 / 0.3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        button:hover {
          transform: translateY(-2px) scale(1.02);
          background: oklch(75% 0.25 250);
          box-shadow: 0 10px 30px oklch(70% 0.25 250 / 0.5);
        }

        button:active {
          transform: translateY(1px) scale(0.98);
        }

        @container (max-width: 500px) {
          .ball {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
        }
      </style>
      
      <h1>Lotto Numbers</h1>
      <div class="ball-container">
        <!-- Balls will be injected here -->
        <p style="opacity: 0.6; width: 100%;">Click generate to see your lucky numbers!</p>
      </div>
      <button id="generateBtn">Generate</button>
    `;

    this.shadowRoot.getElementById('generateBtn').addEventListener('click', () => this.generateNumbers());
  }
}

customElements.define('lotto-generator', LottoGenerator);
