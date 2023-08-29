// GSAP
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin);

export function drawSVG() {
  const drawSVGElems = document.querySelectorAll('[data-draw-svg]')

  for (const drawSVGElem of drawSVGElems) {

    console.log(drawSVGElem);

    const drawSVGAnimTL = gsap.timeline({
      scrollTrigger: {
        trigger: drawSVGElem,
        start: 'top 75%',
        toggleActions: 'restart none none reverse',
      }
    }).addLabel('start')

    drawSVGAnimTL
      .from('#be-useful path', {duration: 1, stagger: {each: 0.05, ease: 'sine.out'}, drawSVG: 0})
      .from('#be-kind path', {duration: 1, stagger: {each: 0.05, ease: 'sine.out'}, drawSVG: 0}, '-=0.75')
      .from('#be-fearless path', {duration: 1, stagger: {each: 0.05, ease: 'sine.out'}, drawSVG: 0}, '-=1')
  }
}