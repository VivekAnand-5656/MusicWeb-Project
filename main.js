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
let isPlaying = false;
let currentSong = null;

// === Time formatting ===
function formatTime(time) {
    const min = Math.floor(time / 60).toString().padStart(2, '0');
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// === Load Songs ===
let allSongs = [];
let currentIndex = -1;

async function getSongs() {
    let res = await fetch(url);
    let songs = await res.json();
    allSongs = songs;
    songTruck.innerHTML = ""; // clear before append

    songs.forEach((e, index) => {
        const box = document.createElement("div");
        box.className = "cards w-[150px] h-[200px] text-black rounded-[0.5rem] bg-[#fff] shadow-[0px_11px_17px_-3px_rgba(0,_0,_0,_0.7)] p-3 flex flex-col justify-between";

        box.innerHTML = `
            <img src="${e.previewImg}" class="w-full h-[60%] rounded-[5px]" alt="">
            <div class="title">
                <p class="text-[0.9rem] overflow-auto font-semibold">${e.title}</p>
            </div>
            <p class="text-[0.6rem]">${e.artistName}</p>
            <div class="w-[100%] flex justify-between items-center bottom-0">
                <button data-index="${index}" class="play-btn text-[1.5rem] cursor-pointer hover:text-[#ff8000] transition ease-in-out duration-300">
                    <i class="fa-solid fa-circle-play"></i>
                </button>
                <button id="fav" onclick="favourite()" class="text-[1.5rem] cursor-pointer hover:text-[#ff0c0c] transition ease-in-out duration-300">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        `;

        box.querySelector(".play-btn").addEventListener("click", (el) => {
            let songIndex = parseInt(el.target.closest("button").getAttribute("data-index"));
            playSong(songIndex);
        });

        songTruck.appendChild(box);
    });

    search.addEventListener("input", () => {
        searchSongs(songs);
    });
}
// === Favourite ===
let fv = document.getElementById("fv");
    let count = JSON.parse(localStorage.getItem("countFav")) || 0;
    fv.textContent = count;
function favourite(){
    count++;
    fv.textContent=count;
    localStorage.setItem("countFav",JSON.stringify(count));

}

// === Play a specific song ===
function playSong(index) {
    const song = allSongs[index];
    if (!song) return;

    audio.src = song.songUrl;
    currentSong = song.songUrl;
    sName.textContent = song.title;
    sArt.textContent = song.artistName;
    nowPlaying.textContent = `🎵 Playing: ${song.title}`;
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
    currentIndex = index;
}

// === Play/Pause from main button ===
playBtn.addEventListener("click", () => {
    if (audio.src) {
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
});

// === Next Button ===
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentIndex < allSongs.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    playSong(currentIndex);
});

// === Previous Button ===
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = allSongs.length - 1;
    }
    playSong(currentIndex);
});

// === Update Progress Bar ===
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        durationDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    }
});

// === Seek using Progress Bar ===
progressBar.addEventListener("input", () => {
    if (audio.duration) {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
});

getSongs();

// === Search Songs ===
function searchSongs(song) {
    let keyword = search.value.toLowerCase().trim();
    songTruck.innerHTML = "";
    song.forEach((ele, index) => {
        if (ele.title.toLowerCase().includes(keyword)) {
            const box = document.createElement("div");
            box.className = "cards w-[150px] h-[200px] rounded-[0.5rem] bg-[#fff] text-black shadow-[0px_11px_17px_-3px_rgba(0,_0,_0,_0.7)] p-3 flex flex-col justify-between";
            box.innerHTML = `
                <img src="${ele.previewImg}" class="w-full h-[60%] rounded-[5px]" alt="">
                <p class="sc text-[0.9rem] overflow-hidden whitespace-nowrap text-ellipsis w-40 font-semibold">${ele.title}</p>
                <p class="text-[0.6rem]">${ele.artistName}</p>
                <div class="w-[100%] flex justify-between items-center bottom-0">
                    <button data-index="${index}" class="play-btn text-[1.5rem] cursor-pointer hover:text-[#ff8000]">
                        <i class="fa-solid fa-circle-play"></i>
                    </button>
                    <button class="text-[1.5rem] cursor-pointer hover:text-[#ff0c0c]">
                         <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
            `;
            box.querySelector(".play-btn").addEventListener("click", (el) => {
                let songIndex = parseInt(el.target.closest("button").getAttribute("data-index"));
                playSong(songIndex);
            });
            songTruck.appendChild(box);
        }
    });
}

// === Signup ===
let users = JSON.parse(localStorage.getItem("usersData")) || [];
let currentuser = JSON.parse(localStorage.getItem("currentUser"));

function userSet() {
    let userid = document.getElementById("userid");
    userid.innerText = currentuser;
}
userSet();

// === Logout ===
let logout = document.getElementById("logout");
function getLog() {
    logout.addEventListener("click", () => {
        let conf = confirm("Are sure to want to log out");
        if (conf) {
            window.location.href = "index.html";
        }
    })
}
getLog();
