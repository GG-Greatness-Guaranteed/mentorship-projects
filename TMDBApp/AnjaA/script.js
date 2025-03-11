const apiKey = "ac6e43796f60e96b406be1904582e4db";
const moviesContainer = document.getElementById("movies-container");

const sortBtn = document.getElementById("sort-btn");
const sortMenu = document.getElementById("sort-menu");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");

const menuItems = document.querySelectorAll(".sidebar nav ul li");

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

const filterDateCheckBox = document.getElementById("filter-date");
const fromDateInput = document.getElementById("from-date");
const toDateInput = document.getElementById("to-date");

const filterGenreCheckBox = document.getElementById("filter-genre");
const genreButtons = document.querySelectorAll(".genre-buttons button");

const filterLanguageCheckBox = document.getElementById("filter-language");
const languageSelect = document.getElementById("language");

let selectedGenres = new Set();


sortBtn.addEventListener("click", ()=>{
    sortMenu.parentElement.classList.toggle("active");
    filterMenu.parentElement.classList.remove("active");
});

filterBtn.addEventListener("click", ()=>{
    filterMenu.parentElement.classList.toggle("active");
    sortMenu.parentElement.classList.remove("active");
});

const categories = {
    "Popular" : "popular",
    "Now playing" : "now_playing",
    "Upcoming" : "upcoming",
    "Top rated" : "top_rated"
};

let currentMovies = [];
let lastSortType = null; 

async function fetchMovies(category = "popular") {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        currentMovies = data.results; 
        applySorting(); 
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = ""; 

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const rating = movie.vote_average * 10;

        let ratingClass = "rating-red";
        if (rating >= 75) {
            ratingClass = "rating-green";
        } else if (rating >= 50) {
            ratingClass = "rating-yellow";
        }

        movieCard.innerHTML = `
            <div class="rating-circle ${ratingClass}">${rating.toFixed(0)}%</div>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p class="movie-release-date">${movie.release_date}</p>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

function handleCategoryClick(event) {
    const categoryName = event.target.innerText;
    const category = categories[categoryName];

    if(category){
        fetchMovies(category);
    }
}

menuItems.forEach((item) => {
    item.addEventListener("click", handleCategoryClick);
});

fetchMovies(); 

const sortButtons = document.querySelectorAll("#sort-menu button");

sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
        lastSortType = button.innerText;
        applySorting();
        sortMenu.parentElement.classList.remove("active");
    });
});

function applySorting() {
    if (lastSortType) {
        sortMovies(lastSortType);
    } else {
        displayMovies(currentMovies); 
    }
}

function sortMovies(sortType) {
    switch (sortType) {
        case "Popularity ascending": 
            currentMovies.sort((a, b) => a.popularity - b.popularity);
            break;
        case "Popularity descending":
            currentMovies.sort((a, b) => b.popularity - a.popularity);
            break;
        case "Rating ascending":
            currentMovies.sort((a, b) => a.vote_average - b.vote_average);
            break;
        case "Rating descending":
            currentMovies.sort((a, b) => b.vote_average - a.vote_average);
            break;
        case "Release date ascending":
            currentMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            break;
        case "Release date descending":
            currentMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            break;
    }
    displayMovies(currentMovies);
}

searchButton.addEventListener("click", () => {
    searchMovies();
});

searchBar.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        searchMovies();
    }
});

async function searchMovies() {
    const typed = searchBar.value.trim().toLowerCase();

    if (typed === "") {
        displayMovies(currentMovies); 
        return;
    }

    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(typed)}&page=1`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.results.length === 0) {
            moviesContainer.innerHTML = "<p>No results found.</p>"; 
            return;
        }

        displayMovies(data.results); 
    } catch (error) {
        moviesContainer.innerHTML = "<p>Failed to load search results.</p>";
    }
}

async function fetchGenres() {
    const genreContainer = document.querySelector(".genre-buttons");
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        genreContainer.innerHTML = ""; 

        data.genres.forEach((genre) => {
            const button = document.createElement("button");
            button.textContent = genre.name;
            button.dataset.genreId = genre.id;
            button.addEventListener("click", () => toggleGenreSelection(button));
            genreContainer.appendChild(button);
        });
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}

async function fetchLanguages() {
    const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        languageSelect.innerHTML = ""; 

        data.forEach((lang) => {
            if (lang.english_name) {
                const option = document.createElement("option");
                option.value = lang.iso_639_1;
                option.textContent = lang.english_name;
                languageSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error fetching languages:", error);
    }
}

function toggleGenreSelection(button) {
    const genreId = button.dataset.genreId;
    if (selectedGenres.has(genreId)) {
        selectedGenres.delete(genreId);
        button.classList.remove("selected");
    } else {
        selectedGenres.add(genreId);
        button.classList.add("selected");
    }
}

fetchGenres();
fetchLanguages();
