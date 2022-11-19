const videoplayer = () => {
    const block = document.getElementById('player')
    if(block){
        const play = block.querySelector('.play')
        const full = block.querySelector('.full')
        const stop = block.querySelector('.stop')
        const stopImg = stop.querySelector('img')
        const playImg = play.querySelector('img')
        const pause = block.querySelector('.pause')
        const pauseImg = pause.querySelector('img')
        const setting = block.querySelector('.setting')
        const settingImg = setting.querySelector('img')
        const video = block.querySelector('.video-m')
        let time = block.querySelector('.player-times')
        let line = block.querySelector('.player-progress')
        const videoMain = block.querySelector('.video-main')
        const videoTherapist = block.querySelector('.video-t')
        const isFullscreen = Boolean(document.fullscreenElement);
        const therapistBlockSetting = block.querySelector('.therapist')
        const inputTherapist = therapistBlockSetting.querySelector('.custom')
        const inputMute = therapistBlockSetting.querySelector('.mute')
        therapistBlockSetting.style.display = 'none';
        const labelText = therapistBlockSetting.querySelector('.text')
        const labelTextAudioMute = therapistBlockSetting.querySelector('.text-audio')
        let playerProgress = block.querySelector('.player-progres__bar')
        const videoTherapistBlock = block.querySelector('.video-language__therapist')
        play.addEventListener('click', () =>{
            plays();
            updateTime();
        })
        pause.addEventListener('click', () =>{
            pauses();
        })
        stop.addEventListener('click', () =>{
            stopes();
        })
        full.addEventListener('click', () =>{
            if(getFullsceenElement()){
                document.exitFullscreen();
                block.classList.remove('player--fullscreen', isFullscreen.fullscreen);
            }
            else{
                block.classList.add('player--fullscreen', isFullscreen.fullscreen);
                document.querySelector('.player').requestFullscreen().catch(console.log)
            }
        })
        line.addEventListener('click', setProgress);
        // line.addEventListener('mousemove', setProgress);
        setting.addEventListener('click', () =>{
            if(therapistBlockSetting.style.display !== 'none'){
                settingImg.src = 'img/icon/iconmonstr-gear-thin.svg'
                therapistBlockSetting.style.display="none";
            }
            else{
                therapistBlockSetting.style.display="block";
                settingImg.src = 'img/icon/iconmonstr-gear-1.svg'
            }
        })
        inputTherapist.addEventListener('click', () =>{
            if(inputTherapist.checked){
                labelText.textContent = 'Включить сурдопереводчик';
                therapistBlockSetting.style.display="none";
                videoTherapistBlock.style.display="none";
                videoTherapistBlock.muted = true;
            }
            else{
                labelText.textContent = 'Выключить сурдопереводчик';
                therapistBlockSetting.style.display="none";
                videoTherapistBlock.style.display="flex";
                videoTherapistBlock.muted = false;
            }
        })
        inputMute.addEventListener('click', () =>{
            if(inputMute.checked){
                video.muted = true;
                videoTherapist.muted = true;
                labelTextAudioMute.textContent = ' Включить звук';
            }
            else{
                video.muted = false;
                videoTherapist.muted = false;
                labelTextAudioMute.textContent = 'Выключить звук';
            }
        })
        function plays(){
            video.play();
            videoTherapist.play();
            stopImg.src = 'img/icon/iconmonstr-shape-8.svg'
            pauseImg.src = 'img/icon/iconmonstr-pause-thin.svg'
            playImg.src = 'img/icon/iconmonstr-media-control-48.svg'
        }
        function pauses(){
            video.pause();
            videoTherapist.pause();
            stopImg.src = 'img/icon/iconmonstr-shape-8.svg'
            playImg.src = 'img/icon/iconmonstr-play-thin.svg'
            pauseImg.src = 'img/icon/iconmonstr-media-control-49.svg'
        }
        function stopes(){
            video.pause();
            videoTherapist.pause();
            video.currentTime = 0
            videoTherapist.currentTime = 0
            stopImg.src = 'img/icon/iconmonstr-shape-9.svg'
            pauseImg.src = 'img/icon/iconmonstr-pause-thin.svg'
            playImg.src = 'img/icon/iconmonstr-play-thin.svg'
        }
        
        function getFullsceenElement(){
            return document.fullscreenElement
                || document.webkitFullscreenElement
                || document.mozFullscreenElement
                || document.msFullscreenElement;
        }

        function updateTime(){
            const percent = (video.currentTime / video.duration) * 100;
            playerProgress.style.width = `${percent}%`;
            let minutes = Math.floor(video.currentTime / 60);
            if(minutes < 10){
                minutes = '0' + String(minutes)
            }
            let second = Math.floor(video.currentTime % 60);
            if(second < 10){
                second = '0' + String(second)
            }
            time.innerHTML = `${minutes} : ${second}`;
        }
        function videosrc(){
            let src = video.getAttribute('src')
            if(src == ''){
                videoMain.innerHTML = `<p>У видео нет пути к файлу</p>`;
                videoTherapistBlock.innerHTML = '<p>Отсутствует главное видео</p>';
            }
            else{
                console.log('Путь есть')
            }
        }
        function timestop(){
            if(video.currentTime == video.duration){
                videoTherapist.pause();
                video.pause();
            }
        }

        function setProgress(e){
            let scrubTime = (e.offsetX / line.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
            videoTherapist.currentTime = scrubTime;
        }
        videosrc();
        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('timeupdate', timestop);
    }
    else{
        alert('плеер не загружен')
    }
};
export default videoplayer;

