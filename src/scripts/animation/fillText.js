import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

export function fillText() {

  const fillTextElems = document.querySelectorAll('[data-fillText]')

  for (const fillTextElem of fillTextElems) {

    const splitOutline = new SplitText(fillTextElem.querySelector('[data-fillText="outline"]'), {type: "chars, words, lines", /* position: "absolute" */});

    const splitFill = new SplitText(fillTextElem.querySelector('[data-fillText="fill"]'), {type: "chars, words, lines", /* position: "absolute" */});


    // gsap.set(split.lines, {overflow: 'hidden'})
    gsap.set(splitFill.chars, {clipPath: 'inset(0% 0% 100% 0%)'})

    gsap.timeline({
      scrollTrigger: {
        trigger: fillTextElem,
        start: 'top center',
        // markers: true,
        toggleActions: "restart none none reverse",
        invalidateOnRefresh: true,
      }
    }).add('start')
    .to(splitFill.chars, {duration: 0.5, clipPath: 'inset(0% 0% 0% 0%)', stagger: {each: 0.035, ease: 'sine.out'}}, 'start')      
  }
}
