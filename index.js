// https://opentdb.com/api.php?amount=50&type=multiple

async function trivia() {
  const question = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple",
  );
 const questionData = await question.json();
 console.log(questionData )
}

trivia();
