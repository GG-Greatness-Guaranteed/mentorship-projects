const apiKey = '100380da7921e6ab378de2bab017dabb';

fetchMovies("popular");

// FETCH ZA FILMOVE
async function fetchMovies(category) {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        showMovies(data.results);
        //updatePageUrl(category);
    } catch (error) {
        console.error('Error while fetching movies: ', error);
    }
}

// PRIKAZ FILMOVA
function showMovies(movies) {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Brišemo postojeće filmove

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('film');

        const date = new Date(movie.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }); 
          
        movieElement.innerHTML = 
        `
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="filminfo">
                <p class="title">${movie.title}</p>
                <p class="date">${date}</p>
            </div>
        `;
        grid.appendChild(movieElement);
    });
}

// DROPDOWN MENI ZA MOVIES
moviesDiv.addEventListener("click", function () {
    if (moviesDropdown.style.display === "block") {
        moviesDropdown.style.display = "none";
    } else {
        moviesDropdown.style.display = "block";
    }
});
document.addEventListener("click", function (event) {
    if (!moviesDiv.contains(event.target) && !moviesDropdown.contains(event.target)) {
        moviesDropdown.style.display = "none";
    }
});

// POZIVANJE FETCH NA OSNOVU KATEGORIJE
moviesDropdown.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        const category = event.target.id;
        fetchMovies(category);
    }
});

// UPDATOVANJE LINKA STRANICE - TODO
function updatePageUrl(category) {
    const newUrl = `${window.location.origin}/tmdb.app/${category}`;
    history.pushState(null, "", newUrl);
}

// SORT
