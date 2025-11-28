// === ALL 10 PUZZLES ===
const puzzles = [
  {
    title: "Truth or Lie?",
    question: `Exactly <b>one</b> of these statements is true. Which is correct?`,
    options: [
      "A: The answer is C.",
      "B: The answer is D.",
      "C: The answer is not A.",
      "D: The answer is B."
    ],
    correct: 2, // C
    hint: "Assume A is true. Does that break C? Try each line like that.",
    timeoutMessage: "⏳ Time's up. Overthinking killed you before Kira did."
  },
  {
    title: "Mirror Logic",
    question: `In this room, every statement is reversed. “The correct answer is B” becomes “The correct answer is not B”. Which option must be correct?`,
    options: [
      "A: The correct answer is A.",
      "B: The correct answer is B.",
      "C: The correct answer is not C.",
      "D: None of the above."
    ],
    correct: 2, // C
    hint: "If text and reality are always inverted, what happens to “not C”?",
    timeoutMessage: "⏳ You stared at the mirror too long. The reflection wrote your name."
  },
  {
    title: "Paradox Pair",
    question: `
      Two lines are on the wall:<br>
      1) “Exactly one of these four options is wrong.”<br>
      2) “Exactly one of these four options is right.”<br>
      Only one option keeps both lines consistent. Which?
    `,
    options: [
      "A: Both lines are true.",
      "B: Both lines are false.",
      "C: Line 1 is true, Line 2 is false.",
      "D: Line 1 is false, Line 2 is true."
    ],
    correct: 2, // C
    hint: "Try to make the counts match: one wrong vs one right.",
    timeoutMessage: "⏳ Paradox overflow. Your brain short-circuited before the notebook closed."
  },
  {
    title: "Knights & Liars",
    question: `
      Three suspects speak:<br>
      X: “Y is guilty.”<br>
      Y: “Z is guilty.”<br>
      Z: “X and I are both innocent.”<br>
      Exactly one tells the truth. Who is actually guilty?
    `,
    options: [
      "A: X",
      "B: Y",
      "C: Z",
      "D: None of them"
    ],
    correct: 1, // Y
    hint: "Assume each one is guilty and see when exactly one statement stays true.",
    timeoutMessage: "⏳ You trusted the wrong witness. Kira trusted the notebook."
  },
  {
    title: "Broken Clock",
    question: `
      A digital clock shows “09:00”. A note says: “In 5 hours, this clock will show 02:00.”<br>
      The clock isn't broken and there's no time travel. How is this true?
    `,
    options: [
      "A: It's a 12-hour clock looping.",
      "B: It's a 24-hour military clock.",
      "C: It's counting in a different number base.",
      "D: It's actually a timer, not a clock."
    ],
    correct: 0, // A
    hint: "Think analog: 9 o'clock + 5 hours on a normal clock face.",
    timeoutMessage: "⏳ Time ran out while you argued with time itself."
  },
  {
    title: "Impossible Equation",
    question: `
      On the wall: <b>9 + 5 = 2</b><br>
      It's not a mistake. In this room, it's correct. What does it mean?
    `,
    options: [
      "A: It's base-7 arithmetic.",
      "B: It's a clock: 9 o'clock + 5 hours = 2.",
      "C: Each number codes for letters.",
      "D: The plus sign means subtraction."
    ],
    correct: 1, // B
    hint: "What if “2” means 2 o'clock, not the number 2?",
    timeoutMessage: "⏳ You tried to fix the equation. Kira fixed your heartbeat."
  },
  {
    title: "Doors of Contradiction",
    question: `
      Two doors: A and B. One leads to survival, one to death.<br>
      Note: “Exactly one of these doors has a true statement.”<br>
      Door A: “Door B leads to death.”<br>
      Door B: “Door A leads to death.”<br>
      Which door is safe?
    `,
    options: [
      "A: Door A",
      "B: Door B",
      "C: Both are safe",
      "D: Both are deadly"
    ],
    correct: 0, // Door A
    hint: "If both were true or both false, would the note still be right?",
    timeoutMessage: "⏳ Hesitation killed you. The notebook just made it official."
  },
  {
    title: "Shifting Truth",
    question: `
      A voice says: “The correct answer is the option you would <b>not</b> pick if you had 1 second to decide.”<br>
      In panic, which option do most people avoid picking last?
    `,
    options: [
      "A: A",
      "B: B",
      "C: C",
      "D: D"
    ],
    correct: 3, // D
    hint: "Most minds hesitate on the last option under pressure.",
    timeoutMessage: "⏳ You froze. The room already knew your instinct."
  },
  {
    title: "Binary Confession",
    question: `
      L finds a note: <b>1010</b> is the key.<br>
      Only one interpretation fits the style of the previous rooms.
    `,
    options: [
      "A: It's 10 in decimal (binary to normal).",
      "B: It's 2 in decimal.",
      "C: It's 10, meaning 'X' in Roman numerals.",
      "D: It's 4, because 1+0+1+0 = 4."
    ],
    correct: 0, // A
    hint: "Binary 1010 → decimal ? You've seen this in CS.",
    timeoutMessage: "⏳ You misread the code. Kira didn’t."
  },
  {
    title: "Final Layer",
    question: `
      Final message:<br>
      “If you choose the correct option, this will be the last puzzle.<br>
      If you choose the wrong one, you'll repeat this level forever.”<br>
      Which option means refusing to play by the room's rules?
    `,
    options: [
      "A: Pick logically: A",
      "B: Pick randomly: B",
      "C: Refuse: C",
      "D: Trust your fear: D"
    ],
    correct: 2, // C
    hint: "Sometimes the only winning move is to reject the game itself.",
    timeoutMessage: "⏳ You kept playing the room's game. It finally played you."
  }
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
const startBtn = document.getElementById("startBtn");

const bgMusic = document.getElementById("bgMusic");

// === AUDIO ===
function playAudio() {
  if (audioStarted) return;
  audioStarted = true;
  if (!bgMusic) return;
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {
    console.log("Audio blocked until another interaction.");
  });
}

