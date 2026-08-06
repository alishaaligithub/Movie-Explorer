// ==========================================
// MOVIE EXPLORER - PART 3
// ==========================================

// ==========================================
// IMAGE CAROUSEL
// ==========================================

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

// Next Slide
function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Previous Slide
function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

// Button Events
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", previousSlide);

// Auto Slide
setInterval(nextSlide, 3000);

// ==========================================
// SEARCH BUTTON
// ==========================================

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

    const movieName = searchInput.value.trim();

    if (movieName === "") {

        alert("Please enter a movie name.");

        return;
    }

    alert("Searching for: " + movieName);

});

// Press Enter
searchInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});

// ==========================================
// RANDOM JOKE API
// ==========================================

const jokeBtn = document.getElementById("jokeBtn");
const jokeText = document.getElementById("jokeText");

jokeBtn.addEventListener("click", getJoke);

async function getJoke() {

    jokeText.innerHTML = "Loading Joke... 😂";

    try {

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        const data = await response.json();

        jokeText.innerHTML =
            `<strong>${data.setup}</strong><br><br>${data.punchline}`;

    }

    catch (error) {

        jokeText.innerHTML =
            "Unable to fetch joke. Please try again.";

    }

}

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name = contactForm.querySelector("input[type='text']").value.trim();
    const email = contactForm.querySelector("input[type='email']").value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if(name === "" || email === "" || message === ""){
        alert("Please fill in all fields.");
        return;
    }

    alert("Thank you! Your message has been submitted successfully.");

    contactForm.reset();

});

// ==========================================
// PAGE LOADED
// ==========================================

window.addEventListener("load", () => {

    console.log("Movie Explorer Loaded Successfully!");

});

const themeBtn = document.getElementById("themeToggle");

// Restore saved theme
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-theme");
    themeBtn.textContent = "🌞";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){
        themeBtn.textContent = "🌞";
        localStorage.setItem("theme","light");
    }else{
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme","dark");
    }

});

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.display = "none";

});

document.querySelectorAll(".fav-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.classList.toggle("active");

        if(btn.classList.contains("active")){
            btn.textContent = "💖";
        }else{
            btn.textContent = "❤️";
        }

    });

});
const fadeElements = document.querySelectorAll(
".hero,.search-section,.movies-section,.joke-section,.contact-section"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

fadeElements.forEach(section=>{

    section.classList.add("fade-in");

    observer.observe(section);

});