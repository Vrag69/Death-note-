const puzzles = [
  {
    title: "Truth or Lie?",
    question: `Exactly <b>one</b> of these statements is true. Which is correct?`,
    options: ["A: The answer is C.","B: The answer is D.","C: The answer is not A.","D: The answer is B."],
    correct: 2,
    hint: "Assume A is true. Now check C. Repeat logic."
  },
  {
    title: "Mirror Logic",
    question: `Every statement is reversed. Which one must be correct?`,
    options: ["A: A","B: B","C: Not C","D: None"],
    correct: 2,
    hint: "If truth flips, then 'not C' flips too."
  },
  // ...add remaining puzzles later
];

let current = 0;
let timeLeft = 30;
let interval;
let audioStarted = false;

const startScreen = document.getElementById("startScreen");
const game = document.getElementById("gameContainer");

const titleEl = document.getElementById("puzzleTitle");
const questionEl = document.getElementById("puzzleQuestion");
const optionsEl = document.getElementById("options");
const statusEl = document.getElementById("status");
const hintText = document.getElementById("hintText");
const timerEl = document.getElementById("timer");
const puzzleNumber = document.getElementById("puzzleNumber");

const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const bgMusic = document.getElementById("bgMusic");

function playAudio() {
  if (!audioStarted) {
    audioStarted = true;
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => console.log("Audio wait"));
  }
}

function startTimer() {
  clearInterval(interval);
  timeLeft = 30 + current * 5;
  updateTimer();

  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 10) timerEl.classList.add("timer-low");
    if (timeLeft <= 0) end(false, "⏳ Time’s up. Kira wrote your name.");
  }, 1000);
}

function updateTimer() {
  timerEl.textContent = "00:" + String(timeLeft).padStart(2, "0");
}

function loadPuzzle() {
  const p = puzzles[current];
  puzzleNumber.textContent = current + 1;
  titleEl.textContent = p.title;
  questionEl.innerHTML = p.question;
  statusEl.textContent = "";

  optionsEl.innerHTML = "";
  p.options.forEach((opt, i)=> {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsEl.appendChild(btn);
  });

  hintText.textContent = `Click "HINT" if you're desperate.`;
  hintText.classList.add("dim");
  nextBtn.style.display = "none";
  restartBtn.style.display = "none";

  startTimer();
}

function checkAnswer(i, btn) {
  playAudio();
  const correct = puzzles[current].correct;
  if (i === correct) {
    end(true, "✔ Correct. L survives.");
    btn.style.borderColor = "#44ff9b";
  } else {
    timeLeft = 0;
    end(false, "✖ Wrong. Logic failed you.");
    btn.style.borderColor = "#ff3434";
  }
}

function end(success, msg) {
  clearInterval(interval);
  statusEl.textContent = msg;
  statusEl.className = success ? "status win" : "status lose";

  [...optionsEl.children].forEach(b=>{
    b.disabled = true; b.style.opacity = .6;
  });

  restartBtn.style.display = "block";
  if (success && current < puzzles.length - 1) nextBtn.style.display = "block";
}

hintBtn.onclick = () => {
  playAudio();
  hintText.textContent = puzzles[current].hint;
  hintText.classList.remove("dim");
  timeLeft = Math.max(timeLeft - 5, 5);
}

nextBtn.onclick = () => {
  current++;
  loadPuzzle();
};

restartBtn.onclick = () => loadPuzzle();

document.getElementById("startBtn").onclick = () => {
  playAudio();
  startScreen.style.display = "none";
  game.style.display = "block";
  loadPuzzle();
};
