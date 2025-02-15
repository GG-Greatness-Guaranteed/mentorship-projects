// Kreiranje početnog dela kviza
document.getElementById("block2").classList.add("ForceDisplayNone")
document.getElementById("block3").classList.add("ForceDisplayNone")
var category = null
var difficulty = null
var selectedCategory = null
var selectedDifficulty = null
var catId = ["12","23","17","22"]
var catText = ["Music", "History", "Science", "Geography"]
var diff = ["easy", "medium", "hard"]

for(let i in catId){
  var element = document.createElement("div")
  element.classList.add("btnStyle")
  element.id = catId[i]
  element.innerText = catText[i]
  document.getElementById("categories").appendChild(element)

  document.getElementById(catId[i]).addEventListener("click", function() { selectedButton(this, "category"); })
}

for(let j in diff){
  var element = document.createElement("div")
  element.classList.add("btnStyle")
  element.id = diff[j]
  element.innerText = diff[j]
  element.style.textTransform = 'capitalize'
  document.getElementById("difficulty").appendChild(element)

  document.getElementById(diff[j]).addEventListener("click", function() { selectedButton(this, "difficulty"); })
}

// Checkbox dugmad
function selectedButton(btn, type) {
  if (type === "category") {
        if (selectedCategory != null) selectedCategory.style.backgroundColor = "#1E293B";
        selectedCategory = btn
        category = btn.id
  }
  else {
        if (selectedDifficulty != null) selectedDifficulty.style.backgroundColor = "#1E293B";
        selectedDifficulty = btn
        difficulty = btn.id
  }
    
    btn.style.backgroundColor = "#738296"; 
}


var data = []
var questionNum = 0
var correct = 0
var error = document.getElementById("Error")

// Mesanje niza pitanja
function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Pokretanje kviza
var begin = document.getElementById("start")
begin.addEventListener("click", async function(){
    if(category == null && difficulty == null){
      error.style.display = 'block'
    }
    else{
    document.getElementById("block1").style.display = "none";
    error.style.display = 'none'
    var response = await fetch("https://opentdb.com/api.php?amount=10&category="+category+"&difficulty="+difficulty+"&type=multiple")
    var dataResponse = await response.json();
    data = dataResponse.results;
    Question();
    document.getElementById("block2").classList.remove("ForceDisplayNone")
    }
})

var countr = 1
var restrict
var answers = []
var correctAns
var wrongAns = []
var nextQes = document.getElementById("next");

function Question(){
  restrict = 0;

  // id="questionNum"
  if(questionNum == parseInt(9)){
    document.getElementById("questionNum").innerText = `Last Question (10):`
    // Dugme na zadnji zadatak: Izmena teksta
    nextQes.innerText = `Finish`;
  }
  else{
  document.getElementById("questionNum").innerText = `Question Number ${countr++}:`
  }

  // id="question"
  document.getElementById("question").innerHTML = data[questionNum].question;

  // answers
  data[questionNum].incorrect_answers.push(data[questionNum].correct_answer);
  answers = data[questionNum].incorrect_answers
  shuffleArray(answers);

  var btnOptions = document.getElementsByClassName(`answerText`)
  for(let i in answers){
    btnOptions[i].style.backgroundColor = "#1E293B";
    btnOptions[i].innerHTML = answers[i];

    if(answers[i] == data[questionNum].correct_answer){
      correctAns = btnOptions[i]; // referenca na tacan odgovor
      btnOptions[i].addEventListener("click", function() { clickedAnswer(this, 'correct');})
    }
    else{
      wrongAns[i] = btnOptions[i];
      btnOptions[i].addEventListener("click", function() { clickedAnswer(this, 'wrong');})
    }
  }
}

function clickedAnswer(btn, id){
  while(restrict < 1){
    if(id === 'correct'){
      correct++;
      console.log(correct)
      btn.style.backgroundColor = "#169300";
    }
    else{
      btn.style.backgroundColor = "#9f0000";
      correctAns.style.backgroundColor = "#169300";
    }
    restrict++;
      questionNum += 1; 
    break;
  }
}

function Results(){
  document.getElementById("block2").classList.add("ForceDisplayNone")
  document.getElementById("block3").classList.remove("ForceDisplayNone")
  var end = document.getElementById("block3");

  var element1 = document.createElement("p");
  element1.innerText = `The End`;
  end.appendChild(element1)

  var element2 = document.createElement("p");
  element2.innerText = `You have answered ${correct} out of 10 questions correct.`;
  end.appendChild(element2)
  
  var element3 = document.createElement("p");
  if(correct < 7) element3.innerText = `You have failed the quiz.`
  else element3.innerText = `You have completed the quiz.`
  end.appendChild(element3)

  var element4 = document.createElement("div");
  element4.classList.add("btnStyle", "reset")
  element4.innerText = `Try Again`
  end.appendChild(element4)
  element4.addEventListener("click", function(){ window.location.reload(); })

}

nextQes.addEventListener("click", function(){
  if(restrict){
    if(questionNum > 9) Results();
    else {
      Question(); 
    }
  }
})




/* Pitanja
function Questions(){
  /*
  // id="questionNum"
  var element1 = document.createElement("p")
  element1.id = "questionNum"
  element1.innerText = `Question Number ${parseInt(questionNum) + 1}:`
  document.getElementById("block2").appendChild(element1)

  // id="question"
  var element2 = document.createElement("p")
  //element.classList.add("btnStyle")
  element2.id = "question"
  element2.innerText = data[questionNum].question
  document.getElementById("block2").appendChild(element2)

  // answers
  var questionAnswers = data[questionNum].incorrect_answers.push(data[questionNum].correct_answer);
  shuffleArray(questionAnswers);


  var element3 = document.createElement("div")
  element3.id = "answers"
  document.getElementById("block2").appendChild(element3)

  var theAnswers = document.createElement("div")
  theAnswers.id = "answers"
  document.getElementById("block2").appendChild(theAnswers)
  for(let i in data[questionNum].incorrect_answers){
    var theButton = document.createElement("div")
    theButton.classList.add("btnStyleAnswers");
    var answerText = document.createElement("p");
    answerText.classList.add("answerText");
    answerText.innerText = data[questionNum].incorrect_answers[i];
    theButton.appendChild(answerText);
    theAnswers.appendChild(theButton);
  }

  // Button for next question
  var NextBtn = document.createElement("div")
  NextBtn.classList.add("btnStyle");
  NextBtn.id = 'next'
  NextBtn.innerText = 'Next Question';
  document.getElementById("block2").appendChild(NextBtn);
}*/