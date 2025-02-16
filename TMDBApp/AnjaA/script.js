const apiKey = "ac6e43796f60e96b406be1904582e4db";
const moviesContainer = document.getElementById("movies-container");

const sortBtn = document.getElementById("sort-btn");
const sortMenu = document.getElementById("sort-menu");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");

sortBtn.addEventListener("click", ()=>{
    sortMenu.parentElement.classList.toggle("active");
    filterMenu.parentElement.classList.remove("active");
});

filterBtn.addEventListener("click", ()=>{
    filterMenu.parentElement.classList.toggle("active");
    sortMenu.parentElement.classList.remove("active");
})

async function fetchMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
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
        if (rating>=75) {
            ratingClass = "rating-green";
        } else if (rating>=50) {
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

fetchMovies();