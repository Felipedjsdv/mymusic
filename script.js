const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const cover = document.getElementById("cover");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playPauseBtn = document.getElementById("playPauseBtn");

let musicas = [];
let indexAtual = 0;

fetch("musicas.json")
  .then(response => response.json())
  .then(data => {
    musicas = data;
    playlist.innerHTML = "";

    musicas.forEach((musica, index) => {
      const item = document.createElement("li");
      item.textContent = musica.titulo;
      item.classList.add("playlist-item");
      item.addEventListener("click", () => tocarMusica(index));
      playlist.appendChild(item);
    });

    if (musicas.length > 0) tocarMusica(0);
  })
  .catch(error => {
    console.error("Erro ao carregar músicas:", error);
  });

function tocarMusica(index) {
  indexAtual = index;
  const musica = musicas[index];
  audioPlayer.src = musica.caminho;
  audioPlayer.play();
  atualizarIconePlay(true);

  document.querySelectorAll(".playlist-item").forEach(el => el.classList.remove("active"));
  playlist.children[indexAtual].classList.add("active");

  cover.src = musica.capa || "https://i.imgur.com/UH3IPXw.png";
}

prevBtn.addEventListener("click", () => {
  indexAtual = (indexAtual - 1 + musicas.length) % musicas.length;
  tocarMusica(indexAtual);
});

nextBtn.addEventListener("click", () => {
  indexAtual = (indexAtual + 1) % musicas.length;
  tocarMusica(indexAtual);
});

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    atualizarIconePlay(true);
  } else {
    audioPlayer.pause();
    atualizarIconePlay(false);
  }
});

function atualizarIconePlay(isPlaying) {
  const icon = playPauseBtn.querySelector("i");
  icon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
  lucide.createIcons();
}
