// https://opentdb.com/api.php?amount=50&type=multiple

async function trivia() {
  const question = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
  );
  const questionData = await question.json();
  const questionListEl = document.querySelector("options");
  console.log(questionData.results);
  const questions = questionData.results
    .map(
      (question) => `<div class="card">
            <div class="question">${question.question}
          </div>
          <div class="options">
          <button class="trivia__btn">${question.correct_answer}</button>
  <button class="trivia__btn">${question.incorrect_answers[0]}</button>
  <button class="trivia__btn">${question.incorrect_answers[1]}</button>
  <button class="trivia__btn">${question.incorrect_answers[2]}</button>
</div>`,
    )
    .join("");
  questionListEl.innerHTML = questions;
}

trivia();
