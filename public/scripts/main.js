import {
  QUESTION_BANK,
  QUESTIONS_PER_SESSION,
  DIFFICULTY_META
} from "./question-bank.js";

const dom = {
  welcome: document.getElementById("welcome-screen"),
  quiz: document.getElementById("quiz-screen"),
  results: document.getElementById("results-screen"),
  startButton: document.getElementById("start-btn"),
  nextButton: document.getElementById("next-btn"),
  replaceButton: document.getElementById("replace-btn"),
  skipButton: document.getElementById("skip-btn"),
  restartButton: document.getElementById("restart-btn"),
  questionText: document.getElementById("question-text"),
  optionsContainer: document.getElementById("options-container"),
  difficultyBadge: document.getElementById("difficulty-badge"),
  progressText: document.getElementById("progress-text"),
  progressFill: document.getElementById("progress-bar-fill"),
  correctCount: document.getElementById("correct-count"),
  streakCount: document.getElementById("streak-count"),
  bestStreakCount: document.getElementById("best-streak-count"),
  feedbackMessage: document.getElementById("feedback-message"),
  feedbackExplanation: document.getElementById("feedback-explanation"),
  summaryStatement: document.getElementById("summary-statement"),
  summaryTotal: document.getElementById("summary-total"),
  summaryCorrect: document.getElementById("summary-correct"),
  summarySkipped: document.getElementById("summary-skipped"),
  summaryReplaced: document.getElementById("summary-replaced"),
  summaryBestStreak: document.getElementById("summary-best-streak")
};

const state = {
  questions: [],
  extraQuestions: [],
  currentIndex: 0,
  hasAnswered: false,
  wasSkipped: false,
  totalAnswered: 0,
  correctAnswers: 0,
  streak: 0,
  bestStreak: 0,
  skippedCount: 0,
  replacedCount: 0,
  history: []
};

function initialize() {
  dom.startButton.addEventListener("click", startQuiz);
  dom.nextButton.addEventListener("click", handleNext);
  dom.skipButton.addEventListener("click", handleSkip);
  dom.replaceButton.addEventListener("click", handleReplace);
  dom.restartButton.addEventListener("click", restart);
  updateReplaceAvailability();
}

function startQuiz() {
  const { session, extras } = createQuestionSets();

  state.questions = session;
  state.extraQuestions = extras;
  state.currentIndex = 0;
  state.hasAnswered = false;
  state.wasSkipped = false;
  state.totalAnswered = 0;
  state.correctAnswers = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.skippedCount = 0;
  state.replacedCount = 0;
  state.history = [];

  show(dom.quiz);
  hide(dom.welcome);
  hide(dom.results);

  renderQuestion();
  updateScoreboard();
  updateProgressBar();
}

function restart() {
  show(dom.welcome);
  hide(dom.quiz);
  hide(dom.results);
}

function createQuestionSets() {
  const shuffled = shuffle([...QUESTION_BANK]);
  const sessionSize = Math.min(QUESTIONS_PER_SESSION, shuffled.length);
  const session = shuffled.slice(0, sessionSize);
  const extrasPool = QUESTION_BANK.filter(
    (question) => !session.some((item) => item.id === question.id)
  );
  const extras = shuffle([...extrasPool]);
  return { session, extras };
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  if (!question) {
    showResults();
    return;
  }

  state.hasAnswered = false;
  state.wasSkipped = false;

  dom.questionText.textContent = question.text;
  renderDifficulty(question);
  renderOptions(question);
  clearFeedback();
  updateProgressDescription();
  updateReplaceAvailability();
  setActionButtons({
    nextDisabled: true,
    replaceDisabled: !state.extraQuestions.length,
    skipDisabled: false
  });
}

function renderOptions(question) {
  dom.optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => handleAnswer(option, index));
    dom.optionsContainer.appendChild(button);
  });
}

function renderDifficulty(question) {
  const meta = DIFFICULTY_META[question.difficulty] || {
    label: "משולב",
    className: ""
  };

  dom.difficultyBadge.textContent = `רמת ${meta.label}`;
  dom.difficultyBadge.className = `difficulty-badge ${meta.className || ""}`;
}

