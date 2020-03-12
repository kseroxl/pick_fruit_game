const start_button = document.getElementById("start_button");
const screens = document.querySelectorAll(".screen");
const fruit_buttons = document.querySelectorAll(".fruit_button");
const game_container = document.querySelector(".game_container");
const time = document.getElementById("time");
const wholeScore = document.getElementById("score");

let selected_fruit = {};
let seconds = 20;
let score = 0;
let intervals = [];

start_button.addEventListener("click", () => {
  screens[0].classList.add("up");
});

fruit_buttons.forEach(button => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_fruit = { src, alt };
    screens[1].classList.add("up");
    let interval = setTimeout(createFruit, 1000);
    intervals.push(interval);
    startGame();
  });
});

function getRandomPoints() {
  const width = window.innerWidth;
  const lenght = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (lenght - 200) + 100;
  return { x, y };
}

function increaseScore() {
  score++;
  wholeScore.innerHTML = `Score: ${score}`;
}

function pickFruit() {
  this.classList.add("picked");
  let interval = setTimeout(() => {
    this.remove();
  }, 2000);
  intervals.push(interval);
  addFruit();
  increaseScore();
}

function addFruit() {
  let interval = setTimeout(createFruit, 1000);
  intervals.push(interval);
  let interval2 = setTimeout(createFruit, 5000);
  intervals.push(interval2);
}

function createFruit() {
  const fruit = document.createElement("div");
  const { x, y } = getRandomPoints();
  fruit.classList.add("fruit");
  fruit.style.left = `${x}px`;
  fruit.style.top = `${y}px`;
  fruit.innerHTML = `<img src="${selected_fruit.src}" alt="${
    selected_fruit.alt
  }" style="transform: rotate(${Math.random() * 360}deg)"/>`;
  fruit.addEventListener("click", pickFruit);
  game_container.appendChild(fruit);
}

function decreaseTime() {
  let sec = seconds;
  sec = sec < 10 ? `0${sec}` : sec;
  time.innerHTML = `Time: ${sec}`;

  seconds--;
  if (seconds === -1) {
    intervals.forEach(interval => {
      clearInterval(interval);
    });
    const allFruits = document.querySelectorAll(".fruit");
    allFruits.forEach(fruit => {
      fruit.remove();
    });
    const result = document.createElement("h1");
    result.innerHTML = `Great job! \n Your score: ${score}`;
    game_container.append(result);
  }
}

function startGame() {
  let interval = setInterval(decreaseTime, 1000);
  intervals.push(interval);
}
