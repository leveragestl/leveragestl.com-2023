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

  // ~~~~~~~~~~ Animation Effects ~~~~~~~~~~ //
  function animationEffect(elem, tl, timing) {

    // fadeInUp
    if (elem.getAttribute('data-anim-elem') == "fadeInUp") {
      tl.from(elem, {ease: 'power1.out', duration: 1, y: 20, autoAlpha: 0}, timing)
    }

    // revealText
    if (elem.getAttribute('data-anim-elem') == "revealText") {
      const split = new SplitText(elem, {type: "chars, words, lines"});

      gsap.set(split.lines, {overflow: 'hidden'})
      gsap.set(split.words, {yPercent: 200})

      tl.to(split.words, {duration: 1, yPercent: 0, ease: CustomEase.create("easeName", "0, 0, 0, 1"), stagger: {each: 0.035, ease: 'sine.out'}}, timing)  
    }

    // fillText
    if (elem.getAttribute('data-anim-elem') == "fillText") {
    
      const splitOutline = new SplitText(elem.querySelector('[data-filltext="outline"]'), {type: "chars, words, lines", linesClass: 'fillText__line', wordsClass: 'fillText__word', charsClass: 'fillText__char++'});
  
      const splitFill = new SplitText(elem.querySelector('[data-filltext="fill"]'), {type: "chars, words, lines", linesClass: 'fillText__line', wordsClass: 'fillText__word', charsClass: 'fillText__char++'});


      const durDefault = 1
      const dur = (splitFill.chars.length * 0.1 > durDefault) ? splitFill.chars.length * 0.1 : durDefault

      elem.setAttribute('data-duration', dur);
    
      tl.from(splitFill.lines, {duration: dur, ease: 'expo.out', clipPath: 'inset(0% 100% 0% 0%)', stagger: dur / 3})
    }
  }

  // ~~~~~~~~ Individual Animations ~~~~~~~~ //
  function indivAnimations() {
    let animElems = document.querySelectorAll('[data-anim-elem]')

    for (const animElem of animElems) {
      if (!animElem.closest('[data-anim-group]')) {

        // Start
        let animStart = 'top 75%' 
        if (window.matchMedia('(max-width: 1023.98px)').matches) {
          animStart = 'top bottom'
        }
        if (animElem.hasAttribute('data-anim-start')) {
          animStart = animElem.getAttribute('data-anim-start')
        }

        // Markers
        let animMarkers = false
        if (animElem.hasAttribute('data-anim-markers')) {
          animMarkers = animElem.getAttribute('data-anim-markers')
        }

        const animElemTL = gsap.timeline({
          defaults: {
            duration: 1,
            ease: 'none'
          },
          scrollTrigger: {
            trigger: animElem,
            start: animStart,
            markers: animMarkers,
            toggleActions: 'restart none none reverse'
          }
        })
  
        animationEffect(animElem, animElemTL) 
      }
    } 
  }

  indivAnimations()

  // ~~~~~~~~~~~ Group Animations ~~~~~~~~~~ //
  function groupAnimations() {
    let animGroups = document.querySelectorAll('[data-anim-group]')

    for (const animGroup of animGroups) { 

      // Start
      let animStart = 'top 75%' 
      if (window.matchMedia('(max-width: 1023.98px)').matches) {
        animStart = 'top bottom'
      }
      if (animGroup.hasAttribute('data-anim-start')) {
        animStart = animGroup.getAttribute('data-anim-start')
      }

      // Markers
      let animMarkers = false
      if (animGroup.hasAttribute('data-anim-markers')) {
        animMarkers = animGroup.getAttribute('data-anim-markers')
      }

      const animGroupTL = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'none'
        },
        scrollTrigger: {
          trigger: animGroup,
          start: animStart,
          markers: animMarkers,
          toggleActions: 'restart none none reverse'
        }
      })

      let animElems = animGroup.querySelectorAll('[data-anim-elem]')
  
      for (const animElem of animElems) {

        // Timing
        let animTiming
        if (animGroup.hasAttribute('data-anim-timing')) {
          animTiming = animGroup.getAttribute('data-anim-timing')
        }
        if (animElem.hasAttribute('data-anim-timing')) {
          animTiming = animElem.getAttribute('data-anim-timing')
        }

        animationEffect(animElem, animGroupTL, animTiming)
      }
    } 
  }

  groupAnimations()

}

export function fillTextHover() {
  if (elem.getAttribute('data-hover') == "fillText") {

    const splitOutline = new SplitText(elem.querySelector('[data-filltext="outline"]'), {type: "chars, words, lines", linesClass: 'fillText__line', wordsClass: 'fillText__word', charsClass: 'fillText__char++'});

    const splitFill = new SplitText(elem.querySelector('[data-filltext="fill"]'), {type: "chars, words, lines", linesClass: 'fillText__line', wordsClass: 'fillText__word', charsClass: 'fillText__char++'});
  }
}