// === TIMER ===
const BASE_TIME = 30;
const TIME_INCREMENT_PER_LEVEL = 5;

function updateTimer() {
  timerEl.textContent = "00:" + String(Math.max(timeLeft, 0)).padStart(2, "0");
}

function startTimer() {
  clearInterval(interval);
  timeLeft = BASE_TIME + current * TIME_INCREMENT_PER_LEVEL;
  timerEl.classList.remove("timer-low");
  updateTimer();

  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 10) {
      timerEl.classList.add("timer-low");
    }

    if (timeLeft <= 0) {
      const puzzle = puzzles[current];
      end(false, puzzle.timeoutMessage || "⏳ Time’s up. Kira wrote your name.");
    }
  }, 1000);
}

// === PUZZLE LOADING ===
function loadPuzzle() {
  const p = puzzles[current];

  puzzleNumber.textContent = current + 1;
  titleEl.innerHTML = p.title;
  questionEl.innerHTML = p.question;

  optionsEl.innerHTML = "";
  p.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsEl.appendChild(btn);
  });

  statusEl.textContent = "";
  statusEl.className = "status";

  hintText.textContent = `Click "HINT" if you're desperate.`;
  hintText.classList.add("dim");

  nextBtn.style.display = "none";
  restartBtn.style.display = "none";

  startTimer();
}

// === ANSWER CHECK ===
function checkAnswer(i, btn) {
  playAudio();
  const p = puzzles[current];

  [...optionsEl.children].forEach(b => b.disabled = true);

  if (i === p.correct) {
    btn.style.borderColor = "#44ff9b";
    end(true, "✔ Correct. L survives.");
  } else {
    btn.style.borderColor = "#ff3434";
    timeLeft = 0;
    updateTimer();
    end(false, "✖ Wrong. Logic failed you. Kira closes the notebook.");
  }
}

// === END OF ROUND ===
function end(success, msg) {
  clearInterval(interval);
  statusEl.textContent = msg;
  statusEl.className = success ? "status win" : "status lose";

  [...optionsEl.children].forEach(b => {
    b.disabled = true;
    b.style.opacity = 0.7;
  });

  restartBtn.style.display = "block";

  if (success && current < puzzles.length - 1) {
    nextBtn.style.display = "block";
  } else if (success && current === puzzles.length - 1) {
    statusEl.textContent += " All layers cleared. Kira has nothing left to hide.";
  }
}

// === BUTTON HANDLERS ===
hintBtn.onclick = () => {
  if (hintText.classList.contains("dim") === false) return; // already used
  playAudio();

  const p = puzzles[current];
  hintText.textContent = p.hint || "Trust your instincts. The room feeds on doubt.";
  hintText.classList.remove("dim");

  // Time penalty
  timeLeft = Math.max(timeLeft - 5, 5);
  updateTimer();
};

nextBtn.onclick = () => {
  if (current >= puzzles.length - 1) return;
  current++;
  loadPuzzle();
};

restartBtn.onclick = () => {
  loadPuzzle();
};

startBtn.onclick = () => {
  playAudio();
  startScreen.style.display = "none";
  game.style.display = "block";
  loadPuzzle();
};
