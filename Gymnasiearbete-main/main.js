let video = document.querySelector('video');
window.addEventListener('scroll' , function() {
    let value = 1 + window.scrollY / -600;
    video.style.opacity = value;
})



let hamburger = document.getElementById("hamburger");
let links = document.getElementById("länkar");

hamburger.addEventListener("click", () => {
    links.classList.toggle("active");
});
