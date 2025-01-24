let category = null;
let difficulty = null;
let i = 0;
let correct = 0;
let data = [];

document.getElementById("music").addEventListener("click", function () { category = "Music"; });
document.getElementById("history").addEventListener("click", function () { category = "History"; });
document.getElementById("science").addEventListener("click", function () { category = "Science"; });
document.getElementById("geography").addEventListener("click", function () { category = "Geography"; });

document.getElementById("easy").addEventListener("click", function () { difficulty = "easy"; });
document.getElementById("medium").addEventListener("click", function () { difficulty = "medium"; });
document.getElementById("hard").addEventListener("click", function () { difficulty = "hard"; });

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
            "<h3>Quiz Completed!</h3>" +
            "<p>You answered " + correct + "/10 questions correctly.</p>";
        return;
    }

    let question = data[i];
    let answers = question.incorrect_answers.concat(question.correct_answer);

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
            }, 500);
        });
        answersDiv.appendChild(answerButton);
    }

    frame.appendChild(answersDiv);
}