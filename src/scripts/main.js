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
import { quotesSlider, servicesSlider, staffSlider, imageCarousel } from './vendors/swiper'

// Animation
import { generalAnimations } from './animation/generalAnimations'
import { homeAnimations } from './animation/homeAnimations'
import { ctaAnimations } from './animation/ctaAnimations'
import { aboutAnimations } from './animation/aboutAnimations'
import { careersAnimations } from './animation/careersAnimations'
import { revealText } from './animation/revealText'
import { fillText, fillTextHover } from './animation/fillText'
import { parallaxColumns } from './animation/parallaxColumns'
import { parallaxWindow } from './animation/parallaxWindow'
import { drawSVG } from './animation/drawSVG'
import { pageTransitions } from './animation/pageTransitions'

// Header
import { siteHeader } from './core/siteHeader'
import { menuToggle, checkNav, openNav, closeNav, currentMenuItem } from './core/navPanel'

// Utils
import { linkHandler } from './utils/linkHandler'
import { videoHandler } from './utils/videoHandler'
import { initCursor, removeCursor } from './utils/cursor'
import { twoColumns } from './utils/arrangeColumns'
import { columnsTwo } from './utils/columnsTwo'

// Components
import { formsHandler } from './components/forms'
import { compareSwiper } from './components/compareSwiper'

// Vendors
import { mix } from './vendors/mix'
import { projectFilters } from './vendors/mix'

// =============================================================================
// Swup
// =============================================================================
import Swup from 'swup';
import SwupBodyClassPlugin from '@swup/body-class-plugin';

const swup = new Swup({
  plugins: [new SwupBodyClassPlugin()]
})

let timingOffset = 0
let runOnce = false

setTimeout(() => {
  timingOffset = 640
}, 500);

if (document.readyState === 'complete') {
  // setTimeout(() => init(), 50)
  init()
} else {
  document.addEventListener('DOMContentLoaded', () => init())
}
swup.hooks.on('page:view', (visit) => {
  init()
});

function unload() {
  ScrollTrigger.killAll()
  if (document.body.classList.contains('scrolled')) {
    document.body.classList.remove('scrolled')
  }

  runOnce = true  

  closeNav()
  removeCursor()
}
swup.hooks.before('content:replace', () => unload())

swup.hooks.on('animation:out:await', () => {
  document.documentElement.classList.add('is-transitioning')
})

swup.hooks.on('animation:in:start', () => {
  document.documentElement.classList.remove('is-transitioning')
})

// swup.hooks.on('animation:in:end', () => {
//   if (ScrollTrigger) {
//     ScrollTrigger.refresh()
//   }
// })

// document.addEventListener('DOMContentLoaded', () => init())

// =============================================================================
// Scripts
// =============================================================================

// ~~~~~~~~~~~~~~~~~ Init ~~~~~~~~~~~~~~~~ //

function smoothScroll() {
  let smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    // smoothTouch: 0.1,
    normalizeScroll: true
  })
}

function init() {
  smoothScroll()  
  siteHeader()
  linkHandler()
  menuToggle()
  initCursor()
  currentMenuItem()

  if (document.body.classList.contains('home')) {
    homeAnimations()
  }

  if (document.querySelector('[data-draw-svg="cta"]')) {
    ctaAnimations()
  }

  if (document.querySelector('[data-parallax="window"]')) {
    setTimeout(() => parallaxWindow(), timingOffset);
  }

  if (document.querySelector('[data-parallax="columns"]')) {
    parallaxColumns()
  }

  if (document.querySelector('[data-anim-elem]')) {
    generalAnimations()
  }

  if (document.querySelector('body.about')) {
    aboutAnimations()
  }

  if (document.querySelector('body.careers')) {
    careersAnimations()
  }

  if (document.querySelector('[data-draw-svg]')) {
    drawSVG()
  }
  
  if (document.querySelector('[data-slider="quotes"]')) {
    quotesSlider()
  }

  if (document.querySelector('[data-slider="staff"]')) {
    staffSlider()
  }

  if (document.querySelector('[data-slider="services"]')) {
    servicesSlider()
    window.addEventListener('resize', servicesSlider)
  }

  if (document.querySelector('[data-slider="image-carousel"]')) {
    imageCarousel()
  }

  if (document.querySelector('[data-compare-swiper]')) {
    compareSwiper()
  }

  if (document.querySelector('a')) {
    // pageTransitions()
  }

  if (document.querySelector('[data-video]')) {
    videoHandler()
  }

  if (document.querySelector('[data-hover="fillText"]')) {
    if (!runOnce) {
      fillTextHover() 
    }
  }

  if (document.querySelector('[data-arrange="2-columns"]')) {
    twoColumns()
  }

  // if (document.querySelector('.columns-two')) {
  //   columnsTwo()
  // }

  if (document.querySelector('#form')) {
    formsHandler()
  }

  if (document.querySelector('[data-mix]')) {
    mix()
  }

  if (document.querySelector('[data-filter]')) {
    projectFilters()
  }
}