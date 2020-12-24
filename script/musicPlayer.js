import { addZero } from './subscript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
    audioImg = document.querySelector('.audio-img'),
    audioHeader = document.querySelector('.audio-header'),
    audioPlayer = document.querySelector('.audio-player'),
    audioNavigation = document.querySelector('.audio-navigation'),
    audioButtonPlay = document.querySelector('.audio-button__play'),
    audioProgress = document.querySelector('.audio-progress'),
    audioProgressTiming = document.querySelector('.audio-progress__timing'),
    audioTimePassed = document.querySelector('.audio-time__passed'),
    audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed']

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        console.log(track);

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase(); 
        audioPlayer.src = `./audio/${track}.mp3`;
        console.log(audioPlayer.src);

        if (isPlayed) {
            audioPlayer.pause()
        }   else {
            audioPlayer.play()
        }
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack()
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }
// FIXME: НЕ КОРРЕКТО РАБОТАЕТ АУДИОНАВИГАТОР
    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            };

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase(); 
            if (target.classlist === 'audio-button__prev') {
                prevTrack();
            };
            if (target.classlist === 'audio-button__next') {
                nextTrack();
            };

    });
    
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutePassed = Math.floor(currentTime / 60 || '0');
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minuteTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';
        
        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`

    });

    audioProgress.addEventListener('click', e => {
        const x = e.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });


}