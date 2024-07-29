let audio = new Audio("../audio/song.mp3");
let mButton = document.querySelector("#music-button");
let enterButton = document.querySelector("#enter-website");
let isPlaying = false;

document.querySelector("#content").style.display = "none";
//document.querySelector("header").style.display = "none";

enterButton.addEventListener("click", () => {
  document.querySelector(".musicFirstPanel").style.display = "none";
  document.querySelector("#content").style.display = "block";
  //document.querySelector("header").style.display = "block";
  isPlaying = true;
  audio.play();
  document
    .querySelector("#music-button-icon")
    .classList.replace("bi-play-fill", "bi-pause-fill");
});

mButton.addEventListener("click", () => {
  if (!audio.paused) {
    audio.pause();
    document
      .querySelector("#music-button-icon")
      .classList.replace("bi-pause-fill", "bi-play-fill");
  } else {
    audio.play();
    document
      .querySelector("#music-button-icon")
      .classList.replace("bi-play-fill", "bi-pause-fill");
  }
});
