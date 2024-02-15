import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

export function parallaxElems() {
  const parallaxElems = document.querySelectorAll('[data-speed]')

  for (const parallaxElem of parallaxElems) {
    console.log(parallaxElem)

    const amount = parallaxElem.getAttribute('data-speed') * 100

    gsap.to(parallaxElem, {duration: 0.5, ease: 'none', yPercent: amount, scrollTrigger: {
      trigger: parallaxElem,
      start: 'center center',
      scrub: true,
      // markers: true
    }})
  }
}