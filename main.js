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
let currentSong = null;
let isPlaying = false;

// === Time formatting ===
function formatTime(time) {
    const min = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
    const sec = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');
    return `${min}:${sec}`;
}

// === Load Songs ===
async function getSongs() {
    let res = await fetch(url);
    let songs = await res.json();

    songs.forEach((e) => {
        const box = document.createElement("div");
        box.className = "cards w-[200px] h-[250px] text-white rounded-[0.5rem] bg-[#306567] p-3 flex flex-col justify-between";

        box.innerHTML = `
            <img src="${e.previewImg}" class="w-full h-[60%] rounded-[5px]" alt="">
            <p class="text-[0.9rem] overflow-auto font-semibold">${e.title}</p>
            <p class="text-[0.6rem]">${e.artistName}</p>
            <div class="w-[100%] flex justify-between items-center bottom-0">
                <button data-audio="${e.songUrl}" class="play-btn text-[1.5rem] cursor-pointer hover:text-[#00F6FF] transition ease-in-out duration-300">
                    <i class="fa-solid fa-circle-play"></i>
                </button>
                <button class="text-[1.5rem] cursor-pointer hover:text-[#ff0c0c] transition ease-in-out duration-300">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;

        box.querySelector(".play-btn").addEventListener("click", (el) => {
            const btn = el.target.closest("button");
            const src = btn.getAttribute("data-audio");

            if (currentSong !== src) {
                audio.src = src;
                currentSong = src;
                sName.textContent = e.title;
                sArt.textContent = e.artistName;
                nowPlaying.textContent = `🎵 Playing: ${e.title}`;
                audio.play();
                isPlaying = true;
                playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
            } else {
                // Toggle play/pause if same song
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

        // === Search ===



        songTruck.appendChild(box);
    });
    search.addEventListener("input", () => {
        searchSongs(songs);
    });
}

// === Custom play button ===
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

// === Update Progress Bar ===
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    durationDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

// === Seek using Progress Bar ===
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

getSongs();
// == Search Songs ==
function searchSongs(song) {
    let keyword = search.value.toLowerCase().trim();
    songTruck.innerHTML = "";
    song.forEach((ele) => {
        if (ele.title.toLowerCase().includes(keyword)) {
            const box = document.createElement("div");
            box.className = "cards w-[200px] h-[250px] rounded-[0.5rem] bg-[#686565] p-3 flex flex-col justify-between";
            box.innerHTML = `
                <img src="${ele.previewImg}" class="w-full h-[60%] rounded-[5px]" alt="">
                <p class="text-[0.9rem] overflow-auto font-semibold">${ele.title}</p>
                <p class="text-[0.6rem]">${ele.artistName}</p>
                <div class="w-[100%] flex justify-between items-center bottom-0">
                    <button data-audio="${ele.songUrl}" class="play-btn text-[1.5rem] cursor-pointer hover:text-[#00F6FF]">
                        <i class="fa-solid fa-circle-play"></i>
                    </button>
                    <button class="text-[1.5rem] cursor-pointer hover:text-[#ff0c0c]">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            `;
            box.querySelector(".play-btn").addEventListener("click", (el) => {
                const btn = el.target.closest("button");
                const src = btn.getAttribute("data-audio");

                if (currentSong !== src) {
                    audio.src = src;
                    currentSong = src;
                    sName.textContent = ele.title;
                    sArt.textContent = ele.artistName;
                    nowPlaying.textContent = `🎵 Playing: ${ele.title}`;
                    audio.play();
                    isPlaying = true;
                    playBtn.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
                } else {
                    // Toggle play/pause if same song
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
            songTruck.appendChild(box);
        }
    });
}
// == Signup ==
let users = JSON.parse(localStorage.getItem("usersData")) || [];

let currentuser = JSON.parse(localStorage.getItem("currentUser"));
function userSet() {
    let userid = document.getElementById("userid");
    userid.innerText = currentuser;
}
userSet();
// == Logout ==
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

// == Playlist ==
// let create = document.getElementById("playlist");
// let popup = document.getElementById("playlist-popup");
// let close = document.getElementById("close-popup");

// create.addEventListener("click",()=>{
//     popup.classList.remove('hiden');
// })
// close.addEventListener("click",()=>{
//     popup.classList.add('hiden');
// })