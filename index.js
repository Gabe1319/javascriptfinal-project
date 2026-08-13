// https://opentdb.com/api.php?amount=50&type=multiple

async function trivia() {
  const question = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
  );
  const questionData = await question.json();
  const questionListEl= document.querySelector("options")
  console.log(questionData.map);
  questionData
    .map(
      (question) => `<div class="card">
            <div class="question">${question}
          </div>
          <div class="options">
          <button class="trivia__btn">${answer}</button>
  <button class="trivia__btn">${answer}</button>
  <button class="trivia__btn">${answer}</button>
  <button class="trivia__btn">${answer}</button>
</div>`,
    )
    .join("");
}

trivia();
