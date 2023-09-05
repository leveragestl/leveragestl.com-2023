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
  document.body.classList.remove('scrolled')
}
swup.hooks.before('content:replace', () => unload());

// =============================================================================
// Scripts
// =============================================================================

// ~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~ //

// Sliders
import { quotesSlider } from './vendors/swiper'

// Animation
import { generalAnimations } from './animation/generalAnimations'
import { homeAnimations } from './animation/homeAnimations'
import { ctaAnimations } from './animation/ctaAnimations'
import { revealText } from './animation/revealText'
import { fillText } from './animation/fillText'
import { parallaxColumns } from './animation/parallaxColumns'
import { parallaxWindow } from './animation/parallaxWindow'
import { drawSVG } from './animation/drawSVG'

// Header
import { siteHeader } from './core/siteHeader'

// ~~~~~~~~~~~~~~~~~ Init ~~~~~~~~~~~~~~~~ //

function smoothScroll() {
  let smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    // smoothTouch: 0.1,
  })
  
  let hashLinks = document.querySelectorAll('a[href^="#"]')
  
  for (const hashLink of hashLinks) {
    let target = hashLink.getAttribute('href')
    hashLink.setAttribute('href', 'javascript:void(0)')
    hashLink.setAttribute('data-hash', target)

    hashLink.addEventListener('click', (e) => {      
      e.preventDefault()
      smoother.scrollTo(target, true, 'top 50px')
    })
  }
  
  /*
  window.onload = (event) => {  
    let urlHash = window.location.href.split("#")[1]
  
    let scrollElem = document.querySelector("#" + urlHash)
    
    if (urlHash && scrollElem) {
      gsap.to(smoother, {
        scrollTop: smoother.offset(scrollElem, "top 50px"),
        duration: 1,
        delay: 0.5
      });
    }
  }
  */  
}

function init() {

  smoothScroll(); siteHeader()

  if (document.body.classList.contains('home')) {
    homeAnimations()
  }

  if (document.querySelector('[data-draw-svg="cta"]')) {
    ctaAnimations()
  }

  // if (document.querySelector('[data-fillText]')) {
  //   fillText()
  // }

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
}