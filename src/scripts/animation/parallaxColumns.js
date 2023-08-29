import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

let mm = gsap.matchMedia();

export function parallaxColumns() {

  mm.add("(min-width: 1023.98px)", () => {
    const parallaxColumnElems = document.querySelectorAll('[data-parallax="columns"]')

    for (const parallaxColumnElem of parallaxColumnElems) {

      // const oddElems = parallaxColumnElem.querySelectorAll('.workTile:nth-of-type(odd)')
      // const evenElems = parallaxColumnElem.querySelectorAll('.workTile:nth-of-type(even)')

      gsap.timeline({
        scrollTrigger: {
          trigger: parallaxColumnElem,
          start: 'top center',
          end: '100%',
          scrub: true,
          // markers: true,
          toggleActions: "restart none none reverse"
        }
      }).add('start')

      .to('.workTile:nth-of-type(even)', {y: '-=150'}, 'start')  
      .to('.workTile:nth-of-type(odd)', {y: '+=150'}, 'start')  
    }
  })
}