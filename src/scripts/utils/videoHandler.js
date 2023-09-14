export function videoHandler() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-video]')) return

    const video = e.target.closest('video')

    if (video.muted === true) {
      video.muted = false
    }
    else if (video.muted === false) {
      video.muted = true
    }
  })
}