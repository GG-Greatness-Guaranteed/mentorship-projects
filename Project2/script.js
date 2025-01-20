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
    checkSelection();
})

geoButton.addEventListener("click", () => {
    category = "Geography";
    checkSelection();
})

historyButton.addEventListener("click", () => {
    category = "History";
    checkSelection();
})

scienceButton.addEventListener("click", () => {
    category = "Science";
    checkSelection();
})

easyButton.addEventListener("click", () => {
    difficulty = "Easy";
    checkSelection();
})

mediumButton.addEventListener("click", () => {
    difficulty = "Medium";
    checkSelection();
})

hardButton.addEventListener("click", () => {
    difficulty = "Hard";
    checkSelection();
})

function checkSelection() {
    if (category && difficulty) {
        startButton.disabled = false; 
    }
}

startButton.addEventListener("click", () => {
    if (category && difficulty) {
        document.querySelector(".kontejner").classList.add("hidden"); 
        prikaziScreenSaPitanjima(); // Prikaži novi ekran
    }
});

function prikaziScreenSaPitanjima() {
    const body = document.querySelector(".glavna-klasa");

    const questionScreen = document.createElement("div");
    questionScreen.classList.add("screen");

    questionScreen.innerHTML = `
        <div class="question-container">
            <h2 class="izabrana-kategorija">${category}</h2>

        <div class="pitanje">
            <p>What is the capital of France?</p>
        </div>
        <div class="ponudjeni-odgovori">
            <button>Paris</button>
            <button>Barcelona</button>
            <button>Belgrade</button>
            <button>Istanbul</button>
        </div>
    `;

    body.appendChild(questionScreen);
}