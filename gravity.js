let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

this.screen = {
  width: window.innerWidth,
  height: window.innerHeight,
};

this.mouse = {
  x: screen.width / 2,
  y: screen.height / 2,
};

class Ball {
  constructor(x, y, dx, dy, r, color) {
    this.gravity = 1;
    this.friction = 0.8;
    this.r = r || 30;
    this.x = x || randomIntFromInterval(0 + this.r, canvas.width - this.r);
    this.y = y || randomIntFromInterval(0 + this.r, canvas.height - this.r);
    this.dx = dx || (Math.random() - 0.5) * 4;
    this.dy = dy || Math.random() * 4;
    this.color = color || `rgba(231,76,60,${Math.random()})`;
    this.draw();
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = "blue";
    c.fill();
  }

  update() {
    if (this.y + this.r + this.dy > screen.height) {
      this.dy = -this.dy * this.friction;
      this.dx = -this.dx * this.friction;
    } else {
      this.dy += this.gravity;
    }
    if (
      this.x + this.r + this.dx > screen.width ||
      this.y + this.r + this.dy <= 0
    ) {
      this.dx = -this.dx * this.friction;
    }
    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  }
}

class Canvas {
  constructor() {
    this.balls = [];
    for (let i = 0; i < 10; i++) {
      this.balls.push(new Ball());
    }
  }

  animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    this.balls.forEach((ball) => {
      ball.update();
    });
    requestAnimationFrame(this.animate.bind(this));
  }
}

let myCan = new Canvas();
myCan.animate();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
