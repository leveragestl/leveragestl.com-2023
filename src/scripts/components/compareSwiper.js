import gsap from "gsap"
import { ScrollSmoother, ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

export function compareSwiper() {

  let swiperAnimTL = gsap.timeline()

  if (window.matchMedia('(any-hover: hover) and (pointer: fine)').matches) {

    const parentElem = document.querySelector('[data-compare-swiper]').closest('section')

    swiperAnimTL = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-compare-swiper]',
        scrub: true,
        // start: 'top center',
        // end: 'center center',
        pin: parentElem,
        start: 'top top-=1px',
        // markers: true,
        invalidateOnRefresh: true,
      }
    })

    swiperAnimTL.to('[data-compare-swiper]', {duration: 1, '--percentage': '0%', ease: 'none'})
  } else {
    swiperAnimTL.kill()
  }

  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 2000);

  window.addEventListener('resize', () =>  {
    ScrollTrigger.refresh()
  })
}