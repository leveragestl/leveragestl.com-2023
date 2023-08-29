// =============================================================================
// GSAP
// =============================================================================

import {gsap} from 'gsap'
import { ScrollTrigger, SplitText, ScrollSmoother, DrawSVGPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, DrawSVGPlugin)

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
import { generalAnimations } from './animation/generalAnimations';
import { homeAnimations } from './animation/homeAnimations';
import { revealText } from './animation/revealText';
import { fillText } from './animation/fillText';
import { parallaxColumns } from './animation/parallaxColumns';
import { parallaxWindow } from './animation/parallaxWindow';
import { drawSVG } from './animation/drawSVG';

// Header
import { siteHeader } from './core/siteHeader';

// ~~~~~~~~~~~~~~~~~ Init ~~~~~~~~~~~~~~~~ //

function init() {
  ScrollSmoother.create({
    smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    // smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });

  siteHeader()

  if (document.querySelector('[data-barba-namespace="home"]')) {
    setTimeout(() => homeAnimations(), 50);
  }

  if (document.querySelector('[data-fillText]')) {
    setTimeout(() => fillText(), 50);
  }

  if (document.querySelector('[data-parallax="window"]')) {
    setTimeout(() => parallaxWindow(), 50);
  }

  if (document.querySelector('[data-parallax="columns"]')) {
    setTimeout(() => parallaxColumns(), 50);
  }

  if (document.querySelector('[data-anim-elem]')) {
    setTimeout(() => generalAnimations(), 50);
  }

  if (document.querySelector('[data-draw-svg]')) {
    setTimeout(() => drawSVG(), 50);
  }
  /*
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