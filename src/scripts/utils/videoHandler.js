export function videoHandler() {

  // Home
  const heroInner = document.querySelector('.home .hero #hero-inner')
  if (heroInner) {
    document.querySelector('[data-video="autoplay"]').addEventListener('click', (e) => {
      const video = e.target.closest('video')
      if (video.muted === true) {
        video.muted = false
        heroInner.classList.add('video-unmuted')
      } else if (video.muted === false) {
        video.muted = true
        heroInner.classList.remove('video-unmuted')
      }
    })
  } else {
    document.querySelector('[data-video]').addEventListener('click', (e) => {
      const video = e.target.closest('video')
      if (video.paused || video.ended) {
        video.play()
      } else {
        video.pause()
      }
    })
  }
}