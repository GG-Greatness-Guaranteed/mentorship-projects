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