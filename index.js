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

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredQuestions = allQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm) ||
      q.category.toLowerCase().includes(searchTerm),
  );
  renderQuestions(filteredQuestions);
});

async function trivia() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple"
  );
  const questionData = await response.json();
  allQuestions = questionData.results;

  renderQuestions(allQuestions);
}

filterSelect.addEventListener("change", (e) => {
  const selectedDifficulty = e.target.value.toLowerCase();

  if (selectedDifficulty === "all") {
    renderQuestions(allQuestions);
    return;
  }

  const filtered = allQuestions.filter(
    (q) => q.difficulty.toLowerCase() === selectedDifficulty
  );

  renderQuestions(filtered);
});

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
