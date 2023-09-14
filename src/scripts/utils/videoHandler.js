export function videoHandler() {
  const heroInner = document.querySelector('.home .hero #hero-inner')

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-video]')) return

    const video = e.target.closest('video')

    if (video.muted === true) {
      video.muted = false
      
      heroInner.classList.add('video-unmuted')

    } else if (video.muted === false) {
      video.muted = true
      
      heroInner.classList.remove('video-unmuted')

    }
  })
}