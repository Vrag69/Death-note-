// === ALL PUZZLES ===
const puzzles = [
  {
    title: "Truth or Lie?",
    question: `Exactly <b>one</b> of these statements is true. Which is correct?`,
    options: ["A: The answer is C.","B: The answer is D.","C: The answer is not A.","D: The answer is B."],
    correct: 2,
    hint: "Not everything that points looks forward."
  },
  {
    title: "Mirror Logic",
    question: `In this room, everything reflects backwards. What looks truthful in distortion?`,
    options: ["A: A","B: B","C: Not C","D: None"],
    correct: 2,
    hint: "Mirrors tell the truth by lying."
  },
  {
    title: "Paradox Pair",
    question: `Two lines:<br>1) “Exactly one option is wrong.”<br>2) “Exactly one option is right.”`,
    options: ["A: Both true","B: Both false","C: 1 true, 2 false","D: 1 false, 2 true"],
    correct: 2,
    hint: "Balance the numbers. One must break."
  },
  {
    title: "Knights & Liars",
    question: `One truth, two lies. X blames Y. Y blames Z. Z says both innocent.`,
    options: ["A: X","B: Y","C: Z","D: None"],
    correct: 1,
    hint: "Find the voice that profits from chaos."
  },
  {
    title: "Broken Clock",
    question: `09:00 → +5 hours → 02:00. True without magic. How?`,
    options: ["A: 12h loop","B: 24h mode","C: Different base","D: Timer"],
    correct: 0,
    hint: "Hours repeat. Fear does too."
  },
  {
    title: "Impossible Equation",
    question: `9 + 5 = 2 is written in blood. It’s correct. Why?`,
    options: ["A: Base-7","B: Clock math","C: Code letters","D: Minus"],
    correct: 1,
    hint: "Look at time, not numbers."
  },
  {
    title: "Contradiction Doors",
    question: `Only one sign is truthful. Door A says B kills. Door B says A kills.`,
    options: ["A: A","B: B","C: Both safe","D: Both deadly"],
    correct: 0,
    hint: "Contradictions are never symmetrical."
  },
  {
    title: "Shifting Truth",
    question: `The correct choice is the one you'd avoid under pressure.`,
    options: ["A","B","C","D"],
    correct: 3,
    hint: "Instinct betrays you when time breaks."
  },
  {
    title: "Binary Confession",
    question: `1010 is the key.`,
    options: ["A: 10","B: 2","C: X","D: 4"],
    correct: 0,
    hint: "Binary hides simplicity."
  },
  {
    title: "Final Layer",
    question: `The room demands compliance. The only escape is refusal.`,
    options: ["A: Logic","B: Chance","C: Reject","D: Fear"],
    correct: 2,
    hint: "The only winning move is disobedience."
  }
];

// === GAME STATE ===
let current = 0;
let timeLeft = 30;
let interval;
let audioStarted = false;

const startScreen = document.getElementById("startScreen");
const game = document.getElementById("gameContainer");
const bgMusic = document.getElementById("bgMusic");
const heartbeat = new Audio("audio/heartbeat.mp3");

const titleEl = document.getElementById("puzzleTitle");
const questionEl = document.getElementById("puzzleQuestion");
const optionsEl = document.getElementById("options");
const statusEl = document.getElementById("status");
const hintEl = document.getElementById("hintText");
const timerEl = document.getElementById("timer");
const puzzleNumber = document.getElementById("puzzleNumber");

const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");

function playAudio() {
  if (audioStarted) return;
  audioStarted = true;
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => console.log("Audio locked until click again"));
}

function updateTimer() {
  timerEl.textContent = "00:" + String(Math.max(timeLeft,0)).padStart(2,"0");

  if (timeLeft <= 10) {
    timerEl.classList.add("timer-low");
    heartbeat.volume = .55;
    heartbeat.loop = true;
    heartbeat.play().catch(()=>{});
  }

  if (timeLeft <= 5) document.body.classList.add("shake");
}

function startTimer() {
  clearInterval(interval);
  timeLeft = 30 + current * 5;
  updateTimer();

  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) end(false,"⏳ Time’s up. You hesitated.");
  },1000);
}

function loadPuzzle() {
  const p = puzzles[current];

  puzzleNumber.textContent = current+1;
  titleEl.innerHTML = p.title;
  questionEl.innerHTML = p.question;
  statusEl.textContent = "";
  statusEl.className = "status";

  optionsEl.innerHTML = "";
  p.options.forEach((opt,i)=>{
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=> checkAnswer(i,btn);
    optionsEl.appendChild(btn);
  });

  hintEl.textContent = `Click "HINT" if you're desperate.`;
  hintEl.classList.add("dim");

  nextBtn.style.display = "none";
  restartBtn.style.display = "none";

  document.body.classList.remove("shake","flash");
  heartbeat.pause();

  startTimer();
}

function checkAnswer(i, btn){
  playAudio();
  const p = puzzles[current];

  [...optionsEl.children].forEach(b=> b.disabled = true);

  if (i===p.correct){
    btn.style.borderColor="#44ff9b";
    end(true,"✔ Correct. L breathes again.");
  } else {
    timeLeft=0;
    updateTimer();
    btn.style.borderColor="#ff3434";
    end(false,"✖ Wrong — your logic betrayed you.");
  }
}

function end(success,msg){
  clearInterval(interval);
  heartbeat.pause();
  statusEl.textContent = msg;
  statusEl.className = success ? "status win":"status lose";

  [...optionsEl.children].forEach(b=>{
    b.disabled=true;
    b.style.opacity=.6;
  });

  restartBtn.style.display = "block";
  if (success && current < puzzles.length-1) nextBtn.style.display="block";
}

hintBtn.onclick = ()=>{
  playAudio();
  document.body.classList.add("flash");
  setTimeout(()=>document.body.classList.remove("flash"),300);

  hintEl.textContent = puzzles[current].hint;
  hintEl.classList.remove("dim");

  // Big punishment
  timeLeft = Math.max(timeLeft - 10, 5);
  updateTimer();
};

nextBtn.onclick = ()=>{ current++; loadPuzzle(); };
restartBtn.onclick = ()=> loadPuzzle();

startBtn.onclick = ()=>{
  playAudio();
  startScreen.style.display="none";
  game.style.display="block";
  loadPuzzle();
};
