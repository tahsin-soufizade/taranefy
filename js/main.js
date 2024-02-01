const musicSliders = document.querySelectorAll(".music-slider");
musicSliders.forEach((slider) => {
  new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 5,
    breakpoints: {
      575: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 3,
      },
      1300: {
        slidesPerView: 4,
      },
      1450: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  });
});

// toggle navbar list in mobile size
const headerBurgerButton = document.querySelector(".header-burger-btn");
const headerNavList = document.querySelector(".header-nav-container");

headerBurgerButton.addEventListener("click", () => {
  if (!headerNavList.classList.contains("open-navbar")) {
    headerNavList.classList.add("open-navbar");
    headerBurgerButton.classList.add("active");
  } else {
    headerNavList.classList.remove("open-navbar");
    headerBurgerButton.classList.remove("active");
  }
});

//-------------- Music player
const audio = new Audio();
const playPauseButton = document.getElementById("play-pause-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const volumeSlider = document.querySelector(".volume-slider");
const seekSlider = document.querySelector(".seek-slider");
const coverImage = document.querySelector(".cover-img");
const currentTimeDisplay = document.querySelector(".current-time");
const totalTimeDisplay = document.querySelector(".total-time");
const singerName = document.querySelector(".singer-name");
const musicName = document.querySelector(".music-name");
const songDetails = document.querySelectorAll(".song-detail");

// LIST OF OUR MUSICS
// const playList = [
//   {
//     singerName: " شایع محمدرضا شایع",
//     musicName: "New Rimix music",
//     audioSrc:
//       "https://edge05.86449.ir.cdn.ir/musics/Remix/SorenaMast-Nist-Remix.mp3",
//     coverSrc:
//       "https://cdn.venngage.com/template/thumbnail/small/bf008bfe-9bf6-4511-b795-e86f070bfff5.webp",
//   },
//   {
//     singerName: "Hayede & Sorena",
//     musicName: "music name 2",
//     audioSrc:
//       "https://edge05.86449.ir.cdn.ir/musics/Remix/single/320/Habs-Remix.mp3",
//     coverSrc:
//       "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/love-music-cd-music-cover-template-design-a8f2a1af7de0479ae4344113a4750136_screen.jpg?ts=1572382443",
//   },
// ];

let currentIndex = 0;
let isPlaying = false;

// play music when click to play button card
const cardPlayButton = document.querySelectorAll(".card-play-btn");
const musicInfoWrapper = document.querySelector(".music-info-wrapper");
const seekWrapperBox = document.querySelector(".main-seek-wrapper");

let track = null;

if (!track) {
  musicInfoWrapper.classList.add("d-none");
  seekWrapperBox.style.opacity = ".6";

  if (window.innerWidth <= 768) {
    seekWrapperBox.classList.add("col-12", "disable-in-phone");
  }
}

cardPlayButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const cardAudio = e.currentTarget.nextElementSibling;
    const cardCoverImage = e.currentTarget.previousElementSibling;
    const cardMusicName =
      e.currentTarget.parentElement.nextElementSibling.firstElementChild;
    const cardSingerName =
      e.currentTarget.parentElement.nextElementSibling.firstElementChild
        .nextElementSibling;

    track = {
      singerName: cardSingerName.innerHTML,
      musicName: cardMusicName.innerHTML,
      audioSrc: cardAudio.src,
      coverSrc: cardCoverImage.src,
    };

    isPlaying = true;

    audio.play();
    coverImage.classList.add("cover-animation");
    const playPauseIcon = playPauseButton.firstElementChild;
    playPauseIcon.classList.replace("fa-play", "fa-pause");

    updateMusicAnimation();

    musicInfoWrapper.classList.remove("d-none");
    seekWrapperBox.style.opacity = "1";
    if (window.innerWidth <= 768) {
      seekWrapperBox.classList.remove("col-12", "disable-in-phone");
    }
    loadAudio();
  });
});

// LOAD CURRENT MUSIC
const loadAudio = () => {
  coverImage.src = track.coverSrc;
  singerName.textContent = track.singerName;
  musicName.textContent = track.musicName;
  audio.src = track.audioSrc;

  if (isPlaying) {
    audio.play();
    coverImage.classList.add("cover-animation");
  }
};

// PLAY AND PAUSE MUSIC
playPauseButton.addEventListener("click", () => {
  const playPauseIcon = playPauseButton.firstElementChild;

  if (track) {
    if (isPlaying) {
      audio.pause();
      coverImage.classList.remove("cover-animation");
      playPauseIcon.classList.replace("fa-pause", "fa-play");

      songDetails.forEach((detail) => {
        detail.style.animation = "";
      });
    } else {
      audio.play();
      coverImage.classList.add("cover-animation");
      playPauseIcon.classList.replace("fa-play", "fa-pause");
      updateMusicAnimation();
    }

    musicInfoWrapper.classList.remove("d-none");
    seekWrapperBox.style.opacity = "1";
    if (window.innerWidth <= 768) {
      seekWrapperBox.classList.remove("col-12", "disable-in-phone");
    }
    
    isPlaying = !isPlaying;
  }
});

// HANDLE MUSIC SOUNDS
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// SEEK TO CURRENT PART OF MUSIC
seekSlider.addEventListener("input", () => {
  const newTime = audio.duration * (seekSlider.value / 100);
  audio.currentTime = newTime;
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const totalTime = audio.duration;

  const percentage = (currentTime / totalTime) * 100;

  if (percentage) {
    seekSlider.value = percentage;
  }

  if ((currentTime, totalTime)) {
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(totalTime);
  }

  updateRangeColors(seekSlider);
});

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// RESET MUSIC INFORMATION WHEN AUDIO ENDS
audio.addEventListener("ended", () => {
  isPlaying = false;
  playPauseButton.firstElementChild.classList.replace("fa-pause", "fa-play");
});

// change volume slider bg every time its value change
volumeSlider.addEventListener("input", () => {
  updateRangeColors(volumeSlider);
});

// change sliders background
const updateRangeColors = (inputSlider) => {
  if (inputSlider.classList.contains("volume-slider")) {
    const gradientColor = `linear-gradient(to right, #3498db 0%, #3498db ${
      inputSlider.value * 100
    }%, #ddd ${inputSlider.value * 100}%, #ddd 100%)`;
    inputSlider.style.background = gradientColor;
  } else {
    const gradientColor = `linear-gradient(to right, #3498db 0%, #3498db ${inputSlider.value}%, #ddd ${inputSlider.value}%, #ddd 100%)`;
    inputSlider.style.background = gradientColor;
  }
};

// set voluem input color initially
updateRangeColors(volumeSlider);

//  set animation to music name and singer name
const updateMusicAnimation = () => {
  if (window.innerWidth <= 768) {
    const englishRange = "\u0041-\u007A"; // English letters range

    const englishRegex = new RegExp(`[${englishRange}]`);

    songDetails.forEach((song) => {
      const containsEnglishChars = englishRegex.test(song.innerHTML);
      if (song.innerHTML.length >= 17) {
        if (containsEnglishChars) {
          song.style.animation = "english-anim 6s linear infinite";
        } else {
          song.style.animation = "persian-anim 6s linear infinite";
        }
      } else {
        song.style.animation = "";
      }
    });
  }
};
