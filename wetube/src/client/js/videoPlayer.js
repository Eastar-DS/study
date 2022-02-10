const video = document.querySelector("video")
let volumeValue = 0.5
video.volume = volumeValue
const playBtn = document.getElementById("play")
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute")
const muteBtnIcon = muteBtn.querySelector("i");
// const time = document.getElementById("time")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
const volumeRange = document.getElementById("volume")
const timeline = document.getElementById("timeline")
const fullScreenBtn = document.getElementById("fullScreen")
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer")

const videoControls = document.getElementById("videoControls")
let controlsTimeout = null
let controlsMovementTimeout = null


const handlePlayClick = (e) => {
    // 재생중이면 멈추고 아니면 반대.
    if(video.paused) {
        video.play()
    } else {        
        video.pause()
    }
    // playBtn.innerText = video.paused ? "Play" : "Pause"
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}
const handlePause = (e) => (playBtn.innerText = "Play")
const handlePlay = (e) => (playBtn.innerText = "Pause")

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
        // muteBtn.innerText = "Mute"
    } else {
        video.muted = true;
        // muteBtn.innerText = "Unmute"
    }
    // muteBtn.innerText = video.muted ? "Unmute" : "Mute"
    muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue
}

const handleVolumeChange = (event) => {
    // console.log(event.target.value)
    const {target: { value}} = event
    if(video.muted) {
        video.muted = false
        muteBtn.innerText = "Mute"
    }
    volumeValue = value
    video.volume = value
    // volume이 0이될때 뮤트처리해주기
    if(volumeValue === 0) {
        video.muted = true
        muteBtn.innerText = "Unmute"
    }
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(14,19)

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration))
    timeline.max = Math.floor(video.duration)
}

const handleTimeUpdate = () => {
    // console.log(video.currentTime)
    currentTime.innerText = formatTime(Math.floor(video.currentTime))
    timeline.value = Math.floor(video.currentTime)
}

const handleTimelineChange = (event) => {
    // console.log(event.target.value)
    const {target : {value}} = event
    video.currentTime = value
}

const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement
    if (fullscreen) {
        document.exitFullscreen();
        // fullScreenBtn.innerText = "Enter Full Screen"
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen()
        // fullScreenBtn.innerText = "Exit Full Screen"
        fullScreenIcon.classList = "fas fa-compress";
    }
}

const hideControls = () => videoControls.classList.remove("showing")

const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout)
        controlsTimeout = null
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout)
        controlsMovementTimeout = null
    }
    videoControls.classList.add("showing")
    controlsMovementTimeout = setTimeout(hideControls,1000)
}

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls,1000)
}

playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMute)
// video.addEventListener("pause", handlePause)
// video.addEventListener("play", handlePlay)
volumeRange.addEventListener("input", handleVolumeChange)
// video.addEventListener("loadedmetadata", handleLoadedMetadata)
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate)
timeline.addEventListener("input", handleTimelineChange)
fullScreenBtn.addEventListener("click", handleFullscreen)


videoContainer.addEventListener("mousemove", handleMouseMove)
videoContainer.addEventListener("mouseleave", handleMouseLeave)




if (video.readyState == 4) {
    handleLoadedMetadata();
    }