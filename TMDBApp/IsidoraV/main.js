const dropBtn = document.querySelector(".dropbtn");

dropBtn.addEventListener("click", ()=>{
    document.getElementById("myDropdown").classList.toggle("show");
})

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  const apiKey = "cd2a186452df94e8f442b9c47d0db684"; 
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const moviesContainer = document.getElementById("movies");
  const dropdown = document.getElementById("myDropdown");
  
  const categories = {
    popular: { endpoint: "popular", displayName: "Popular" },
    now_playing: { endpoint: "now_playing", displayName: "Now Playing" },
    upcoming: { endpoint: "upcoming", displayName: "Upcoming" },
    top_rated: { endpoint: "top_rated", displayName: "Top Rated" }
};
  
const fetchMovies = async (category) => {
  const url = `${baseUrl}${category}?api_key=${apiKey}`;
  try {
      console.log(`Fetching movies from: ${url}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data.results; 
  } catch (error) {
      console.error(`Failed to fetch ${category} movies:`, error.message);
      return [];
  }
};

const displayMovies = async (category) => {
  console.log(`Displaying movies for category: ${category}`);
  moviesContainer.innerHTML = "<h2>Loading...</h2>";

  const movies = await fetchMovies(category);

  if (movies.length === 0) {
      moviesContainer.innerHTML = "<p>No movies found.</p>";
      return;
  }

  moviesContainer.innerHTML = movies
      .map(movie => `
          <div class="movie">
              <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
              <div class="movie-text"><h3>${movie.title}</h3>
              <p>${movie.release_date}</p></div>
          </div>
      `)
      .join("");
};


for (let categoryKey in categories) {
  const category = categories[categoryKey]; 
  const movieLink = document.createElement("a");
  movieLink.href = "#";
  movieLink.textContent = category.displayName;
  movieLink.dataset.category = category.endpoint;

  movieLink.addEventListener("click", (event) => {
      event.preventDefault(); 
      displayMovies(category.endpoint);
  });

  dropdown.appendChild(movieLink);
}





