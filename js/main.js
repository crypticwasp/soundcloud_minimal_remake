const audio = document.querySelector('audio')
const playpause = document.querySelector('.playpause')
const total_duration = document.querySelector('.total')
const elapsed_time = document.querySelector('.time')
const seek = document.querySelector('.seek input')
const volumeinput = document.querySelector('#volumeinput')

// init
const init = () => {
    const duration = Math.round(audio.duration)
    total_duration.innerHTML = `${formatTime(duration).minutes}:${formatTime(duration).seconds}`
    audio.volume = volumeinput.value / 10
    seek.max = duration
}

audio.load()
audio.addEventListener('loadedmetadata', init)

// play pause
playpause.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play()
        iconSwitch('#pause-icon', '#play-icon')
    } else {
        audio.pause()
        iconSwitch('#play-icon', '#pause-icon')
    }
})

// update time on play
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime
    elapsed_time.innerHTML = `${formatTime(current).minutes}:${formatTime(current).seconds}`
    document.querySelector('.progressbar').style.width = `${audioProgress()}%`
})

// show audio in progress bar [percentage]
const audioProgress = () => audio.currentTime / audio.duration * 100

// seek and scrub through audio
seek.addEventListener('input', () => {
    audio.currentTime = seek.value
})

// volume controls
volumeinput.addEventListener('input', () => {
    audio.volume = volumeinput.value / 10
    document.querySelector("#volumeprogress").style.width = `${audio.volume * 100}%`;
})
// mute /unmute
document.querySelector('.volume').addEventListener('click', () => {
    if (audio.muted) {
        iconSwitch('#unmute-icon', '#mute-icon')
    } else {
        iconSwitch('#mute-icon', '#unmute-icon')
    }
    audio.muted = !audio.muted
})

// audio visualiazer
const wave = new Wave();
const bg = document.querySelector('.bg')
const canvas = document.querySelector('canvas')
canvas.width = bg.getBoundingClientRect().width
canvas.height = bg.getBoundingClientRect().height

wave.fromElement(audio.id, canvas.id, {
    type: 'bars',
    colors: ["#f2f2f2"],
    stroke: 3
})



// helper funcs
const formatTime = (time) => {
    const res = new Date(time * 1000).toISOString().substr(11, 8);
    return {
        minutes: res.substr(3, 2),
        seconds: res.substr(6, 2)
    }
}

const iconSwitch = (iin, out) => {
    document.querySelector(out).style.display = 'none'
    document.querySelector(iin).style.display = 'block'
}