const apiKey = "ac6e43796f60e96b406be1904582e4db";
const moviesContainer = document.getElementById("movies-container");

const sortBtn = document.getElementById("sort-btn");
const sortMenu = document.getElementById("sort-menu");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");

const menuItems = document.querySelectorAll(".sidebar nav ul li");

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