let video = document.querySelector('video');
if (video) {
window.addEventListener('scroll' , function() {
    let value = 1 + window.scrollY / -600;
    video.style.opacity = value;
}) }



let hamburger = document.getElementById("hamburger");
let links = document.getElementById("länkar");

hamburger.addEventListener("click", () => {
    links.classList.toggle("active");
});


let container = document.getElementById("vaxter-container");
if (container) {
    async function hamtaVaxter() {
        try {
            let svar = await fetch("http://127.0.0.1:5000/status");
            let vaxter = await svar.json();
            container.innerHTML = "";
            if (vaxter.length === 0) {
                container.innerHTML = "<p style='color:white'> Inga mätningar hittades.</p>";
                return;
            }
            vaxter.forEach(function(vaxt) {
                let fuktvarde = vaxt.fuktvarde;
                let färg = "";
                let text = "";
                if (fuktvarde <= 30) {
                    färg = "#8B0000";
                    text = "Vattna nu!";
                } else if (fuktvarde <= 60) {
                    färg = "#BA7517";
                    text = "Snart dags";
                } else {
                    färg = "#3B6D11";
                    text = "Lagom";
                }
                let kort = document.createElement("div");
                kort.className = "vaxt-kort";
                kort.style.borderColor = färg;
                kort.innerHTML = `
                    <div class="vaxt-status" style="background-color: ${färg}">
                        ${text}
                    </div>
                    <h3>${vaxt.vaxt_id.replace("Vaxt", "Växt")}</h3>
                    <p>Fuktvärde: ${fuktvarde}%</p>
                    <p class="tid">Senast mätt: ${vaxt.tid}</p>
                `;
                container.appendChild(kort);
            });
        } catch (fel) {
            container.innerHTML = "<p style='color:white'>Kunde inte ansluta till servern. Är den igång?</p>";
        }
    }
    hamtaVaxter();
    setInterval(hamtaVaxter, 10000);
}
