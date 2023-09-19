import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

export function fillText() {

  const fillTextElems = document.querySelectorAll('[data-filltext]')

  for (const fillTextElem of fillTextElems) {

    const splitOutline = new SplitText(fillTextElem.querySelector('[data-filltext="outline"]'), {type: "chars, words, lines"});

    const splitFill = new SplitText(fillTextElem.querySelector('[data-filltext="fill"]'), {type: "chars, words, lines"});

    gsap.from(splitFill.lines, {duration: 2.5, clipPath: 'inset(0% 100% 0% 0%)', ease: 'expo.out', scrollTrigger: {
      trigger: fillTextElem,
      start: 'top center',
      markers: true,
      toggleActions: "restart none none reverse",
      invalidateOnRefresh: true,
    }})
  }
}

export function fillTextHover() {
  const fillTextElems = document.querySelectorAll('[data-hover="fillText"]')

  for (const fillTextElem of fillTextElems) {
    const splitOutline = new SplitText(fillTextElem.querySelector('[data-filltext="outline"]'), {type: "chars, words, lines", linesClass: 'fillText__line', wordsClass: 'fillText__word', charsClass: 'fillText__char++'});

    const splitFill = new SplitText(fillTextElem.querySelector('[data-filltext="fill"]'), {type: "chars, words, lines", linesClass: 'fillText__line', wordsClass: 'fillText__word', charsClass: 'fillText__char++'});
  }
}