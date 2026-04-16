// ================= QUESTIONS =================

let roadSignsQuestions = [
  { question: "What shape is a stop sign?", options: ["Circle","Triangle","Octagon","Square"], answer: "Octagon" },
  { question: "What does a yield sign mean?", options: ["Stop","Give way","Speed up","No entry"], answer: "Give way" },
  { question: "What does a triangular sign indicate?", options: ["Warning","Stop","Information","Parking"], answer: "Warning" },
  { question: "What does a circular sign usually indicate?", options: ["Information","Command/prohibition","Warning","Parking"], answer: "Command/prohibition" },
  { question: "What does a blue sign indicate?", options: ["Warning","Information/services","Danger","Stop"], answer: "Information/services" },
  { question: "What does a red circle sign mean?", options: ["Direction","Prohibition","Information","Parking"], answer: "Prohibition" },
  { question: "What does a rectangular sign indicate?", options: ["Warning","Information","Danger","Stop"], answer: "Information" },
  { question: "What does a no entry sign mean?", options: ["You may enter","No vehicles allowed","Parking allowed","Turn left"], answer: "No vehicles allowed" },
  { question: "What does a pedestrian crossing sign indicate?", options: ["No walking","Pedestrians may cross","Speed up","Stop always"], answer: "Pedestrians may cross" },
  { question: "What does a railway crossing sign warn?", options: ["Bridge","Train crossing ahead","Stop sign","Traffic light"], answer: "Train crossing ahead" },
  { question: "What does a compulsory direction sign mean?", options: ["Optional","You must follow direction","No entry","Warning"], answer: "You must follow direction" },
  { question: "What does a speed limit sign indicate?", options: ["Minimum speed","Maximum allowed speed","Suggested speed","No limit"], answer: "Maximum allowed speed" },
  { question: "What does a no parking sign mean?", options: ["You can park","No stopping at all","No parking allowed","Parking allowed anytime"], answer: "No parking allowed" },
  { question: "What does a stop ahead sign warn?", options: ["Traffic light","Stop sign ahead","Pedestrian crossing","Railway"], answer: "Stop sign ahead" },
  { question: "What does a sharp bend sign warn?", options: ["Straight road","Curve ahead","Stop","Parking"], answer: "Curve ahead" },
  { question: "What sign is this?",
    image: "stop.png",
    options: ["Yield", "Stop", "No entry", "Parking"],
    answer: "Stop"
  },
  {
    question: "What sign is this?",
    image: "noentry.png",
    options: ["No entry", "Stop", "Parking", "Yield"],
    answer: "No entry"
  },
  {
    question: "What sign is this?",
    image: "pedestrian.png",
    options: ["School", "Watch for pedestrians", "Stop", "Speed up"],
    answer: "Watch for pedestrians"
  },
  {
    question: "What sign is this?",
    image: "railway.png",
    options: ["Railway crossing ahead", "Bus stop", "Parking", "No entry"],
    answer: "Railway crossing ahead"
  },
  {
    question: "What sign is this?",
    image: "speed60.png",
    options: ["Speed limit 60", "Minimum speed", "Stop", "No entry"],
    answer: "Speed limit 60"
  }
];

