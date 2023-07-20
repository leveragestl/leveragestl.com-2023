import barba from '@barba/core'
import { gsap } from 'gsap'

let percent = 120
let direction = 1
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

barba.init({
  transitions: [{
    name: 'opacity-transition',

    beforeLeave(data) {
      return gsap.set(data.current.container.querySelector('[data-transition-mask]'), {
        display: 'block'
      });
    },
    leave(data) {
      return gsap.fromTo(data.current.container.querySelector('[data-transition-mask]'), {
        xPercent: () => (data.trigger == 'back') ? position : -position
      }, {
        xPercent: 0, duration: 0.35
      });
    },
    afterLeave(data) {
      return gsap.set(data.current.container, {
        display: 'none'
      })
    },

    beforeEnter(data) {
      return gsap.set(data.next.container.querySelector('[data-transition-mask]'), {
        display: 'block',
      });
    },
    enter(data) {
      return gsap.fromTo(data.next.container.querySelector('[data-transition-mask]'), {
        xPercent: 0, duration: 0.35
      }, {
        xPercent: () => (data.trigger == 'back') ? -position : position
      })
    }
  }],
})