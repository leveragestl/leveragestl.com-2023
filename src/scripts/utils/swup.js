import Swup from 'swup';
// import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';

import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const swup = new Swup();

/*
const swup = new Swup({
  skipPopStateHandling: (event) => event.state?.source !== 'swup',
  animateHistoryBrowsing: true,
  plugins: [
    new SwupScrollPlugin({
      doScrollingRightAway: false,
      animateScroll: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : {
        betweenPages: false,
        samePageWithHash: true,
        samePage: true
      }
    })
  ]
});
*/
let triggersExist = false

// Animation Imports
import { generalAnimations, heroAnimation, homeAnimations, aboutAnimations } from '../core/animation';
import { siteHeader } from '../core/siteHeader';

// Run once when page loads
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}
// Run after every additional navigation by swup
swup.hooks.on('page:view', () => init());

function unload() {
  // const triggers = ScrollTrigger.getAll();
  // if (triggers) {
  //   triggers.forEach((trigger) => {
  //     trigger.kill();
  //   })
  // }
  ScrollTrigger.killAll()
  document.body.classList.remove('scrolled')
}
swup.hooks.before('content:replace', () => unload());

function init() {

  if (document.querySelector('#carousel')) {
    // new Carousel('#carousel')
  }

  if (document.querySelector('#lightbox')) {
    // $('#lightbox').lightbox()
  }

  if (document.querySelector('#site-header')) {
    siteHeader()
  }
  /*
  if (document.querySelector('[data-animElem]')) {
    generalAnimations()
  }

  if (document.querySelector('#hero')) {
    heroAnimation()
  }
  */
  if (document.querySelector('[data-barba-namespace="home"]')) {
    setTimeout(() => homeAnimations(), 50);
  }
  /*
  if (document.querySelector('#swup[data-barba-namespace="about"]')) {
    aboutAnimations()
  }
  */

  // heroAnimation()

}