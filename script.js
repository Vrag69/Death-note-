// === PUZZLE DATA: 10 mind-bending logic levels ===
const puzzles = [
  {
    title: "Truth or Lie?",
    question: `
      Exactly <span class="keyword">one</span> of these statements is true.
      Lawlit has seconds to decide. Which option is correct?
    `,
    options: {
      A: "The answer is C.",
      B: "The answer is D.",
      C: "The answer is not A.",
      D: "The answer is B."
    },
    correct: "C",
    hint: "Assume A is true. What happens to C? Try each statement like that.",
    timeoutMessage: "⏳ Time's up. Overthinking killed you before Kira did."
  },
  {
    title: "Mirror Logic",
    question: `
      In this room, every statement spoken is mirrored:  
      “The correct answer is B” becomes “The correct answer is not B”.  
      Which option must be correct?
    `,
    options: {
      A: "The correct answer is A.",
      B: "The correct answer is B.",
      C: "The correct answer is not C.",
      D: "None of the above."
    },
    correct: "C",
    hint: "If text and reality are always inverted, what happens to “not C”?",
    timeoutMessage: "⏳ You stared at the mirror too long. The reflection wrote your name."
  },
  {
    title: "Paradox Pair",
    question: `
      Two lines are written on the wall:<br><br>
      1) “Exactly one of these four options is wrong.”<br>
      2) “Exactly one of these four options is right.”<br><br>
      Only one option below keeps both lines logically consistent. Which?
    `,
    options: {
      A: "Both lines are true.",
      B: "Both lines are false.",
      C: "Line 1 is true, Line 2 is false.",
      D: "Line 1 is false, Line 2 is true."
    },
    correct: "C",
    hint: "Try to satisfy the counts: ‘exactly one wrong’ vs ‘exactly one right’.",
    timeoutMessage: "⏳ Paradox overflow. Your brain short-circuited before the notebook closed."
  },
  {
    title: "Knights & Liars",
    question: `
      Three suspects speak:<br><br>
      X: “Y is guilty.”<br>
      Y: “Z is guilty.”<br>
      Z: “X and I are both innocent.”<br><br>
      Exactly one of them tells the truth. Who is actually guilty?
    `,
    options: {
      A: "X",
      B: "Y",
      C: "Z",
      D: "None of them"
    },
    correct: "B",
    hint: "Try assuming each one is guilty and check which makes only one statement true.",
    timeoutMessage: "⏳ You trusted the wrong witness. Kira trusted the notebook."
  },
  {
    title: "Broken Clock",
    question: `
      A digital clock in the room shows “09:00”.  
      A message says: “In 5 hours, this clock will show 02:00.”  
      The clock is not broken, and no time travel is involved. How?
    `,
    options: {
      A: "It's a 12-hour clock looping.",
      B: "It's a 24-hour military clock.",
      C: "It's counting in a different number base.",
      D: "It's actually a timer, not a clock."
    },
    correct: "A",
    hint: "Think about how analog clocks loop back to the same numbers.",
    timeoutMessage: "⏳ Time ran out while you argued with time itself."
  },
  {
    title: "Impossible Equation",
    question: `
      On the wall: <span class="keyword">9 + 5 = 2</span>  
      It's not a mistake. In this room, it's correct. What does it mean?
    `,
    options: {
      A: "It's base-7 arithmetic.",
      B: "It's a clock: 9 o'clock + 5 hours = 2.",
      C: "Each number is a code for letters.",
      D: "The plus sign means subtraction."
    },
    correct: "B",
    hint: "What if “2” means 2 o'clock, not the number 2 itself?",
    timeoutMessage: "⏳ You tried to fix the equation. Kira fixed your heartbeat."
  },
  {
    title: "Doors of Contradiction",
    question: `
      Two doors: A and B. One leads to survival, one to death.  
      A note: “Exactly one of these doors has a true statement.”<br><br>
      Door A sign: “Door B leads to death.”<br>
      Door B sign: “Door A leads to death.”<br><br>
      Which door is safe?
    `,
    options: {
      A: "Door A",
      B: "Door B",
      C: "Both are safe",
      D: "Both are deadly"
    },
    correct: "A",
    hint: "If both signs were true or both false, would the note still be right?",
    timeoutMessage: "⏳ Hesitation killed you. The notebook just made it official."
  },
  {
    title: "Shifting Truth",
    question: `
      A voice says: “The correct answer is the option that you would not pick  
      if you had only 1 second to decide.”  
      Instinctively, which option would you *not* pick in panic?
    `,
    options: {
      A: "A",
      B: "B",
      C: "C",
      D: "D"
    },
    correct: "D",
    hint: "Most minds avoid the last option under panic. Use that against the room.",
    timeoutMessage: "⏳ You froze. The room already knew your instinct."
  },
  {
    title: "Binary Confession",
    question: `
      Lawlit finds a note: <span class="keyword">1010</span> is the key.  
      Four options claim what the note means. Only one fits the pattern of previous rooms.
    `,
    options: {
      A: "It's 10 in decimal.",
      B: "It's 2 in decimal.",
      C: "It's 10, meaning 'X' in Roman numerals.",
      D: "It's 4, since 1+0+1+0 = 4."
    },
    correct: "A",
    hint: "Binary 1010 becomes what in normal decimal counting?",
    timeoutMessage: "⏳ You misread the code. Kira didn't."
  },
  {
    title: "Final Layer",
    question: `
      A final message appears:  
      “If you choose the correct option, this will be the last puzzle.  
      If you choose the wrong one, you'll repeat this level forever.”<br><br>
      Which option signals your refusal to play by the room's rules?
    `,
    options: {
      A: "Pick logically: A",
      B: "Pick randomly: B",
      C: "Refuse: C",
      D: "Trust your fear: D"
    },
    correct: "C",
    hint: "Sometimes the only winning move is to reject the game.",
    timeoutMessage: "⏳ You kept playing the room's game. It finally played you."
  }
];

