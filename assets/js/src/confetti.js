/**
 * Confetti & Sequin Animation Module
 * Default export initializes the animation and event listeners.
 */

// Credit for this code belongs to <https://codepen.io/coopergoeke/pen/wvaYMbJ>
// I just borrowed it but modified it to work as an ESM
// I also ditched polluting the window object and a few other modernizations

export default function confetti() {
  const button = document.getElementById('button');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Configuration Constants
  const config = {
    confettiCount: 20,
    sequinCount: 10,
    gravityConfetti: 0.3,
    gravitySequins: 0.55,
    dragConfetti: 0.075,
    dragSequins: 0.02,
    terminalVelocity: 3,
    colors: [
      { front: '#7b5cff', back: '#6245e0' },
      { front: '#b3c7ff', back: '#8fa5e5' },
      { front: '#5c86ff', back: '#345dd1' }
    ]
  };

  let confetti = [];
  let sequins = [];
  let isDisabled = false;

  // --- Helpers ---
  const randomRange = (min, max) => Math.random() * (max - min) + min;

  const initConfettoVelocity = (xRange, yRange) => {
    const x = randomRange(xRange[0], xRange[1]);
    const range = yRange[1] - yRange[0] + 1;
    let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
    if (y >= yRange[1] - 1) {
      y += (Math.random() < 0.25) ? randomRange(1, 3) : 0;
    }
    return { x: x, y: -y };
  };

  // --- Classes ---
  class Confetto {
    constructor() {
      this.randomModifier = randomRange(0, 99);
      this.color = config.colors[Math.floor(randomRange(0, config.colors.length))];
      this.dimensions = { x: randomRange(5, 9), y: randomRange(8, 15) };
      this.position = {
        x: randomRange(canvas.width / 2 - button.offsetWidth / 4, canvas.width / 2 + button.offsetWidth / 4),
        y: randomRange(canvas.height / 2 + button.offsetHeight / 2 + 8, canvas.height / 2 + (1.5 * button.offsetHeight) - 8),
      };
      this.rotation = randomRange(0, 2 * Math.PI);
      this.scale = { x: 1, y: 1 };
      this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
    }

    update() {
      this.velocity.x -= this.velocity.x * config.dragConfetti;
      this.velocity.y = Math.min(this.velocity.y + config.gravityConfetti, config.terminalVelocity);
      this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
    }
  }

  class Sequin {
    constructor() {
      this.color = config.colors[Math.floor(randomRange(0, config.colors.length))].back;
      this.radius = randomRange(1, 2);
      this.position = {
        x: randomRange(canvas.width / 2 - button.offsetWidth / 3, canvas.width / 2 + button.offsetWidth / 3),
        y: randomRange(canvas.height / 2 + button.offsetHeight / 2 + 8, canvas.height / 2 + (1.5 * button.offsetHeight) - 8),
      };
      this.velocity = { x: randomRange(-6, 6), y: randomRange(-8, -12) };
    }

    update() {
      this.velocity.x -= this.velocity.x * config.dragSequins;
      this.velocity.y = this.velocity.y + config.gravitySequins;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  // --- Core Functions ---
  const initBurst = () => {
    for (let i = 0; i < config.confettiCount; i++) confetti.push(new Confetto());
    for (let i = 0; i < config.sequinCount; i++) sequins.push(new Sequin());
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
      const width = confetto.dimensions.x * confetto.scale.x;
      const height = confetto.dimensions.y * confetto.scale.y;

      ctx.save();
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);
      confetto.update();
      ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.restore();

      // Masking logic for the button area
      if (confetto.velocity.y < 0) {
        ctx.clearRect(canvas.width / 2 - button.offsetWidth / 2, canvas.height / 2 + button.offsetHeight / 2, button.offsetWidth, button.offsetHeight);
      }

      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
    });

    sequins.forEach((sequin, index) => {
      ctx.save();
      ctx.translate(sequin.position.x, sequin.position.y);
      sequin.update();
      ctx.fillStyle = sequin.color;
      ctx.beginPath();
      ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      if (sequin.velocity.y < 0) {
        ctx.clearRect(canvas.width / 2 - button.offsetWidth / 2, canvas.height / 2 + button.offsetHeight / 2, button.offsetWidth, button.offsetHeight);
      }

      if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
    });

    requestAnimationFrame(render);
  };

  const clickButton = () => {
    if (isDisabled) return;
    isDisabled = true;

    button.classList.add('loading');
    button.classList.remove('ready');

    setTimeout(() => {
      button.classList.add('complete');
      button.classList.remove('loading');
      setTimeout(() => {
        initBurst();
        setTimeout(() => {
          isDisabled = false;
          button.classList.add('ready');
          button.classList.remove('complete');
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 4000);
      }, 320);
    }, 1800);
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // --- Initial Setup & Listeners ---
  window.addEventListener('resize', resizeCanvas);
  button.addEventListener('click', clickButton);
  
  document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.code === 'Space') clickButton();
  });

  // Setup text characters for CSS animation
  button.querySelectorAll('.button-text').forEach((element) => {
    const characters = element.innerText.split('');
    element.innerHTML = characters.map((letter, index) => 
      `<span class="char${index}" style="--d:${index * 30}ms; --dr:${(characters.length - index - 1) * 30}ms;">${letter}</span>`
    ).join('');
  });

  // Start
  resizeCanvas();
  initBurst();
  render();
}
