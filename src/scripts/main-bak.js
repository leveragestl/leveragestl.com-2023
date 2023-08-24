// Dependencies imports
import barba from "@barba/core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

// Animation imports
import { generalAnimations } from "./core/animation"
import { homeAnimations } from "./core/animation"

// =============================================================================
// Scripts
// =============================================================================

gsap.registerPlugin( ScrollTrigger, ScrollSmoother);

function contentAnimation() {
  let animGroups = document.querySelectorAll('[data-animGroup]')

  for (const animGroup of animGroups) {

    // Get all elems
    const animGroupElems = animGroup.querySelectorAll('[data-animElem]')

    // Define Timeline
    let animGroupTL = gsap.timeline({
      defaults: {
        duration: 1,
        delay: 0,
        ease: 'power2.out'
      },
      scrollTrigger: {
        trigger: animGroup,
        start: 'top center',
        markers: false
      }
    }).add('start')

    for (const [i, animGroupElem] of animGroupElems.entries()) {
      gsap.set(animGroupElem, {autoAlpha: 0, x: -50})
      animGroupTL.to(animGroupElem, {autoAlpha: 1, x: 0}, 'start')  
    }

  }

  /*
  gsap.set("[data-animation]", {
    opacity:0,
    y:-20
  });
  gsap.to("[data-animation]", {
    duration:.4,
    delay:0, 
    opacity:1, 
    x:0,
    scrollTrigger: {
      trigger: "[data-animation]",
      start: "top bottom-=400px",
    }
  });
  */
}

let position = 120

// history.scrollRestoration = "manual";
var scrollPosY = [0];

barba.hooks.enter((data) => {
  if(data.trigger !== "back") {
    scrollPosY.push(barba.history.current.scroll.y);
    window.scrollTo(0,0);
  } else {
    window.scrollTo(0, scrollPosY.pop())
  }
});

function init(){
  /*  
  // do something before the transition starts
  barba.hooks.before(() => {
  });

  // do something after the transition finishes
  barba.hooks.after(() => {
      ga('set', 'page', window.location.pathname);
      ga('send', 'pageview');
  });
  */

  // scroll to the top of the page
  barba.hooks.enter(() => {
      window.scrollTo(0, 0);
  });
  barba.init({
    transitions: [{
      name: 'slide-transition',
      once(data) {
        // contentAnimation()
        let animElemsExist = document.querySelector('[data-animElem]')
        // if (animElemsExist) {
        //   generalAnimations()
        // }
        homeAnimations()
      },
      async beforeLeave(data) {
        return gsap.set(data.current.container.querySelector('[data-transition-mask]'), {
          display: 'block'
        })
      },
      async leave(data) {
        return gsap.fromTo(data.current.container.querySelector('[data-transition-mask]'), {
          xPercent: () => (data.trigger == 'back') ? position : -position
        }, {
          xPercent: 0, duration: 0.35,
        })
      },
      async afterLeave(data) {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(function (trigger) {
            trigger.kill();
        })
        return gsap.set(data.current.container, {
          display: 'none'
        })
      },

      async beforeEnter(data) {
        return gsap.set(data.next.container.querySelector('[data-transition-mask]'), {
          display: 'block',
        });
      },
      async enter(data) {
        return gsap.fromTo(data.next.container.querySelector('[data-transition-mask]'), {
          xPercent: 0
        }, {
          duration: 0.35, delay: 0.15,
          xPercent: () => (data.trigger == 'back') ? -position : position
        })
      },
      async after(data) {
        // contentAnimation()
        let animElemsExist = document.querySelector('[data-animElem]')
        // if (animElemsExist) {
        //   generalAnimations()
        // }
        console.log(data.next.container.getAttribute('data-barba-namespace'));

        if (data.next.container.getAttribute('data-barba-namespace', 'home')) {
          homeAnimations()
        }
      }
    }]
  })
}

window.addEventListener('DOMContentLoaded', function () {
  init();
});