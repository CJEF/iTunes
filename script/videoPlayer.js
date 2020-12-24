import { addZero } from './subscript.js';

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player'),
  videoButtonPlay = document.querySelector('.video-button__play'),
  videoButtonStop = document.querySelector('.video-button__stop'),
  videoTimePassed = document.querySelector('.video-time__passed'),
  videoProgress = document.querySelector('.video-progress'),
  videoTimeTotal = document.querySelector('.video-time__total'),
  videoVolume = document.querySelector('.video-volume'),
  videoFullsceen = document.querySelector('.video-fullscreen')

  const toggleIcon = () => {
    if(videoPlayer.paused) {
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    } else {
        videoButtonPlay.classList.add('fa-pause');
        videoButtonPlay.classList.remove('fa-play');
    }
  }

  const togglePlay = () => {
    if(videoPlayer.paused) {
        videoPlayer.play()
      } else {
        videoPlayer.pause();
      }
  }

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  const changeVolume = () => {
    const volumeValue = videoVolume.value;
    videoPlayer.volume = volumeValue / 100;
  }

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoPlayer.addEventListener('fullscreenchange', () => { // for nozilla firefox
    if (document.fullscreen) {
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  });

  videoButtonStop.addEventListener('click', stopPlay);
  videoPlayer.addEventListener('timeupdate', () => {
      const currentTime = videoPlayer.currentTime;
      const duration = videoPlayer.duration;

      videoProgress.value = (currentTime / duration) * 100;
      
      let minutePassed = Math.floor(currentTime / 60);
      let secondsPassed = Math.floor(currentTime % 60);

      let minuteTotal = Math.floor(duration / 60);
      let secondsTotal = Math.floor(duration % 60);

      videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
      videoTimeTotal.textContent =  addZero(minuteTotal) + ':' + addZero(secondsTotal);

  });

  videoProgress.addEventListener('input', () => { // or 'change'
      const duration = videoPlayer.duration;
      const value = videoProgress.value;

      videoPlayer.currentTime = (value * duration) / 100;   
  });

  videoVolume.addEventListener('input', changeVolume);

  videoFullsceen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });

  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100); // чтобы при изменения звука при фуллскрине изначальный ползунок звука (маленькького экрана тоже менялся)
  })
  
  changeVolume(); // как сработает эта функция в значение volume будет передано значение input-range из верстки изначально звук 100 процентов 
  
// ДЗ сделать иконку mute volume и еще при нажатии на иконку звука слева убирать звук а справа увеличевать на максимум


}