// == Playlist ==
let open = document.getElementById("playlist");
let popup = document.getElementById("playlist-popup");
let close = document.getElementById("close-popup");
let playlistInput = popup.querySelector("input");
let create = document.getElementById("create");
let ulist = document.getElementById("ulist");

open.addEventListener("click",()=>{
    popup.classList.remove("hiden");
})
close.addEventListener("click",()=>{
    popup.classList.add("hiden");
})
let songPlaylist = document.getElementById("song-playlist");
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
function savePlaylist(){
    localStorage.setItem("playlist",JSON.stringify(playlist));
}
let arr=[];
function setPlaylist(){ 
    songPlaylist.innerHTML = "";  // Clear old content
    
    playlist.forEach((el,index) => {
         const boxSong = document.createElement("div");
        boxSong.classList = "w-full";
        boxSong.innerHTML=`
        <div class="text-white bg-[#267376] cursor-pointer p-2 rounded-t-[0.3rem]">
                    <h3 class="text-[1.5rem] font-semibold">${el.name}</h3>
                    <p>3 songs</p>
                    <button id="" onclick="removePlaylist(${index})" class="p-1.5 font-semibold rounded-[0.2rem] cursor-pointer bg-[#f10e0e] ">Remove</button>
                </div>
                <div class=" bg-[#267376] p-2">
                    <table class="w-full text-left">
                         <thead class="border-b border-gray-700 text-gray-200">
                                <tr>
                                    <th class="py-2">No.</th>
                                    <th>Title</th>
                                    <th>Artist</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody> 
                                    <tr class="hover:bg-gray-700 text-white">
                                        <td class="py-2"></td>
                                        <td>hello</td>
                                        <td>hello</td>
                                        <td>
                                            <button id="" class="p-1.5 cursor-pointer text-[#fff]"><i class="fa-solid fa-play"></i></button>
                                            <button id="" class="p-1.5 cursor-pointer  text-[#f00]"><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr> 
                                    
                            </tbody>
                    </table>
                </div>
        `;
        songPlaylist.appendChild(boxSong);
        arr.push(el.name);
    });
    localStorage.setItem("filename",JSON.stringify(arr));
}
setPlaylist();

create.addEventListener("click",()=>{
    const name = playlistInput.value.trim();
    if(name){
        playlist.push({name : name, songs : []});
        savePlaylist();
        setPlaylist();
        playlistInput.value="";
    } else{
        alert("Please Enter a Playlist Name");
    }
});

// == Remove ==
function removePlaylist(index){
    playlist.splice(index,1);
    savePlaylist();
    setPlaylist();
}
