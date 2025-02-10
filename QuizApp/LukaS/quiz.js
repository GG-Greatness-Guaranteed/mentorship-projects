let category = null;
let difficulty = null;
let currentCategory = null;
let currentDifficulty = null;

let data = []; /* pitanja */
let i = 0; /* za iteraciju kroz pitanja */
let correct = 0; /* za broj tacnih odgovora */

document.getElementById("music").addEventListener("click", function () { selectButton(this, "category"); });
document.getElementById("history").addEventListener("click", function () { selectButton(this, "category"); });
document.getElementById("science").addEventListener("click", function () { selectButton(this, "category"); });
document.getElementById("geography").addEventListener("click", function () { selectButton(this, "category"); });

document.getElementById("easy").addEventListener("click", function () { selectButton(this, "difficulty"); });
document.getElementById("medium").addEventListener("click", function () { selectButton(this, "difficulty"); });
document.getElementById("hard").addEventListener("click", function () { selectButton(this, "difficulty"); });

function selectButton(button, type) {
    if (type === "category") {
        if (currentCategory != null) currentCategory.style.backgroundColor = "#475569";
        currentCategory = button;
        category = button.innerText;
    } else {
        if (currentDifficulty != null) currentDifficulty.style.backgroundColor = "#475569";
        currentDifficulty = button;
        difficulty = button.innerText.toLowerCase(); /* zato sto API koristi samo mala slova za imena difficultija */
    }
    
    button.style.backgroundColor = "#738296"; 
}

function createURL(categoryId, difficulty) {
    return "https://opentdb.com/api.php?amount=10&category=" + categoryId + "&difficulty=" + difficulty + "&type=multiple";
}

document.getElementById("start").addEventListener("click", async function () {

    if (category != null && difficulty != null) {

        let categoryId;
             if (category === "Music") { categoryId = 12; }
        else if (category === "History") { categoryId = 23; }
        else if (category === "Science") { categoryId = 17; }
        else if (category === "Geography") { categoryId = 22; }

        let quizURL = createURL(categoryId, difficulty);

        let response = await fetch(quizURL);
        let jsonData = await response.json();
        data = jsonData.results;

        i = 0;
        correct = 0;
        showQuestion();

    } else {
        alert("Please choose category and difficulty first");
    }

});

function showQuestion() {

    if (i >= data.length) {
        document.getElementById("frame").innerHTML =
            "<h3>Quiz over!</h3>" +
            "<p>You answered " + correct + "/10 questions correctly!</p>" +
            "<button id='playAgain' class='mainFrameButton'>Play again</button>";

        document.getElementById("playAgain").addEventListener("click", function () {
            location.reload(); // osvezava stranicu
        });

        return;
    }

    let question = data[i];
    let answers = question.incorrect_answers.concat(question.correct_answer);
    shuffle(answers);

    let frame = document.getElementById("frame");
    frame.innerHTML = "";

    let title = document.createElement("h3");
    title.innerHTML = category;
    title.id = "categoryTitle";
    frame.appendChild(title);

    let questionDiv = document.createElement("div");
    questionDiv.id = "question";
    questionDiv.innerHTML = question.question;
    frame.appendChild(questionDiv);

    let answersDiv = document.createElement("div");
    answersDiv.id = "answers";

    for (let answer of answers) {
        let answerButton = document.createElement("button");
        answerButton.className = "answer";
        answerButton.innerHTML = answer;

        answerButton.addEventListener("click", function () {
            if (answer === question.correct_answer) {
                answerButton.style.backgroundColor = "green";
                correct++;
            } else {
                answerButton.style.backgroundColor = "red";

                let allButtons = document.getElementsByClassName("answer");
                for (let btn of allButtons) {
                    if (btn.innerHTML === question.correct_answer) {
                        btn.style.backgroundColor = "green";
                    }
                }
            }

            setTimeout(function () {
                i++;
                showQuestion();
            }, 1000);
        });
        answersDiv.appendChild(answerButton);
    }

    frame.appendChild(answersDiv);
}

/* funkcija za shuffle */
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
