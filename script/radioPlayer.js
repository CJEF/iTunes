const radioPlayer = () => {
  const radio = document.querySelector(".radio");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioCoverImg = document.querySelector(".radio-cover__img");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioHeaderBig = document.querySelector(".radio-header__big");
  const radioStop = document.querySelector(".radio-stop");

  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-stop");
      radioStop.classList.remove("fa-play");
    }
  };

  const radioSelectRemover = (parent) => {
    radioItem.forEach((element) => {
      element.classList.remove("select");
      parent.classList.add("select");
    });
  };

  radioNavigation.addEventListener("change", (e) => {
    const target = e.target;
    const parent = target.closest(".radio-item");
    radioSelectRemover(parent);

    const title = parent.querySelector(".radio-name").textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parent.querySelector(".radio-img").src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;

    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });
};

export default radioPlayer;