function handleAnswer(option, index) {
  if (state.hasAnswered || state.wasSkipped) {
    return;
  }

  state.hasAnswered = true;

  const question = state.questions[state.currentIndex];
  const buttons = dom.optionsContainer.querySelectorAll("button");

  buttons.forEach((button, idx) => {
    const isCorrect = question.options[idx].isCorrect;
    button.disabled = true;
    if (isCorrect) {
      button.classList.add("correct");
    }
    if (idx === index && !isCorrect) {
      button.classList.add("incorrect");
    }
  });

  const isCorrect = Boolean(option.isCorrect);
  if (isCorrect) {
    state.correctAnswers += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    setFeedback("כל הכבוד! התשובה נכונה.", question.explanation);
  } else {
    state.streak = 0;
    setFeedback("לא בדיוק. קראו את ההסבר למטה.", question.explanation);
  }

  state.totalAnswered += 1;
  state.history.push({
    questionId: question.id,
    result: isCorrect ? "correct" : "incorrect"
  });

  updateScoreboard();
  updateProgressBar(true);

  setActionButtons({
    nextDisabled: false,
    replaceDisabled: true,
    skipDisabled: true
  });
}

function handleNext() {
  if (!state.hasAnswered && !state.wasSkipped) {
    return;
  }
  moveToNextQuestion();
}

function handleSkip() {
  if (state.hasAnswered) {
    return;
  }

  state.wasSkipped = true;
  state.streak = 0;
  state.skippedCount += 1;
  const question = state.questions[state.currentIndex];
  state.history.push({
    questionId: question.id,
    result: "skipped"
  });

  setFeedback("השאלה דולגה. לחצו על 'הבא' כדי להמשיך.");
  updateScoreboard();
  updateProgressBar(true);
  setActionButtons({
    nextDisabled: false,
    replaceDisabled: true,
    skipDisabled: true
  });
}

function handleReplace() {
  if (state.hasAnswered || state.wasSkipped) {
    return;
  }

  if (!state.extraQuestions.length) {
    setFeedback("לא נותרו שאלות חלופיות בבנק.");
    updateReplaceAvailability();
    return;
  }

  const newQuestion = state.extraQuestions.shift();
  const currentQuestion = state.questions[state.currentIndex];
  state.extraQuestions.push(currentQuestion);
  state.questions[state.currentIndex] = newQuestion;
  state.replacedCount += 1;

  renderQuestion();
  setFeedback("השאלה הוחלפה באתגר חדש!");
}

function moveToNextQuestion() {
  state.currentIndex += 1;
  if (state.currentIndex >= state.questions.length) {
    showResults();
    return;
  }
  renderQuestion();
}

function showResults() {
  hide(dom.quiz);
  show(dom.results);

  const totalQuestions = state.questions.length;
  const accuracy = totalQuestions
    ? Math.round((state.correctAnswers / totalQuestions) * 100)
    : 0;

  dom.summaryStatement.textContent =
    totalQuestions === 0
      ? "לא היו שאלות זמינות להפעלה הזו."
      : `עניתם נכון על ${accuracy}% מהשאלות.`;

  dom.summaryTotal.textContent = totalQuestions;
  dom.summaryCorrect.textContent = state.correctAnswers;
  dom.summarySkipped.textContent = state.skippedCount;
  dom.summaryReplaced.textContent = state.replacedCount;
  dom.summaryBestStreak.textContent = state.bestStreak;
}

function updateScoreboard() {
  dom.correctCount.textContent = state.correctAnswers;
  dom.streakCount.textContent = state.streak;
  dom.bestStreakCount.textContent = state.bestStreak;
}

function updateProgressBar(includeCurrent = false) {
  const total = state.questions.length || 1;
  const completed = includeCurrent
    ? Math.min(state.currentIndex + 1, total)
    : Math.min(state.currentIndex, total);
  const percentage = Math.round((completed / total) * 100);
  dom.progressFill.style.width = `${percentage}%`;
}

function updateProgressDescription() {
  dom.progressText.textContent = `שאלה ${state.currentIndex + 1} מתוך ${
    state.questions.length
  }`;
}

function setActionButtons(disabledStates) {
  dom.nextButton.disabled = disabledStates.nextDisabled;
  dom.replaceButton.disabled = disabledStates.replaceDisabled;
  dom.skipButton.disabled = disabledStates.skipDisabled;
}

function updateReplaceAvailability() {
  dom.replaceButton.disabled = state.extraQuestions.length === 0;
}

function setFeedback(message = "", explanation = "") {
  dom.feedbackMessage.textContent = message;
  dom.feedbackExplanation.textContent = explanation || "";
}

function clearFeedback() {
  setFeedback("", "");
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

initialize();