// === GAME STATE ===
let currentIndex = 0;
let timeLeft = 30;
let isGameOver = false;
let hintUsed = false;
let intervalId = null;
let audioStarted = false;

// TIME CONFIG
const BASE_TIME = 30;
const TIME_INCREMENT_PER_LEVEL = 5;

// DOM
const timerEl = document.getElementById("timer");
const statusEl = document.getElementById("status");
const buttons = document.querySelectorAll(".options button");
const puzzleLabelEl = document.querySelector(".puzzle-label");
const puzzleTitleEl = document.querySelector(".puzzle-title");
const questionEl = document.querySelector(".question");
const hintTextEl = document.getElementById("hintText");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

// Start overlay
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");

// Audio
const bgMusic = document.getElementById("bgMusic");
const warningSound = document.getElementById("warningSound");
const kiraVoice = document.getElementById("kiraVoice");

// === AUDIO (simple + safe) ===
// Your file is already trimmed, so just play from 0.
function ensureAudioStarted() {
  if (audioStarted) return;
  audioStarted = true;

  if (!bgMusic) return;

  bgMusic.volume = 0.35;
  bgMusic.play().catch(err => {
    console.log("Audio play blocked or failed:", err);
  });
}

// === TIMER ===
function updateTimerDisplay() {
  const seconds = Math.max(timeLeft, 0);
  const formatted = "00:" + String(seconds).padStart(2, "0");
  timerEl.textContent = formatted;
}

function startTimer() {
  if (intervalId) clearInterval(intervalId);

  timeLeft = BASE_TIME + currentIndex * TIME_INCREMENT_PER_LEVEL;
  updateTimerDisplay();

  document.body.classList.remove("panic", "dead");
  timerEl.classList.remove("timer-low");
  timerEl.classList.add("timer-normal");

  intervalId = setInterval(() => {
    if (isGameOver) return;

    timeLeft--;
    updateTimerDisplay();

    if (timeLeft === 10) {
      document.body.classList.add("panic");
      timerEl.classList.add("timer-low");
      if (warningSound) {
        warningSound.currentTime = 0;
        warningSound.play().catch(() => {});
      }
    }

    if (timeLeft <= 0) {
      const puzzle = puzzles[currentIndex];
      endGame(false, puzzle.timeoutMessage || "⏳ Time’s up. Kira writes your name.");
    }
  }, 1000);
}

