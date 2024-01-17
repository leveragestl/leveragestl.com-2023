import gsap from "gsap"
import { ScrollSmoother } from "gsap/all"

gsap.registerPlugin(ScrollSmoother)

export function compareSwiper() {
  if (window.matchMedia('(any-hover: hover) and (pointer: fine)').matches) {
    gsap.to('[data-compare-swiper]', {duration: 1, '--percentage': '0%', ease: 'none', scrollTrigger: {
      trigger: '[data-compare-swiper]',
      scrub: true,
      // start: 'top center',
      // end: 'center center',
      pin: true,
      start: 'top top',
      // markers: true,
      invalidateOnRefresh: true,
    }})
  } else {
    if (gsap.ScrollTrigger) {
      ScrollTrigger.killAll()
    }
  }
}