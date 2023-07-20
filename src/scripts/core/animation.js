// GSAP
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(Flip, ScrollTrigger, SplitText);

let mm = gsap.matchMedia();

// =============================================================================
// General
// =============================================================================
export function generalAnimations() {
  console.log('hi from generalAnimations');
  mm.add("(min-width: 1023.98px)", () => {

    // ~~~~~~~~~~~ Animation Groups ~~~~~~~~~~ //
    let animGroups = document.querySelectorAll('[data-animGroup]')

    for (const animGroup of animGroups) {
      // Get all elems
      let animGroupElems = animGroup.querySelectorAll('[data-animElem]')

      // Set Defaults
      let animGroupStarts = 'top center'
      let animGroupEase = 'power2.out'
      let animGroupDelay = 0
      let animGroupMarkers = false
      let animGroupStagger = 0
      let animGroupDuration = 1

      // Get Group Data attributes
      if (animGroup.hasAttribute('data-animStarts')) {
        animGroupStarts = animGroup.getAttribute('data-animStarts')
      }
      if (animGroup.hasAttribute('data-animEase')) {
        animGroupEase = animGroup.getAttribute('data-animEase')
      }
      if (animGroup.hasAttribute('data-animDelay')) {
        animGroupDelay = animGroup.getAttribute('data-animDelay')
      }
      if (animGroup.hasAttribute('data-animMarkers')) {
        animGroupMarkers = true
      }
      if (animGroup.hasAttribute('data-animStagger')) {
        animGroupStagger = animGroup.getAttribute('data-animStagger')
      }
      if (animGroup.hasAttribute('data-animDuration')) {
        animGroupDuration = animGroup.getAttribute('data-animDuration')
      }

      // Define Timeline
      let animGroupTL = gsap.timeline({
        defaults: {
          duration: animGroupDuration,
          delay: animGroupDelay,
          ease: animGroupEase
        },
        scrollTrigger: {
          trigger: animGroup,
          start: animGroupStarts,
          markers: animGroupMarkers
        }
      }).add('start')

      // -------- Effects ------- //
      // fadeInUp
      if (animGroup.getAttribute('data-animEffect') == 'fadeInUp') {
        for (const [i, animGroupElem] of animGroupElems.entries()) {

          gsap.set(animGroupElem, {autoAlpha: 0, y: 50})
          animGroupTL.to(animGroupElem, {autoAlpha: 1, y: 0}, 'start')  
        }
      }

      // fadeInRight
      if (animGroup.getAttribute('data-animEffect') == 'fadeInRight') {
        for (const [i, animGroupElem] of animGroupElems.entries()) {

          let offset = animGroupStagger * (i + 1)

          gsap.set(animGroupElem, {autoAlpha: 0, x: -50})
          animGroupTL.to(animGroupElem, {autoAlpha: 1, x: 0}, 'start+='+offset)  
        }
      }
      // fadeInLeft
      if (animGroup.getAttribute('data-animEffect') == 'fadeInLeft') {
        for (const [i, animGroupElem] of animGroupElems.entries()) {

          let offset = animGroupStagger * (i + 1)

          gsap.set(animGroupElem, {autoAlpha: 0, x: 50})
          animGroupTL.to(animGroupElem, {autoAlpha: 1, x: 0}, 'start+='+offset)  
        }
      }

    }

    // ~~~~~~~~ Animation One-offs ~~~~~~~~ //
    let animElems = document.querySelectorAll('[data-animElem]')
    for (const animElem of animElems) {
      // Only want animElems that aren't part of a group
      if (!animElem.closest('[data-animGroup]')) return
    }
  })
}

// =============================================================================
// Hero Animation
// =============================================================================
export function heroAnimation() {
  const heroSection = document.querySelector('#hero-section')
  const logoPrimaries = gsap.utils.toArray('#logo svg .primary-color')
  const menuIcon = document.querySelector('.menu-icon')
  const menuItems = gsap.utils.toArray('#nav-primary li.menu-item')
  const headline = document.querySelector('#hero-headline')
  const subhead = document.querySelector('#hero-subhead')

  const heroMask = document.createElement('div')
  heroMask.id = 'hero-mask'
  heroMask.classList.add('bg-white', 'w-full', 'h-full', 'col-start-first', 'col-end-last', 'row-start-first', 'row-end-last', 'z-10')
  heroSection.appendChild(heroMask)

  const heroAnimationTL = gsap.timeline({
    defaults: {
      duration: 1,
      delay: 2,
      ease: 'power2.out',
    }
  }).add('start')

  heroAnimationTL.to(heroMask, {yPercent: -100}, 'start')
  heroAnimationTL.to([subhead, headline, menuItems], {color: 'white'}, 'start')
  heroAnimationTL.to(logoPrimaries, {fill: 'white'}, 'start')

  let scrolled = document.scrollingElement.scrollTop;
  let position = document.querySelector('body').offsetTop;
  if( scrolled < position + 10 ) {
    menuIcon.classList.add('menu-icon--blue')

    setTimeout(() => {
      menuIcon.classList.remove('menu-icon--blue')
    }, 1000);
  }
}

// =============================================================================
// Home Animations
// =============================================================================
export function homeAnimations() {
  console.log('hi from homeAnimations');
  // ~~~~~~~~~~~~~~~~~ Home ~~~~~~~~~~~~~~~~ //
  gsap.from('#hero', {duration: 1, y: 50, autoAlpha: 0})  
  gsap.from('#introText .highlight-gold', {duration: 0.75, ease: 'power4.easeIn', backgroundSize: '100% 0.5em, 0% 0.5em', scrollTrigger: {trigger: '#introText', start: 'top center'}})
  /*
  if (document.querySelector('main[data-barba-namespace="home"]')) {
    const homeMain = document.querySelector('main[data-barba-namespace="home"]');
    const hero = homeMain.querySelector('#hero');

    gsap.from(hero, {duration: 1, autoAlpha: 0})  
  }
  */
  /*
  // ~~~~~~~~~~~~~~~~ About ~~~~~~~~~~~~~~~~ //
  const aboutSection = document.querySelector('#about-section')
  const aboutHeadline = aboutSection.querySelector('#about-headline')
  const aboutSubhead = aboutSection.querySelector('#about-subhead')
  const aboutContent = aboutSection.querySelector('.content-block')

  gsap.set([aboutHeadline, aboutSubhead, aboutContent], {autoAlpha: 0, x: -50})

  const aboutAnimationTL = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power2.out'
    },
    scrollTrigger: {
      trigger: aboutSection,
      start: 'top 60%'
    }
  }).add('start')

  aboutAnimationTL.to([aboutHeadline, aboutSubhead, aboutContent], {autoAlpha: 1, x: 0, stagger: 0.15})
  */
}

// =============================================================================
// About Animations
// =============================================================================
export function aboutAnimations() {
  gsap.from('#hero', {duration: 1, y: 50, autoAlpha: 0})
}

// =============================================================================
// Scroll Curve
// =============================================================================
export function scrollCurveAnimation() {

    const scrollCurveElem = document.querySelector('#scroll-curve')
    
    let scrollCurveAnimTL = gsap.timeline({
      scrollTrigger: {
        trigger: scrollCurveElem,
        start: 'top 70%',
        // end: (window.innerHeight / 2) +' top',
        toggleActions: "play pause resume reverse",
        // scrub: true,
      }
    }).add('start')

    scrollCurveAnimTL.to(scrollCurveElem, {duration: 0.5, ease: 'power1.out', scaleY: 1.2})
    scrollCurveAnimTL.to(scrollCurveElem, {duration: 2, ease: 'power4.out', scaleY: 0})

}