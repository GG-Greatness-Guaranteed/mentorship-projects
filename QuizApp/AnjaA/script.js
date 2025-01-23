let category = null;
let difficulty = null;

const musicButton = document.getElementById("music");
const geoButton = document.getElementById("geography");
const historyButton = document.getElementById("history");
const scienceButton = document.getElementById("science");

const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");

const startButton = document.getElementById("start");

startButton.disabled = true;

musicButton.addEventListener("click", () => {
    category = "Music";
    highlightSelectedButton([musicButton, geoButton, historyButton, scienceButton], musicButton);
    checkSelection();
})

geoButton.addEventListener("click", () => {
    category = "Geography";
    highlightSelectedButton([musicButton, geoButton, historyButton, scienceButton], geoButton);
    checkSelection();
})

historyButton.addEventListener("click", () => {
    category = "History";
    highlightSelectedButton([musicButton, geoButton, historyButton, scienceButton], historyButton);
    checkSelection();
})

scienceButton.addEventListener("click", () => {
    category = "Science";
    highlightSelectedButton([musicButton, geoButton, historyButton, scienceButton], scienceButton);
    checkSelection();
})

easyButton.addEventListener("click", () => {
    difficulty = "Easy";
    highlightSelectedButton([easyButton, mediumButton, hardButton], easyButton);
    checkSelection();
})

mediumButton.addEventListener("click", () => {
    difficulty = "Medium";
    highlightSelectedButton([easyButton, mediumButton, hardButton], mediumButton);
    checkSelection();
})

hardButton.addEventListener("click", () => {
    difficulty = "Hard";
    highlightSelectedButton([easyButton, mediumButton, hardButton], hardButton);
    checkSelection();
})

function checkSelection() {
    if (category && difficulty) {
        startButton.disabled = false; 
    }
}

/// moram pogledat async i await 
startButton.addEventListener("click", async () => { 
    if (category && difficulty) {
        document.querySelector(".kontejner").classList.add("hidden"); 

        const kategorijaId = getCategoryId(category);
        const questions = await fetchQuizQuestions(kategorijaId, difficulty); 

        prikaziScreenSaPitanjima(questions);
    }
});

function highlightSelectedButton(allButtons, selectedButton) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    selectedButton.classList.add('active');
}

var brojTacnihOdgovora = 0;

function prikaziScreenSaPitanjima(questions) {
    const body = document.querySelector(".glavna-klasa");

    const questionScreen = document.createElement("div");
    questionScreen.classList.add("screen");

    const kontejner = document.createElement("div");
    kontejner.classList.add("kontejner");

    const h2 = document.createElement("h2");
    h2.classList.add("izabrana-kategorija");
    h2.textContent = category;
    kontejner.appendChild(h2);

    const pitanjeDiv = document.createElement("div");
    pitanjeDiv.classList.add("pitanje");
    const tekstPitanja = document.createElement("p");
    pitanjeDiv.appendChild(tekstPitanja);
    kontejner.appendChild(pitanjeDiv);

    const odgovorDiv = document.createElement("div");
    odgovorDiv.classList.add("ponudjeni-odgovori");
    kontejner.appendChild(odgovorDiv);

    questionScreen.appendChild(kontejner);
    body.appendChild(questionScreen);

    let currentQuestionIndex = 0;

    function prikaziPitanje() {
        const pitanje = questions[currentQuestionIndex];
        tekstPitanja.textContent = pitanje.question; 
    
        odgovorDiv.innerHTML = ''; 
        const allAnswers = [...pitanje.incorrect_answers, pitanje.correct_answer];
        allAnswers.sort(() => Math.random() - 0.5); 
    
        allAnswers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", () => {
                Array.from(odgovorDiv.children).forEach(btn => btn.disabled = true);
    
                if (answer === pitanje.correct_answer) {
                    button.style.backgroundColor = "green";
                    brojTacnihOdgovora++;
                } else {
                    button.style.backgroundColor = "red";
    
                    Array.from(odgovorDiv.children).forEach(btn => {
                        if (btn.textContent === pitanje.correct_answer) {
                            btn.style.backgroundColor = "green";
                        }
                    });
                }
    
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        prikaziPitanje(); 
                    } else {
                        prikaziZavrsniScreen(); 
                    }
                }, 1500); 
            });
            odgovorDiv.appendChild(button);
        });
    }

    prikaziPitanje();
}

function getCategoryId(categoryString) {
    switch (categoryString) {
        case 'Music' : return 12;
        case 'History' : return 23;
        case 'Science' : return 17;
        case 'Geography' : return 22;
    }
}

function createQuizURL(categoryId, difficulty){
    return `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`;
}

async function fetchQuizQuestions(categoryId, difficulty){
    const url = createQuizURL(categoryId,difficulty);
  
  // Uvek "await" pisemo u try{}catch(){} (Moze se dodati i finally{})
  // jer je neizvesno da li ce se desiti greska u procesu slanja i preuzimanja podataka
    try {
        const response = await fetch(url, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json(); // Da bi isparsirali json format u objekat, obzirom da podatke 
                                          // uvek dobijamo i saljemo u JSON formatu
      return data.results || [];       // Ispis da li su dobri podaci primljeni
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error.message); // Ukoliko dodje do greske
      return [];
    }
  }
  
  fetchQuizQuestions();

  function prikaziZavrsniScreen(){
    const body = document.querySelector(".glavna-klasa");
    body.innerHTML = ' ';

    const zavrsniScreen = document.createElement("div");
    zavrsniScreen.classList.add("screen", "zavrsni-screen");

    const h2 = document.createElement("h2");
    h2.textContent = "End of the quiz!";
    zavrsniScreen.appendChild(h2);

    const resultTekst = document.createElement("p");
    resultTekst.textContent = `Number of correct answers: ${brojTacnihOdgovora} out of 10`; 
    zavrsniScreen.appendChild(resultTekst);

    const restart = document.createElement("button");
    restart.textContent = "Retake";
    restart.addEventListener("click", ()=>{
        location.reload();
    })
    zavrsniScreen.appendChild(restart);
    body.appendChild(zavrsniScreen);
  }