let rulesQuestions = [
  { question: "What does a red traffic light mean?", options: ["Go","Stop","Slow down","Yield"], answer: "Stop" },
  { question: "What must you do at a stop sign?", options: ["Slow down","Stop completely","Speed up","Ignore"], answer: "Stop completely" },
  { question: "What does a yellow traffic light mean?", options: ["Stop","Go","Prepare to stop","Turn only"], answer: "Prepare to stop" },
  { question: "What is the speed limit in urban areas?", options: ["40 km/h","60 km/h","80 km/h","100 km/h"], answer: "60 km/h" },
  { question: "What is the freeway speed limit?", options: ["80 km/h","100 km/h","120 km/h","140 km/h"], answer: "120 km/h" },
  { question: "What must you do before changing lanes?", options: ["Hoot","Check mirrors and blind spot","Speed up","Brake"], answer: "Check mirrors and blind spot" },
  { question: "When must you wear a seatbelt?", options: ["Only highways","At all times","Only at night","Never"], answer: "At all times" },
  { question: "What should you do in heavy rain?", options: ["Speed up","Slow down","Turn off lights","Ignore"], answer: "Slow down" },
  { question: "When can you overtake?", options: ["Anytime","When safe and legal","At intersections","At curves"], answer: "When safe and legal" },
  { question: "What should you do at a pedestrian crossing?", options: ["Speed up","Ignore","Slow down and be ready to stop","Hoot"], answer: "Slow down and be ready to stop" },
  { question: "What must you do when an emergency vehicle approaches?", options: ["Ignore","Speed up","Give way and pull over","Block road"], answer: "Give way and pull over" },
  { question: "What does a flashing red light mean?", options: ["Go","Stop and proceed when safe","Speed up","Turn only"], answer: "Stop and proceed when safe" },
  { question: "What is a safe following distance?", options: ["1 second","2 seconds","3 seconds or more","No rule"], answer: "3 seconds or more" },
  { question: "When is it illegal to use a cellphone while driving?", options: ["Never","Only at night","Without hands-free","Only highways"], answer: "Without hands-free" },
  { question: "What should you do before turning?", options: ["Hoot","Signal early","Speed up","Ignore"], answer: "Signal early" },
  { question: "What does a red traffic light mean?", options: ["Go","Stop","Slow down","Yield"], answer: "Stop" },
  { question: "What must you do at a stop sign?", options: ["Slow down","Stop completely","Speed up","Ignore"], answer: "Stop completely" },
  { question: "What must you do when an emergency vehicle approaches?", options: ["Ignore","Speed up","Give way and pull over","Block road"], answer: "Give way and pull over" }
];

// ================= VARIABLES =================

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let timeLeft = 30;
let timer;

// ================= ELEMENTS =================

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const restartBtn = document.getElementById("restart-btn");

// ================= START QUIZ =================

function startQuiz(type) {
    document.getElementById("start-screen").style.display = "none";
  // SWITCH SCREENS
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  // SELECT QUESTIONS
  if (type === "signs") {
    questions = roadSignsQuestions;
  } else {
    questions = rulesQuestions;
  }

  shuffleArray(questions);

  // RESET
  currentIndex = 0;
  score = 0;

  nextBtn.style.display = "none";

  loadQuestion();
}

// ================= LOAD QUESTION =================

function loadQuestion() {
  clearInterval(timer);
  startTimer();

  answered = false;
  nextBtn.style.display = "none";

  let currentQuestion = questions[currentIndex];

  progressEl.innerText = `Question ${currentIndex + 1} of ${questions.length}`;

  if (currentQuestion.image) {
    questionEl.innerHTML = `
      <img src="${currentQuestion.image}" width="150"><br>
      ${currentQuestion.question}
    `;
  } else {
    questionEl.innerText = currentQuestion.question;
  }

  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(option => {
    let button = document.createElement("button");
    button.innerText = option;

    button.onclick = () => {
      if (answered) return;

      answered = true;

      if (option === currentQuestion.answer) {
        button.style.background = "green";
        score++;
      } else {
        button.style.background = "red";
      }

      // show correct answer
      Array.from(optionsEl.children).forEach(btn => {
        if (btn.innerText === currentQuestion.answer) {
          btn.style.background = "green";
        }
      });

      nextBtn.style.display = "block";
    };

    optionsEl.appendChild(button);
  });
}

// ================= NEXT BUTTON =================

nextBtn.onclick = () => {
  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

// ================= TIMER =================

function startTimer() {
  timeLeft = 30;
  timerEl.innerText = "Time left: " + timeLeft + "s";

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = "Time left: " + timeLeft + "s";

    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

// ================= SCORE SCREEN =================

function showScore() {
  clearInterval(timer);

  document.getElementById("question").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("progress").style.display = "none";
  document.getElementById("timer").style.display = "none";

  let percentage = (score / questions.length) * 100;

  document.getElementById("score-screen").style.display = "block";

  document.getElementById("final-score").innerText =
    `Your Score: ${score}/${questions.length} (${percentage.toFixed(0)}%)`;

  document.getElementById("message").innerText =
    percentage >= 80 ? "🎉 Excellent! You Passed!" : "❌ Try Again!";

  restartBtn.style.display = "block";
}

// ================= RESTART =================

restartBtn.onclick = () => {
  location.reload();
};

// ================= SHUFFLE =================

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
