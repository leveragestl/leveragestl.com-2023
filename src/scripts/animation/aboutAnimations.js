import gsap from "gsap"
import ScrollTrigger from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export function aboutAnimations() {
  const animGroup = document.querySelector('[data-anim-group="unshuffle"]')
  const photos = animGroup.querySelectorAll('[data-anim-item]')

  // Get all photos except the last one and store in an array
  const photosArr = []
  for (const [i, photo] of photos.entries()) {
    if (i < (photos.length - 1)) {
      photosArr.push(photo)
    }
  }

  const aboutHeroPinTL = gsap.timeline({
    scrollTrigger: {
      trigger: animGroup,
      start: 'center center',
      end: `${(photos.length - 1.25) * 100}%`,
      scrub: true,
      pin: '.pin-wrapper',
      invalidateOnRefresh: true
    }
  })

  const aboutHeroTL = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'none'
    },
    scrollTrigger: {
      trigger: animGroup,
      start: '40% center',
      end: `${photos.length * 100}%`,
      scrub: true,
      // pin: '.pin-wrapper',
      // markers: true,
      invalidateOnRefresh: true
    }
  })

  aboutHeroTL.to('[data-anim-item]', {duration: 1, yPercent: -150, stagger: 1})

  for (const [i, photo] of photos.entries()) {
    gsap.set(photo, {zIndex: photos.length - i})
  }
}