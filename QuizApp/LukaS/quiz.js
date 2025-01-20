
let category=null;
let difficulty=null;

/* postavljanje kategorije na klik */
document.getElementById("music").addEventListener("click", function() { category = "Music"; });
document.getElementById("history").addEventListener("click", function() { category = "History"; });
document.getElementById("science").addEventListener("click", function() { category = "Science"; });
document.getElementById("geography").addEventListener("click", function() { category = "Geography"; });

/* postavljanje tezine */
document.getElementById("easy").addEventListener("click", function() { difficulty = "easy"; });
document.getElementById("medium").addEventListener("click", function() { difficulty = "medium"; });
document.getElementById("hard").addEventListener("click", function() { difficulty = "hard"; });

/* dugme start */
document.getElementById("start").addEventListener("click", function() {

    if(category!=null && difficulty!=null){

        document.getElementById("frame").innerHTML = ""; /* brisanje stvari u divu */

        let title = document.createElement("h3");
        title.innerHTML = category;
        title.id = "categoryTitle";

        let question = document.createElement("div");
        question.id = "question";

        let br = document.createElement("br");

        let answer1 = document.createElement("button");
        let answer2 = document.createElement("button");
        let answer3 = document.createElement("button");
        let answer4 = document.createElement("button");

        answer1.classList.add("answer");
        answer2.classList.add("answer");
        answer3.classList.add("answer");
        answer4.classList.add("answer");

        let answers = document.createElement("div");
        answers.id = "answers";
        answers.append(answer1, answer2, answer3, answer4);

        document.querySelector("#frame").append(title, br, question, br, answers);
     
    }
    else{
        alert("Please choose category and difficulty first")
    }

})