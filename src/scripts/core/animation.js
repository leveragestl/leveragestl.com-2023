// GSAP
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

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

  // ~~~~~~~~~~~~~~~ Hero Pin ~~~~~~~~~~~~~~ //
  mm.add("(min-width: 1023.98px)", () => {
    const heroElem = document.querySelector('[data-pin="hero"]')
    const pinHeroTL = gsap.timeline({
      defaults: {
        ease: 'none',
        duration: 1
      },
      scrollTrigger: {
        start: 'top top',
        trigger: '[data-pin="hero"]',
        pin: '[data-pin="hero"]',
        scrub: true,
        // end: '150%',
        pinSpacing: false,
        preventOverlaps: false,
        // anticipatePin: 1,
        // markers: true,
      }
    }).add('start')

    // pinHeroTL
      .to('#home_hero-inner', {/* duration: 0.5, */ yPercent: '-=60'}, 'start')
      .to('video', {/* duration: 0.5, */ yPercent: '-=75'}, 'start')

    // window.addEventListener('resize', () => {pinHeroTL.progress(0)})

    // document.addEventListener('DOMContentLoaded', () => pinHeroTL.progress(0));
    // document.querySelector('#content').style.marginTop = (heroElem.offsetHeight * -0.75)+'px'      

  })

  // ~~~~~~~~~~~~~ Services Pin ~~~~~~~~~~~~ //
  let triggerOffset = 100

  mm.add("(min-height: 1024px)", () =>  {
    triggerOffset = -100
  })

  mm.add("(min-width: 1023.98px)", () => {

    // Scenes 
    const scenes = gsap.utils.toArray('[data-scene="container"]');
    // const scenesElem = document.querySelector('[data-pin="services"]');
  
    const sceneElem = document.querySelector('[data-scene="container"]');
    const sceneElemHeight = sceneElem.offsetHeight;

    // const height = ((scenes.length) * sceneElemHeight) + 'px';

    const pinServicesTL = gsap.timeline({
      scrollTrigger: {
        start: 'top+='+triggerOffset+'px top',
        trigger: '[data-pin="services"]',
        pin: '[data-pin="services"]',
        scrub: true,
        end: '300%',
        fastScrollEnd: true,
        // markers: true
      }
    }).add('start')

    // Set all scene components to autoAlpha: 0
    gsap.set('[data-scene="content"]', {autoAlpha: 0, zIndex: 0, y: 10})
    gsap.set('[data-scene="image"]', {autoAlpha: 0, zIndex: 0})

    // Set first scene components to autoAlpha: 1
    gsap.set('[data-scene="container"]:first-of-type [data-scene="content"], [data-scene="container"]:first-of-type [data-scene="image"]', {autoAlpha: 1, zIndex: 1})

    pinServicesTL
      // Branding
      .addLabel('branding')

      .set('[data-scene="container"]#branding [data-scene="content"]', {autoAlpha: 1, zIndex: 1, y: 0})
      .set('[data-scene="container"]#branding [data-scene="image"]', {autoAlpha: 1, zIndex: 2})

      .set('[data-scene="container"]#branding [data-scene="content"]', {zIndex: 0}, 'branding+=1.5')
      .to('[data-scene="container"]#branding [data-scene="content"]', {autoAlpha: 0, y: 10}, 'branding+=1.5')

      .set('[data-scene="container"]#websites [data-scene="image"]', {autoAlpha: 1, zIndex: 1}, 'branding')
      .to('[data-scene="container"]#branding [data-scene="image"]', {clipPath: 'inset(0% 0% 100% 0%)'}, 'branding+=1.5')

      // Websites
      .removeLabel('branding').addLabel('websites')

      .set('[data-scene="container"]#websites [data-scene="content"]', {zIndex: 1})
      .set('[data-scene="container"]#websites [data-scene="image"]', {autoAlpha: 1, zIndex: 2})
      .to('[data-scene="container"]#websites [data-scene="content"]', {autoAlpha: 1, y: 0})

      .set('[data-scene="container"]#websites [data-scene="content"]', {zIndex: 0}, 'websites+=1.5')
      .to('[data-scene="container"]#websites [data-scene="content"]', {autoAlpha: 0, y: 10}, 'websites+=1.5')
      
      .set('[data-scene="container"]#marketing [data-scene="image"]', {autoAlpha: 1, zIndex: 1}, 'websites')
      .to('[data-scene="container"]#websites [data-scene="image"]', {clipPath: 'inset(0% 0% 100% 0%)'}, 'websites+=1.5')
      
      // Marketing
      .removeLabel('websites').addLabel('marketing')
      .set('[data-scene="container"]#marketing [data-scene="content"]', {zIndex: 1})
      .to('[data-scene="container"]#marketing [data-scene="content"]', {autoAlpha: 1, y: 0})
  })
}

