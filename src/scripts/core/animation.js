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
  // gsap.fromTo('.hero', {y: 50, autoAlpha: 0}, {duration: 1, autoAlpha: 1, y: 0})
}

// =============================================================================
// Home Animations
// =============================================================================
export function homeAnimations() {
  // ~~~~~~~~~~~~~~~~~ Hero ~~~~~~~~~~~~~~~~ //
  // gsap.fromTo('#hero', {y: 50, autoAlpha: 0}, {duration: 1, autoAlpha: 1, y: 0})
  // gsap.from('#introText .highlight-gold', {duration: 0.75, ease: 'power4.easeIn', backgroundSize: '100% 0.5em, 0% 0.5em', scrollTrigger: {trigger: '#introText', start: 'top center'}})

  mm.add("(min-width: 1023.98px)", () => {
    const pinHeroTL = gsap.timeline({
      defaults: {
        ease: 'none',
        duration: 1
      },
      scrollTrigger: {
        start: 'top top',
        trigger: '#home_hero',
        pin: '#home_hero',
        scrub: true,
        end: '100%',
        // anticipatePin: 1,
        // markers: true,
      }
    })
    pinHeroTL.to('video', {y: 0})

  })
  
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
  // gsap.fromTo('#hero', {y: 50, autoAlpha: 0}, {duration: 1, autoAlpha: 1, y: 0})
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