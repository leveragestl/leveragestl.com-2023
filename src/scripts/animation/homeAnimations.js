import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();
/*
function setIntroSpacing() {
  let videoHeight = document.querySelector('video').offsetHeight
  document.querySelector('#intro').style.marginTop = `${videoHeight}px`
}

document.addEventListener('DOMContentLoaded', setIntroSpacing)
window.addEventListener('resize', setIntroSpacing)
*/

export function homeAnimations() {
  // ~~~~~~~~~~~~~~~~~ Hero ~~~~~~~~~~~~~~~~ //
  gsap.set('#hero .wrapperCap--top', {autoAlpha: 1, rotate: 0, y: '15vw'})

  const heroAnimationTL = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-hero-text]',
      start: 'top 75%',
      toggleActions: 'restart none none reverse',
      fastScrollEnd: true
    }
  }).addLabel('start')

  heroAnimationTL
    .to('[data-hero-text] > *', {duration: 1, y: 0}, '+=1')
    .to('#hero .wrapperCap--top', {duration: 1.5, ease: 'expo.out', yPercent: -50, rotate: -6.88}, '<')
    // .to('#intro', {y: 0}, '<')
    // .to('#hero-inner', {duration: 1, height: '90vh'}, '<')
    .to('#hero video', {duration: 1, autoAlpha: 1, y: 0}, '-=0.75')

  // ~~~~~~~~~~~~~~~ Hero Pin ~~~~~~~~~~~~~~ //
  mm.add("(min-width: 1023.98px)", () => {
    gsap.set('#hero .video-container', {y: '45vh'})
    gsap.set('#hero video', {y: 50})
  

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
        // end: '50%',
        // pinSpacing: false,
        // preventOverlaps: false,
        // anticipatePin: 1,
        // markers: true,
      }
    }).add('start')

    pinHeroTL
      .to('.home #hero-inner', {yPercent: '-=35'}, 'start')
      .to('.video-container', {y: 0}, 'start')
  })

  // ~~~~~~~~~~~~~ Services Pin ~~~~~~~~~~~~ //

  mm.add("(min-width: 1024px)", () => {

    // Scenes 
    const scenes = gsap.utils.toArray('[data-scene="container"]');
    // const scenesElem = document.querySelector('[data-pin="services"]');
  
    const sceneElem = document.querySelector('[data-scene="container"]');
    const sceneElemHeight = sceneElem.offsetHeight;

    const offset = getComputedStyle(document.body).getPropertyValue('--site-header-height')

    // const height = ((scenes.length) * sceneElemHeight) + 'px';

    const pinServicesTL = gsap.timeline({
      scrollTrigger: {
        start: `top top+=${offset}px`,
        // start: 'top top',
        trigger: '[data-pin="services"]',
        pin: '[data-pin="services"]',
        scrub: true,
        end: '150%',
        fastScrollEnd: true,
        snap: {
          snapTo: [0.01, 0.5, 0.99],
          delay: 0,
          directional: false
        },
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

      .set('[data-scene="container"]#branding [data-scene="content"]', {zIndex: 0}, 'branding+=0.5')
      .to('[data-scene="container"]#branding [data-scene="content"]', {autoAlpha: 0, y: 10}, 'branding+=0.5')

      .set('[data-scene="container"]#websites [data-scene="image"]', {autoAlpha: 1, zIndex: 1}, 'branding')
      .to('[data-scene="container"]#branding [data-scene="image"]', {clipPath: 'inset(0% 0% 100% 0%)'}, 'branding+=0.5')

      // Websites
      .addLabel('websites')

      .set('[data-scene="container"]#websites [data-scene="content"]', {zIndex: 1})
      .set('[data-scene="container"]#websites [data-scene="image"]', {autoAlpha: 1, zIndex: 2})
      .to('[data-scene="container"]#websites [data-scene="content"]', {autoAlpha: 1, y: 0}, 'websites')

      .set('[data-scene="container"]#websites [data-scene="content"]', {zIndex: 0}, 'websites+=1')
      .to('[data-scene="container"]#websites [data-scene="content"]', {autoAlpha: 0, y: 10}, 'websites+=1')
      
      .set('[data-scene="container"]#marketing [data-scene="image"]', {autoAlpha: 1, zIndex: 1}, 'websites')
      .to('[data-scene="container"]#websites [data-scene="image"]', {clipPath: 'inset(0% 0% 100% 0%)'}, 'websites+=1')
      
      // Marketing
      .addLabel('marketing')
      .set('[data-scene="container"]#marketing [data-scene="content"]', {zIndex: 1})
      .to('[data-scene="container"]#marketing [data-scene="content"]', {autoAlpha: 1, y: 0}, 'marketing')
  })

  const parallaxServicesTL = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'none'
    },
    scrollTrigger: {
      start: 'top bottom',
      trigger: '[data-pin="services"]',
      scrub: true,
      // markers: true,
      end: '250%'
    }
  }).addLabel('start')

  parallaxServicesTL
    .fromTo('#branding .workTile__figure', {yPercent: 0}, {duration: 1.5, yPercent: '-=12.5'}, '-=0.5')
    .fromTo('#websites .workTile__figure', {yPercent: 0}, {duration: 1.5, yPercent: '-=12.5'}, '-=0.5')
    .fromTo('#marketing .workTile__figure', {yPercent: 0}, {duration: 1.5, yPercent: '-=12.5'}, '-=0.5')
}
