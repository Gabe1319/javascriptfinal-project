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

  searchButton.addEventListener("click", applyFilters);
filterSelect.addEventListener("change", applyFilters);

  renderQuestions(filteredQuestions);
}

async function trivia() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple"
  );
  const questionData = await response.json();
  allQuestions = questionData.results;

  renderQuestions(allQuestions);
}




const createQuestionCard = (question) => `<div class="card">
            <div class="question">${question.question}
          </div>
          <div class="options">
          <button class="trivia__btn">${question.correct_answer}</button>
  <button class="trivia__btn">${question.incorrect_answers[0]}</button>
  <button class="trivia__btn">${question.incorrect_answers[1]}</button>
  <button class="trivia__btn">${question.incorrect_answers[2]}</button>
</div></div>
`;

trivia();
