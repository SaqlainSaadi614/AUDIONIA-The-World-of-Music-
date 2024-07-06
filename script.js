 // Initialize variables
 let songIndex = 0;
 let audioElement = new Audio();
 let masterPlay = document.getElementById('masterPlay');
 let ProgressBar = document.getElementById('ProgressBar');
 let gif = document.getElementById('gif');
 let songName = document.querySelector('.song-name');
 let songItems = document.querySelectorAll('.songItem');
 
  // Array of songs
  let songs = [
 { songName: "Jany is dil ka hal", filePath: "songs/1.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Sun Saiyan", filePath: "songs/2.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Kya kr diya", filePath: "songs/3.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Sultan Album", filePath: "songs/4.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Aujla X Divine Album", filePath: "songs/5.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Here & There", filePath: "songs/6.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Its Hustle", filePath: "songs/7.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "12Am - 12Pm", filePath: "songs/8.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Yar veliya", filePath: "songs/9.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Ye tu ne kya kiya", filePath: "songs/10.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Bulleya", filePath: "songs/11.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "YKWIM", filePath: "songs/12.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Akh Lari", filePath: "songs/13.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Gain Off", filePath: "songs/14.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "baby Gal Suno", filePath: "songs/15.mp3", coverPath: "cover/logo1.jpeg" },
 { songName: "Mera Diwanapan", filePath: "songs/16.mp3", coverPath: "cover/logo1.jpeg" }
 ];
 
 // Function to play the current song
 const playSong = () => {
     audioElement.src = songs[songIndex].filePath;
     audioElement.play();
     masterPlay.classList.remove('bx-play-circle');
     masterPlay.classList.add('bx-pause-circle');
     gif.style.opacity = 1;
     songName.textContent = songs[songIndex].songName;
 };
 
 // Play the first song by default
 playSong();
 
 // Toggle play/pause when the master play button is clicked
 masterPlay.addEventListener('click', () => {
     if (audioElement.paused) {
         audioElement.play();
         masterPlay.classList.remove('bx-play-circle');
         masterPlay.classList.add('bx-pause-circle');
         gif.style.opacity = 1;
     } else {
         audioElement.pause();
         masterPlay.classList.remove('bx-pause-circle');
         masterPlay.classList.add('bx-play-circle');
         gif.style.opacity = 0;
     }
 });
 
 // Update progress bar as the song plays
 audioElement.addEventListener('timeupdate', () => {
     let progress = (audioElement.currentTime / audioElement.duration) * 100;
     ProgressBar.value = progress;
 });
 
 // Seek the audio when the progress bar is changed
 ProgressBar.addEventListener('input', () => {
     audioElement.currentTime = (ProgressBar.value / 100) * audioElement.duration;
 });
 
 // Function to play next song
 const playNext = () => {
     songIndex = (songIndex + 1) % songs.length;
     playSong();
 };
 
 // Function to play previous song
 const playPrevious = () => {
     songIndex = (songIndex - 1 + songs.length) % songs.length;
     playSong();
 };
 
 // Play next song when next button is clicked
 document.getElementById('next').addEventListener('click', playNext);
 
 // Play previous song when previous button is clicked
 document.getElementById('previous').addEventListener('click', playPrevious);
 
 // Add click event listeners to each songItem
 songItems.forEach((item, index) => {
     let playPauseButton = item.querySelector('.play-pause');
 
     playPauseButton.addEventListener('click', () => {
         // Pause the currently playing song if it's not the clicked one
         if (songIndex !== index) {
             songIndex = index;
             playSong();
         } else {
             if (audioElement.paused) {
                 audioElement.play();
                 playPauseButton.classList.remove('bx-play-circle');
                 playPauseButton.classList.add('bx-pause-circle');
             } else {
                 audioElement.pause();
                 playPauseButton.classList.remove('bx-pause-circle');
                 playPauseButton.classList.add('bx-play-circle');
             }
         }
     });
 });