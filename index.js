// https://opentdb.com/api.php?amount=50&type=multiple

const questionListEl = document.querySelector(".question-list");

async function trivia(allQuestions = questionsData.results) {
  const question = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
  );
  const questionData = await question.json();
  console.log(questionData.results);
  const questions = questionData.results.map(createQuestionCard).join("");
  questionListEl.innerHTML = questions;
}
let allQuestions = []
trivia(allQuestions = questionsData.results);

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
