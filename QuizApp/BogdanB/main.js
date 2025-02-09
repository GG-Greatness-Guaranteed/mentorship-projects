var selectedCat = document.forma.category;
var selectedDiff = document.forma.difficulty;
var block1 = document.getElementById("block1")
var block2 = document.getElementById("block2")
block2.style.display = "none"
var btn = document.getElementById("start")
var btnNext = document.getElementById("next")
var error = document.getElementById("Error")
var limit = document.getElementById("limit")
var block2 = document.getElementById("block2");
var block3 = document.getElementById("block3");
var answer = document.forma.answer
var count = 0;
block3.style.display = "none";
parseInt(limit);
var errCount = 1;
var fetchQuizQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple&category='+selectedCat.value+'&difficulty='+selectedDiff.value, {
      method: "GET"
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      var data = await response.json();
      console.log(data.results);
      var questions = document.getElementById("question");
      var uxui = document.getElementById("queBlock")
      uxui.innerHTML = ''
      var correct  = document.getElementById("correct");
      var wrong = document.getElementsByClassName("wrong")
      var btnNext = document.getElementById("loadNext")
      var num = document.getElementById("number")
        num.innerHTML = `Question Number ${i}:`
        questions.innerText = data.results[0].question;
        uxui.innerHTML += '<div class="button"><input type="radio" name="answer" value="correct" /><label class="btn btn-default" id="correct" >'+data.results[0].correct_answer+'</label></div>'
        for(let j = 0; j < 3; j++){
        uxui.innerHTML += '<div class="button"><input type="radio" name="answer" value="wrong" /><label class="btn btn-default" id="wrong" >'+data.results[0].incorrect_answers[j]+'</label></div>'
        }
      if(i == limit.value){
        num.innerHTML = `Last Question`
      }
      if(i > limit.value){
        block2.style.display = "none";
        block3.style.display = "block";
        var result = document.getElementById("result");
        result.innerText = 'You have answered '+count+' out of '+limit.value+' questions correct.';
      }
      
    }
    catch (error) {
      i--
      console.error('Failed to fetch quiz questions:', error.message);
    }
  };


var i=0;
btn.addEventListener("click", function(){
    if(!(selectedCat.value && selectedDiff.value) || parseInt(limit.value) < 1 || parseInt(limit.value) > 10){
        error.style.display = "block";
        error.textContent = 'Error';
        errCount = 1;
    }
    else{
        error.style.display = "none";
        error.textContent = '';
        errCount = 0;
    }
    if(!errCount){
      i++
      fetchQuizQuestions()
      block1.style.display = "none";
      block2.style.display = "block";
    }
})

btnNext.addEventListener("click", function(){ 
  if(document.forma.answer.value == "correct"){
    count++
  }
    i++
    fetchQuizQuestions()
})