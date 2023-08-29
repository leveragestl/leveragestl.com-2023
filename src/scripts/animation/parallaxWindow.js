import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

let mm = gsap.matchMedia();

export function parallaxWindow() {

  mm.add("(min-width: 1023.98px)", () => {

    gsap.utils.toArray('[data-parallax="window"]').forEach((elem, i) => {
      elem.fig = elem.querySelector('figure'); 

      gsap.fromTo(elem.fig, {
        yPercent: () => -50
      }, {
        yPercent: () => 50,
        ease: "linear",
        scrollTrigger: {
          trigger: elem,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true, // to make it responsive
          // markers: true,
        }
      })
    })

  })
}