// =============================================================================
// Reveal Text
// =============================================================================

export function revealText() {

  const revealTextElems = document.querySelectorAll('[data-revealText]')

  for (const revealTextElem of revealTextElems) {
    const split = new SplitText(revealTextElem, {type: "chars, words, lines", /* position: "absolute" */});

    gsap.set(split.lines, {overflow: 'hidden'})
    gsap.set(split.words, {yPercent: 200})

    gsap.timeline({
      scrollTrigger: {
        trigger: revealTextElem,
        start: 'top center',
        // markers: true ,
        toggleActions: "restart none none reverse"
      }
    }).add('start')
    // cubic-bezier(0.01,-0.67,0,1);
    .to(split.words, {duration: 1, yPercent: 0, /* clipPath: 'inset(100% 0% 0% 0%)', */ ease: CustomEase.create("easeName", "0, 0, 0, 1"), stagger: {each: 0.035, ease: 'sine.out'}}, 'start')      
  }
}

// =============================================================================
// Fill Text
// =============================================================================

export function fillText() {

  const fillTextElems = document.querySelectorAll('[data-fillText]')

  for (const fillTextElem of fillTextElems) {
    const splitOutline = new SplitText(fillTextElem.querySelector('[data-fillText="outline"]'), {type: "chars, words, lines", /* position: "absolute" */});

    const splitFill = new SplitText(fillTextElem.querySelector('[data-fillText="fill"]'), {type: "chars, words, lines", /* position: "absolute" */});


    // gsap.set(split.lines, {overflow: 'hidden'})
    gsap.set(splitFill.chars, {clipPath: 'inset(0% 0% 100% 0%)'})

    gsap.timeline({
      scrollTrigger: {
        trigger: fillTextElem,
        start: 'top center',
        // markers: true
        toggleActions: "restart none none reverse"
      }
    }).add('start')
    // cubic-bezier(0.01,-0.67,0,1);
    .to(splitFill.chars, {duration: 0.5, clipPath: 'inset(0% 0% 0% 0%)', /* ease: CustomEase.create("easeName", "0, 0, 0, 1"), */ stagger: {each: 0.035, /* from: 'random', */ ease: 'sine.out'}}, 'start')      
  }
}

export function parallaxColumns() {

  mm.add("(min-width: 1023.98px)", () => {
    const parallaxColumnElems = document.querySelectorAll('[data-parallax="columns"]')

    for (const parallaxColumnElem of parallaxColumnElems) {

      // const oddElems = parallaxColumnElem.querySelectorAll('.workTile:nth-of-type(odd)')
      // const evenElems = parallaxColumnElem.querySelectorAll('.workTile:nth-of-type(even)')

      gsap.timeline({
        scrollTrigger: {
          trigger: parallaxColumnElem,
          start: 'top center',
          end: '100%',
          scrub: true,
          // markers: true,
          toggleActions: "restart none none reverse"
        }
      }).add('start')

      .to('.workTile:nth-of-type(even)', {y: '-=150'}, 'start')  
      .to('.workTile:nth-of-type(odd)', {y: '+=150'}, 'start')  
    }
  })
}

// =============================================================================
// About Animations
// =============================================================================
export function aboutAnimations() {
  // gsap.fromTo('#hero', {y: 50, autoAlpha: 0}, {duration: 1, autoAlpha: 1, y: 0})
}