// === LOAD PUZZLE ===
function loadPuzzle(index) {
  currentIndex = index;
  const puzzle = puzzles[index];

  const num = String(index + 1).padStart(2, "0");
  puzzleLabelEl.textContent = `Puzzle ${num} / Mind-Bending Logic`;
  puzzleTitleEl.textContent = puzzle.title;

  questionEl.innerHTML = puzzle.question;

  const keys = ["A", "B", "C", "D"];
  buttons.forEach((btn, i) => {
    const key = keys[i];
    btn.setAttribute("data-option", key);
    btn.textContent = `${key}: ${puzzle.options[key]}`;
    btn.disabled = false;
    btn.style.cursor = "pointer";
    btn.style.opacity = 1;
    btn.style.borderColor = "rgba(255, 255, 255, 0.08)";
  });

  statusEl.textContent = "";
  statusEl.classList.remove("win", "lose");
  restartBtn.style.display = "none";
  nextBtn.style.display = "none";

  hintUsed = false;
  hintTextEl.textContent = 'Click "Hint" if you\'re desperate.';
  hintTextEl.classList.add("dim");

  isGameOver = false;
  startTimer();
}

// === HANDLE CHOICE ===
function handleChoice(option, btn) {
  if (isGameOver) return;
  ensureAudioStarted();

  const puzzle = puzzles[currentIndex];

  if (option === puzzle.correct) {
    endGame(true, puzzle.successMessage || "✔ Correct. Lawlit survives—this time.");
    btn.style.borderColor = "#64ff9b";
  } else {
    timeLeft = 0;
    updateTimerDisplay();
    if (kiraVoice) {
      kiraVoice.currentTime = 0;
      kiraVoice.play().catch(() => {});
    }
    endGame(false, puzzle.failMessage || "✖ Wrong choice. Logic failed you. The notebook closes on your name.");
    btn.style.borderColor = "#ff4b4b";
  }
}

// === END GAME ===
function endGame(success, message) {
  if (isGameOver) return;
  isGameOver = true;

  if (intervalId) clearInterval(intervalId);

  statusEl.textContent = message;
  statusEl.classList.toggle("win", success);
  statusEl.classList.toggle("lose", !success);

  if (!success) {
    document.body.classList.add("dead");
  } else {
    document.body.classList.remove("panic");
  }

  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = "default";
    btn.style.opacity = 0.7;
  });

  restartBtn.style.display = "block";

  if (success && currentIndex < puzzles.length - 1) {
    nextBtn.style.display = "block";
  } else if (success && currentIndex === puzzles.length - 1) {
    statusEl.textContent += " All layers cleared. Kira has nothing left to hide.";
  }
}

// === EVENTS ===
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const chosen = btn.getAttribute("data-option");
    handleChoice(chosen, btn);
  });
});

hintBtn.addEventListener("click", () => {
  if (isGameOver || hintUsed) return;
  ensureAudioStarted();

  hintUsed = true;
  const puzzle = puzzles[currentIndex];

  // 🔥 HINT TEXT UPDATE
  hintTextEl.textContent = puzzle.hint || "Trust your instincts. The room feeds on doubt.";
  hintTextEl.classList.remove("dim");

  // time penalty
  timeLeft = Math.max(timeLeft - 5, 5);
  updateTimerDisplay();

  if (kiraVoice && Math.random() < 0.4) {
    kiraVoice.currentTime = 0;
    kiraVoice.play().catch(() => {});
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex >= puzzles.length - 1) return;
  ensureAudioStarted();
  loadPuzzle(currentIndex + 1);
});

restartBtn.addEventListener("click", () => {
  ensureAudioStarted();
  document.body.classList.remove("dead", "panic");
  loadPuzzle(currentIndex);
});

// START BUTTON
startBtn.addEventListener("click", () => {
  ensureAudioStarted();
  startOverlay.classList.add("hidden");
  loadPuzzle(0);
});

// no loadPuzzle(0) at bottom → waits for START
