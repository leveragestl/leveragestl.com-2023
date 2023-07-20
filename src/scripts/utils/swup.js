import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';


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

// Animation Imports
import { generalAnimations, homeAnimations, aboutAnimations } from '../core/animation';

// Run once when page loads
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

// Run after every additional navigation by swup
swup.on('pageView', () => init());

function unload() {
  if (document.querySelector('#carousel')) {
    // carousel.destroy()
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(function (trigger) {
        trigger.kill();
    })
  }
}

swup.on('willReplaceContent', () => unload());

function init() {
  if (document.querySelector('#carousel')) {
    // new Carousel('#carousel')
  }

  if (document.querySelector('#lightbox')) {
    // $('#lightbox').lightbox()
  }

  if (document.querySelector('#something-else')) {
    // and so on
  }

  if (document.querySelector('[data-animElem]')) {
    generalAnimations()
  }

  if (document.querySelector('#swup[data-barba-namespace="home"]')) {
    homeAnimations()
  }

  if (document.querySelector('#swup[data-barba-namespace="about"]')) {
    aboutAnimations()
  }
}