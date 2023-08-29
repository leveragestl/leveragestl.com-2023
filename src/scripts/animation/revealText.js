import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

let mm = gsap.matchMedia();

export function revealText() {
  const revealTextElems = document.querySelectorAll('[data-revealText]')

  for (const revealTextElem of revealTextElems) {
    
    const split = new SplitText(revealTextElem, {type: "chars, words, lines", /* position: "absolute" */});

    gsap.set(split.lines, {overflow: 'hidden'})
    gsap.set(split.words, {yPercent: 200})

    gsap.timeline({
      scrollTrigger: {
        trigger: revealTextElem,
        start: 'top center',
        // markers: true ,
        toggleActions: "restart none none reverse"
      }
    }).add('start')
    // cubic-bezier(0.01,-0.67,0,1);
    .to(split.words, {duration: 1, yPercent: 0, /* clipPath: 'inset(100% 0% 0% 0%)', */ ease: CustomEase.create("easeName", "0, 0, 0, 1"), stagger: {each: 0.035, ease: 'sine.out'}}, 'start')      
  }
}