// https://opentdb.com/api.php?amount=50&type=multiple

const questionListEl = document.querySelector(".question-list");

let allQuestions = [];

const searchInput = document.querySelector(".header__email--input");
const searchButton = document.querySelector(".header__email--btn");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  allQuestions.filter((q) => q.question.toLowerCase().includes(searchTerm));
});

async function trivia() {
  const question = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
  );
  const questionData = await question.json();
  allQuestions = questionData.results;

  const questions = questionData.results.map(createQuestionCard).join("");
  questionListEl.innerHTML = questions;
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
