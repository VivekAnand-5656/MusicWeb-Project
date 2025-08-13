let songTruck = document.getElementById("truck");
let url = "https://sonix-s830.onrender.com/api/songs";

let sName = document.getElementById("s-name");
let sArt = document.getElementById("s-art");
let nowPlaying = document.getElementById("now-playing");
let playBtn = document.getElementById("play-btn");
let progressBar = document.getElementById("progress-bar");
let durationDisplay = document.getElementById("duration");

let search = document.getElementById("search");

let audio = new Audio(); // Hidden audio object
let currentSongIndex = -1;
let songs = [];
let isPlaying = false;

// === Time formatting ===
function formatTime(time) {
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

// === Load Songs ===
async function getSongs() {
  let res = await fetch(url);
  songs = await res.json();

  songTruck.innerHTML = ""; // clear before appending

  songs.forEach((e, index) => {
    const box = document.createElement("div");
    box.className = "cards w-[150px] h-[200px] text-black rounded-[0.5rem] bg-[#fff] shadow-[0px_11px_17px_-3px_rgba(0,_0,_0,_0.7)] p-3 flex flex-col justify-between";

    box.innerHTML = `
            <img src="${e.previewImg}" class="w-full h-[60%] rounded-[5px]" alt="">
            <div class="title"><p class="text-[0.9rem] overflow-auto font-semibold">${e.title}</p>
            </div>
            <p class="text-[0.6rem]">${e.artistName}</p>
            <div class="w-[100%] flex justify-between items-center bottom-0">
                <button data-index="${index}" class="play-btn text-[1.5rem] cursor-pointer hover:text-[#ff8000] transition ease-in-out duration-300">
                    <i class="fa-solid fa-circle-play"></i>
                </button>
                <button class="text-[1.5rem] cursor-pointer hover:text-[#ff0c0c] transition ease-in-out duration-300">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        `;

    box.querySelector(".play-btn").addEventListener("click", (el) => {
      const btn = el.target.closest("button");
      const index = Number(btn.getAttribute("data-index"));
      playSong(index);
    });

    songTruck.appendChild(box);
  });

  // Attach search listener
  search.addEventListener("input", () => {
    searchSongs(songs);
  });
}

// === Play a song by index ===
function playSong(index) {
  if (index < 0 || index >= songs.length) return;

  if (currentSongIndex !== index) {
    currentSongIndex = index;
    audio.src = songs[index].songUrl;
    sName.textContent = songs[index].title;
    sArt.textContent = songs[index].artistName;
    nowPlaying.textContent = `🎵 Playing: ${songs[index].title}`;
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
  } else {
    // toggle play/pause if same song
    if (audio.paused) {
      audio.play();
      isPlaying = true;
      playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
    } else {
      audio.pause();
      isPlaying = false;
      playBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
    }
  }
}

// === Play/Pause Button ===
playBtn.addEventListener("click", () => {
  if (!audio.src) return;
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
  }
});

// === Next and Previous buttons ===
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener("click", () => {
  if (songs.length === 0) return;
  let nextIndex = currentSongIndex + 1;
  if (nextIndex >= songs.length) nextIndex = 0; // loop to first song
  playSong(nextIndex);
});

prevBtn.addEventListener("click", () => {
  if (songs.length === 0) return;
  let prevIndex = currentSongIndex - 1;
  if (prevIndex < 0) prevIndex = songs.length - 1; // loop to last song
  playSong(prevIndex);
});

// === Update Progress Bar ===
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  durationDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(
    audio.duration
  )}`;
});

// === Seek using Progress Bar ===
progressBar.addEventListener("input", () => {
  if (!audio.duration) return;
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// === Search Songs ===
function searchSongs(songList) {
  let keyword = search.value.toLowerCase().trim();
  songTruck.innerHTML = "";
  songList.forEach((ele, index) => {
    if (ele.title.toLowerCase().includes(keyword)) {
      const box = document.createElement("div");
      box.className =
        "cards w-[150px] h-[200px] rounded-[0.5rem] bg-[#fff] text-black shadow-[0px_11px_17px_-3px_rgba(0,_0,_0,_0.7)] p-3 flex flex-col justify-between";
      box.innerHTML = `
                <img src="${ele.previewImg}" class="w-full h-[60%] rounded-[5px]" alt="">
                <p class="text-[0.9rem] overflow-auto font-semibold">${ele.title}</p>
                <p class="text-[0.6rem]">${ele.artistName}</p>
                <div class="w-[100%] flex justify-between items-center bottom-0">
                    <button data-index="${index}" class="play-btn text-[1.5rem] cursor-pointer hover:text-[#ff8000]">
                        <i class="fa-solid fa-circle-play"></i>
                    </button>
                    <button class="text-[1.5rem] cursor-pointer hover:text-[#ff0c0c]">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            `;
      box.querySelector(".play-btn").addEventListener("click", (el) => {
        const btn = el.target.closest("button");
        const idx = Number(btn.getAttribute("data-index"));
        playSong(idx);
      });
      songTruck.appendChild(box);
    }
  });
}

// Start loading songs
getSongs();

// == Signup ==
let users = JSON.parse(localStorage.getItem("usersData")) || [];

let currentuser = localStorage.getItem("currentUser");
function userSet() {
  let userid = document.getElementById("userid");
  if (userid) userid.textContent = currentuser;
}
userSet();
