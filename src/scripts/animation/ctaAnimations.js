import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function ctaAnimations() {
  const ctaDrawSVGElem = document.querySelector('[data-draw-svg="cta"]')

  gsap.set(ctaDrawSVGElem.querySelectorAll('#solid path'), {clipPath: 'inset(0% 100% 0% 0%)'})

  const ctaDrawSVGAnimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ctaDrawSVGElem,
      start: 'top center',
      toggleActions: 'restart none none reverse',
    }
  }).addLabel('start')

  if (ctaDrawSVGElem.querySelector('.draw-group')) {
    let drawGroups = ctaDrawSVGElem.querySelectorAll('.draw-group')
    
    for (const drawGroup of drawGroups) {
      ctaDrawSVGAnimTL
        .from(drawGroup.querySelectorAll('path'), {duration: 1, stagger: {each: 0.05, ease: 'sine.out'}, drawSVG: 0}, '-=1')
    }
  } else {
    ctaDrawSVGAnimTL
      .from(ctaDrawSVGElem.querySelectorAll('path'), {duration: 1, stagger: {each: 0.05, ease: 'sine.out'}, drawSVG: 0}, 'start')
  }

  ctaDrawSVGAnimTL
    .to('[data-draw-svg="cta"] #solid path', {duration: 0.05, stagger: 0.05, clipPath: 'inset(0% 0% 0% 0%)'})
    .from('section#cta .button', {duration: 1, autoAlpha: 0, y: 10})

}