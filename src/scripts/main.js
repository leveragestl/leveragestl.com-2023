// =============================================================================
// GSAP
// =============================================================================

import {gsap} from 'gsap'
import { ScrollTrigger, SplitText, ScrollSmoother, DrawSVGPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, DrawSVGPlugin)

// =============================================================================
// Imports
// =============================================================================

// Sliders
import { quotesSlider } from './vendors/swiper'

// Animation
import { generalAnimations } from './animation/generalAnimations'
import { homeAnimations } from './animation/homeAnimations'
import { ctaAnimations } from './animation/ctaAnimations'
import { revealText } from './animation/revealText'
import { parallaxColumns } from './animation/parallaxColumns'
import { parallaxWindow } from './animation/parallaxWindow'
import { drawSVG } from './animation/drawSVG'
import { pageTransitions } from './animation/pageTransitions'

// Header
import { siteHeader } from './core/siteHeader'
import { menuToggle, checkNav, openNav, closeNav } from './core/navPanel'

// Utils
import { linkHandler } from './utils/linkHandler'
import { videoHandler } from './utils/videoHandler'
import { cursor } from './utils/cursor'

// =============================================================================
// Swup
// =============================================================================
/*
import Swup from 'swup';
import SwupBodyClassPlugin from '@swup/body-class-plugin';

const swup = new Swup({
  plugins: [new SwupBodyClassPlugin()]
});

if (document.readyState === 'complete') {
  // setTimeout(() => init(), 50)
  init()
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}
swup.hooks.on('page:view', () => init());

function unload() {
  ScrollTrigger.killAll()
  if (document.body.classList.contains('scrolled')) {
    document.body.classList.remove('scrolled')
  }

  closeNav()
}
swup.hooks.before('content:replace', () => unload())
*/
// =============================================================================
// Scripts
// =============================================================================

// ~~~~~~~~~~~~~~~~~ Init ~~~~~~~~~~~~~~~~ //

function smoothScroll() {
  let smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    // smoothTouch: 0.1,
  })
}

function init() {

  if (window.matchMedia('(pointer: fine)').matches) {
    smoothScroll()
  }
  
  siteHeader()
  linkHandler()
  menuToggle()
  cursor()

  if (document.body.classList.contains('home')) {
    homeAnimations()
  }

  if (document.querySelector('[data-draw-svg="cta"]')) {
    ctaAnimations()
  }

  if (document.querySelector('[data-parallax="window"]')) {
    parallaxWindow()
  }

  if (document.querySelector('[data-parallax="columns"]')) {
    parallaxColumns()
  }

  if (document.querySelector('[data-anim-elem]')) {
    generalAnimations()
  }

  if (document.querySelector('[data-draw-svg]')) {
    drawSVG()
  }

  if (document.querySelector('[data-slider="quotes"]')) {
    quotesSlider()
  }

  if (document.querySelector('a')) {
    // pageTransitions()
  }

  if (document.querySelector('[data-video]')) {
    videoHandler()
  }
}

document.addEventListener('DOMContentLoaded', () => init())