// =============================================================================
// GSAP
// =============================================================================

import {gsap} from 'gsap'
import { ScrollTrigger, SplitText, ScrollSmoother } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother)

// =============================================================================
// Swup
// =============================================================================

import Swup from 'swup';
const swup = new Swup();

if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}
swup.hooks.on('page:view', () => init());

function unload() {
  ScrollTrigger.killAll()
  document.body.classList.remove('scrolled')
}
swup.hooks.before('content:replace', () => unload());

// =============================================================================
// Scripts
// =============================================================================

// ~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~ //

// Animation
import { generalAnimations, heroAnimation, homeAnimations, aboutAnimations, revealText, fillText } from './core/animation';

// ~~~~~~~~~~~~~~~~~ Init ~~~~~~~~~~~~~~~~ //

function init() {
  ScrollSmoother.create({
    smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    // smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });

  if (document.querySelector('[data-barba-namespace="home"]')) {
    setTimeout(() => homeAnimations(), 50);
  }
  if (document.querySelector('[data-revealText]')) {
    setTimeout(() => revealText(), 50);
  }

  if (document.querySelector('[data-fillText]')) {
    setTimeout(() => fillText(), 50);
  }

  /*
  if (document.querySelector('[data-animElem]')) {
    generalAnimations()
  }

  if (document.querySelector('#hero')) {
    heroAnimation()
  }
  */
  /*
  if (document.querySelector('#swup[data-barba-namespace="about"]')) {
    aboutAnimations()
  }
  */

}