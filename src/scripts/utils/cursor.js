import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap)

let cursor

export function initCursor() {

  cursor = new MouseFollower({
    skewing: 0,
    skewingText: 1,
    skewingIcon: 1,
    skewingMedia: 1,
    stateDetection: {
      '-pointer': 'a, button, .button, .link',
      // '-hidden': '.button'
    },
  })

  const expandEls = document.querySelectorAll('[data-cursor-enlarge]')
  for (const expandEl of expandEls) {
    expandEl.addEventListener('mouseenter', () => {
      cursor.addState('-enlarge')
    })

    expandEl.addEventListener('mouseleave', () => {
      cursor.removeState('-enlarge')
    })
  }

  const volumeEls = document.querySelectorAll('[data-cursor-volume]')
  for (const volumeEl of volumeEls) {
    volumeEl.addEventListener('mouseenter', () => {
      if (!volumeEl.muted) {
        cursor.removeState('-volume')
        cursor.addState('-mute')
      } else {
        cursor.removeState('-mute')
        cursor.addState('-volume')
      }
    })

    volumeEl.addEventListener('mouseleave', () => {
      cursor.removeState('-volume')
      cursor.removeState('-mute')
    })

    volumeEl.addEventListener('click', () => {

      if (volumeEl.muted) {
        cursor.removeState('-volume')
        cursor.addState('-mute')
      } else {
        cursor.removeState('-mute')
        cursor.addState('-volume')        
      }
    })
  }
}

export function removeCursor() {
  cursor.destroy();
}