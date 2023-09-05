import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

export function fillText() {

  const fillTextElems = document.querySelectorAll('[data-fillText]')

  for (const fillTextElem of fillTextElems) {

    const splitOutline = new SplitText(fillTextElem.querySelector('[data-fillText="outline"]'), {type: "chars, words, lines"});

    const splitFill = new SplitText(fillTextElem.querySelector('[data-fillText="fill"]'), {type: "chars, words, lines"});

    gsap.from(splitFill.lines, {duration: 2.5, clipPath: 'inset(0% 100% 0% 0%)', ease: 'expo.out', scrollTrigger: {
      trigger: fillTextElem,
      start: 'top center',
      markers: true,
      toggleActions: "restart none none reverse",
      invalidateOnRefresh: true,
    }})
  }
}
