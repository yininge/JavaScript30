let video = document.querySelector("video");
let toggleBtn = document.querySelector(".toggle");
let playBtn = document.querySelectorAll(".player__button");
let playSlider = document.querySelectorAll(".player__slider");
let progress = document.querySelector(".progress");
let progressBar = document.querySelector(".progress__filled");

video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", handleProgress);
toggleBtn.addEventListener("click", togglePlay);
playBtn.forEach(btn => btn.addEventListener("click", skip));
playSlider.forEach(slider => slider.addEventListener("change", rangeUpdate));
playSlider.forEach(slider => slider.addEventListener("mousemove", rangeUpdate));

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayButton() {
  toggleBtn.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
  if (this.dataset.skip) video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
