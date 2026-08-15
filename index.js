// https://opentdb.com/api.php?amount=50&type=multiple

const questionListEl = document.querySelector(".question-list");
const searchInput = document.querySelector(".header__email--input");
const searchButton = document.querySelector(".header__email--btn");
const filterSelect = document.querySelector("#filter");
let allQuestions = [];

function renderQuestions(questions) {
  const html = questions.map(createQuestionCard).join("");
  questionListEl.innerHTML = html;
}

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const difficulty = filterSelect.value.toLowerCase();

  const filteredQuestions = allQuestions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm) ||
      question.category.toLowerCase().includes(searchTerm);

    const matchesDifficulty =
      !difficulty ||
      difficulty === "all" ||
      question.difficulty.toLowerCase() === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  renderQuestions(filteredQuestions);
}

searchButton.addEventListener("click", applyFilters);
filterSelect.addEventListener("change", applyFilters);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

async function trivia() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
  );
  const questionData = await response.json();
  allQuestions = questionData.results;

  renderQuestions(allQuestions);
}

const createQuestionCard = (question) => {
  const answers = [
    question.correct_answer,

    question.incorrect_answers[0],

    question.incorrect_answers[1],

    question.incorrect_answers[2],
  ];

  const shuffledAnswers = shuffle(answers);

  return `

    <div class="card">

      <div class="question">${question.question}</div>

      <div class="options">

        <button class="trivia__btn ${
          shuffledAnswers[0] === question.correct_answer ? "correct" : ""}
        ">${shuffledAnswers[0]}</button>

        <button class="trivia__btn ${
          shuffledAnswers[1] === question.correct_answer ? "correct" : ""}
        ">${shuffledAnswers[1]}</button>

        <button class="trivia__btn ${
          shuffledAnswers[2] === question.correct_answer ? "correct" : ""}
        ">${shuffledAnswers[2]}</button>

        <button class="trivia__btn ${
          shuffledAnswers[3] === question.correct_answer ? "correct" : ""}
        ">${shuffledAnswers[3]}</button>

      </div>

    </div>

  `;
};

const quizContainer = document.querySelector(".container");

quizContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".trivia__btn");

  if (!button) return;

  const card = button.closest(".card");

  if (!card || card.dataset.answered === "true") return;

  const buttons = card.querySelectorAll(".trivia__btn");
  const correctButton = card.querySelector(".trivia__btn.correct");

  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  if (button.classList.contains("correct")) {
    button.textContent = button.textContent + ", Correct! 🎉";
  } else {
    button.textContent = button.textContent + ", Wrong ❌";

    if (correctButton) {
      correctButton.textContent = correctButton.textContent + ", Correct! 🎉";
    }
  }

  card.dataset.answered = "true";
});

//
//   return `<div class="card">
//             <div class="question">${question.question}
//           </div>
//           <div class="options">
//           <button class="trivia__btn">${question.correct_answer}</button>
//   <button class="trivia__btn">${question.incorrect_answers[0]}</button>
//   <button class="trivia__btn">${question.incorrect_answers[1]}</button>
//   <button class="trivia__btn">${question.incorrect_answers[2]}</button>
// </div></div>
// `;
// };

trivia();
