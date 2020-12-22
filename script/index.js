import radioPlayerInit from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn"),
  playerBlock = document.querySelectorAll(".player-block"),
  temp = document.querySelector(".temp");

function deactivationPlayer() {
  playerBtn.forEach((item) => item.classList.remove("active"));
  playerBlock.forEach((item) => item.classList.remove("active"));
  temp.style.display = "none";
}

playerBtn.forEach((btn, i) =>
  btn.addEventListener("click", () => {
    deactivationPlayer();
    btn.classList.add("active");
    playerBlock[i].classList.add("active");
  })
);

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();

// videoPlayer = document.querySelector('.player-video'),
// musicPlayer = document.querySelector('.player-music'),
// radioPlayer = document.querySelector('.player-radio');
