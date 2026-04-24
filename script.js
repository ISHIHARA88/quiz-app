const questions = [
  {
    text: "太陽系で最も大きな惑星はどれですか？",
    choices: ["土星", "木星", "天王星", "海王星"],
    correct: 1,
    explanation: "木星は太陽系最大の惑星で、直径は地球の約11倍です。"
  },
  {
    text: "日本の国鳥として定められている鳥はどれですか？",
    choices: ["ツル", "ウグイス", "キジ", "トキ"],
    correct: 2,
    explanation: "キジ（雉）は日本の国鳥です。雄の美しい羽が日本を象徴するとして選ばれました。"
  },
  {
    text: "世界で最も多くの国と国境を接している国はどこですか？",
    choices: ["ロシア", "ブラジル", "中国", "ドイツ"],
    correct: 0,
    explanation: "ロシアは14か国と陸続きの国境を接しており、世界最多です。"
  },
  {
    text: "人体の血液型を決めるのはどこにある抗原ですか？",
    choices: ["白血球", "血小板", "赤血球", "血漿"],
    correct: 2,
    explanation: "ABO式・Rh式血液型は、赤血球の表面にある抗原によって決まります。"
  },
  {
    text: "2024年のパリオリンピックで日本が獲得した金メダルの数はいくつですか？",
    choices: ["15個", "17個", "20個", "12個"],
    correct: 2,
    explanation: "日本は2024年パリオリンピックで金メダルを20個獲得し、史上最多タイとなりました。"
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const questionCount = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const scoreText = document.getElementById("score-text");
const scoreComment = document.getElementById("score-comment");
const resultIcon = document.getElementById("result-icon");
const retryBtn = document.getElementById("retry-btn");

function loadQuestion() {
  answered = false;
  feedbackEl.className = "hidden";
  nextBtn.classList.add("hidden");

  const q = questions[currentIndex];
  const total = questions.length;

  questionCount.textContent = `問題 ${currentIndex + 1} / ${total}`;
  progressBar.style.width = `${(currentIndex / total) * 100}%`;

  questionText.textContent = q.text;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(i));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add("reveal");
    }
  });

  if (selectedIndex === q.correct) {
    buttons[selectedIndex].classList.add("correct");
    score++;
    feedbackEl.textContent = "正解！　" + q.explanation;
    feedbackEl.className = "correct";
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    feedbackEl.textContent = "不正解…　" + q.explanation;
    feedbackEl.className = "incorrect";
  }

  nextBtn.textContent = currentIndex < questions.length - 1 ? "次の問題へ" : "結果を見る";
  nextBtn.classList.remove("hidden");
}

function showResult() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  progressBar.style.width = "100%";
  questionCount.textContent = `全 ${questions.length} 問 完了`;

  scoreText.textContent = `${questions.length}問中 ${score}問 正解`;

  const ratio = score / questions.length;
  if (ratio === 1) {
    resultIcon.textContent = "🏆";
    scoreComment.textContent = "パーフェクト！素晴らしい知識です！";
  } else if (ratio >= 0.8) {
    resultIcon.textContent = "😄";
    scoreComment.textContent = "よくできました！惜しいところも振り返ってみましょう。";
  } else if (ratio >= 0.6) {
    resultIcon.textContent = "🙂";
    scoreComment.textContent = "なかなかの成績です。もう一回挑戦してみては？";
  } else {
    resultIcon.textContent = "😅";
    scoreComment.textContent = "もう少し勉強が必要かも。再挑戦してみましょう！";
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  loadQuestion();
});

loadQuestion();
