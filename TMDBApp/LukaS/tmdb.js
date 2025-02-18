
/* DROPDOWN MENI ZA MOVIES */
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

/* SORT */
