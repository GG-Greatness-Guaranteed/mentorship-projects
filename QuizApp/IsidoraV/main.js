const categories = [
    { id: 12, name: "Music" },
    { id: 23, name: "History" },
    { id: 17, name: "Science" },
    { id: 22, name: "Geography" },
  ];
  
  const difficulties = ["easy", "medium", "hard"];
  

  //dohvatanje elemenata
  const categoryButtonsDiv = document.getElementById("category");
  const difficultyButtonsDiv = document.getElementById("difficultyList");
  const startButton = document.getElementById("start");
  
  let selectedCategory = null;
  let selectedDifficulty = null;

  //funkcije za ispisivanje kategorija i tezine
  
  function selectCategory(button) {
    document.querySelectorAll(".categoryBtn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.id;
  }
  
  function selectDifficulty(button) {
    document.querySelectorAll(".difficultyBtn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedDifficulty = button.dataset.difficulty;
  }
  
  function createCategories() {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const button = document.createElement("a");
      button.href = "#";
      button.className = "categoryBtn";
      button.dataset.id = category.id;
      button.textContent = category.name;
      button.addEventListener("click", function () {
        selectCategory(button);
      });
      categoryButtonsDiv.appendChild(button);
    }
  }
  
  function createDifficulties() {
    for (let i = 0; i < difficulties.length; i++) {
      const difficulty = difficulties[i];
      const button = document.createElement("a");
      button.href = "#";
      button.className = "difficultyBtn";
      button.dataset.difficulty = difficulty;
      button.textContent = difficulty;
      button.addEventListener("click", function () {
        selectDifficulty(button);
      });
      difficultyButtonsDiv.appendChild(button);
    }
  }
  
  if (categoryButtonsDiv) {
    createCategories();
}
if (difficultyButtonsDiv) {
  createDifficulties();
}

  //pokretanje kviza, fetchovanje pitanja sa API-ja
  if(startButton){
    var error = startButton.previousElementSibling;
  }
  
  
  if(startButton){
    startButton.addEventListener("click", () => {

      if (!selectedCategory || !selectedDifficulty) {
        //u koliko se ne odaberu i kategorija i tezina
        error.innerText="Please choose both options";
        error.classList.add("error");
        return;
      }else{
          startButton.href="questions.html"
          error.innerText=" ";
          error.classList.remove("error");

          sessionStorage.setItem("selectedCategory", selectedCategory);
    sessionStorage.setItem("selectedDifficulty", selectedDifficulty);

    // Prelazimo na pitanja
    window.location.href = "questions.html";
  
          }  
          
    });
  }

  const questionsDiv = document.querySelector("#containerQuestions");
  const loadingDiv = document.querySelector("#loading");

  if(questionsDiv){
    const fetchQuizQuestions = async () => {

      const selectedCategory = sessionStorage.getItem("selectedCategory");
      const selectedDifficulty = sessionStorage.getItem("selectedDifficulty");
      const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;


      loadingDiv.style.display = "block"; 
      try {
          const response = await fetch(url, {
          method: 'GET',
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();   
        
        const questions = data.results;

        console.log(questions);

        loadingDiv.style.display = "none";  
          startQuiz(questions);
      } catch (error) {
        console.error('Failed to fetch quiz questions:', error.message); 
      }
    };
    
    fetchQuizQuestions();
  }

 var correctAnswers = 0;
function startQuiz(questions){


    let questionDiv = document.createElement("div");
    let answersDiv = document.createElement("div");
    let nextQuestion = document.createElement("a");
    questionDiv.id= "question";
    answersDiv.id="answers";
    nextQuestion.classList.add("nextQuestion");

    questionDiv.innerHTML="";
    answersDiv.innerHTML="";
    
    nextQuestion.innerHTML="Next Question";

    questionsDiv.appendChild(questionDiv);  
    questionsDiv.appendChild(answersDiv);   
    questionsDiv.appendChild(nextQuestion); 

    let currentQuestionIndex = 0;

    function showQuestion(){
        const currentQuestion = questions[currentQuestionIndex];

    questionDiv.innerHTML = `<h1> ${currentQuestion.question} </h1>`;

    answersDiv.innerHTML = "";
    const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      answers.sort(() => Math.random() - 0.5);

      

      answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("answer");
        button.addEventListener("click", () => {
            const allButtons = answersDiv.querySelectorAll("button");

            if (answer === currentQuestion.correct_answer) {
                button.classList.add("correct");
                correctAnswers++;
              } else {
                button.classList.add("wrong");
                allButtons.forEach((btn) => {
                    console.log(btn.innerHTML);
                    
                    let correctAnswer = document.createElement("p");
                    
                    correctAnswer.innerHTML = currentQuestion.correct_answer;
                    console.log(correctAnswer.innerHTML);
                    if (btn.innerHTML === correctAnswer.innerHTML) {
                      btn.classList.add("correct");
                    } });
                }
                allButtons.forEach((btn) => (btn.disabled = true ));
                allButtons.forEach((btn) => (btn.classList.add("disabled") ));
        });
        answersDiv.appendChild(button);
      });
    }

    showQuestion();

    //dugme za prikazivanje sledeceg pitanja
    nextQuestion.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          showQuestion();
      } else {
          // prikazivanje rezultata
          questionDiv.innerHTML = `
              <h1>Quiz Completed!</h1>
              <p>You answered ${correctAnswers} out of ${questions.length} questions correctly.</p>
          `;
          answersDiv.innerHTML = "";
  
          // prepravljamo u dugme koje vodi na index.html
          nextQuestion.innerHTML = "Try Again";
  
          nextQuestion.addEventListener("click", () => {
              window.location.href = "index.html";
          });
      }
  });
  

}
  

