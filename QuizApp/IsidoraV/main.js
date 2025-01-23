const categories = [
    { id: 12, name: "Music" },
    { id: 23, name: "History" },
    { id: 17, name: "Science" },
    { id: 22, name: "Geography" },
  ];
  
  const difficulties = ["easy", "medium", "hard"];
  
  const categoryButtonsDiv = document.getElementById("category");
  const difficultyButtonsDiv = document.getElementById("difficultyList");
  const startButton = document.getElementById("start");
  
  let selectedCategory = null;
  let selectedDifficulty = null;
  
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
  
  createCategories();
  createDifficulties();

  let error = startButton.previousElementSibling;
  
  startButton.addEventListener("click", () => {
    if (!selectedCategory || !selectedDifficulty) {
      
      error.innerText="Please choose both options";
      error.classList.add("error");
      return;
    }else{
        error.innerText=" ";
        error.classList.remove("error");

        const fetchQuizQuestions = async () => {
        const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;

        try {
            const response = await fetch(url, {
            method: 'GET',
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const data = await response.json();   
          
          const questions = data.results;
            startQuiz(questions);
        } catch (error) {
          console.error('Failed to fetch quiz questions:', error.message); 
        }
      };
      
      fetchQuizQuestions();}  
  });

 var correctAnswers = 0;
function startQuiz(questions){

    const categoriesDiv = document.getElementById("categories");
    const difficultyDiv = document.getElementById("difficulty");

    let questionDiv = document.createElement("div");
    let answersDiv = document.createElement("div");
    let nextQuestion = document.createElement("button");
    questionDiv.id= "question";
    answersDiv.id="answers";
    nextQuestion.classList.add("nextQuestion");

    questionDiv.innerHTML="";
    answersDiv.innerHTML="";
    
    nextQuestion.innerHTML="Next Question";

    categoriesDiv.parentNode.replaceChild(questionDiv,categoriesDiv);
    difficultyDiv.parentNode.replaceChild(answersDiv,difficultyDiv);
    startButton.parentNode.replaceChild(nextQuestion,startButton);

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
            allButtons.forEach((btn) => (btn.disabled = true ));
            allButtons.forEach((btn) => (btn.classList.add("disabled") ));

            if (answer === currentQuestion.correct_answer) {
                button.classList.add("correct");
                correctAnswers++;
              } else {
                button.classList.add("wrong");
                allButtons.forEach((btn) => {
                    if (btn.innerHTML === currentQuestion.correct_answer) {
                      btn.classList.add("correct");
                    } });
                }
        });
        answersDiv.appendChild(button);
      });
    }

    showQuestion();

    nextQuestion.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            
            nextQuestion.disabled = true;
            nextQuestion.classList.add("disabled");
            questionDiv.innerHTML = `
                <h1>Quiz Completed!</h1>
                <p>You answered ${correctAnswers} out of ${questions.length} questions correctly.</p>
            `;
            answersDiv.innerHTML = "";
        }
    });

}
  

