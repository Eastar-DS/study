const video = document.querySelector("video")
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const time = document.getElementById("time")
const volume = document.getElementById("volume")

const handlePlayClick = (e) => {
    // 재생중이면 멈추고 아니면 반대.
    if(video.paused) {
        video.play()
    } else {        
        video.pause()
    }
}
const handlePause = (e) => (playBtn.innerText = "Play")
const handlePlay = (e) => (playBtn.innerText = "Pause")

const handleMute = (e) => {
    
}

playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMute)
video.addEventListener("pause", handlePause)
video.addEventListener("play", handlePlay)