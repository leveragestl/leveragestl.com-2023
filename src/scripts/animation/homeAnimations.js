import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger, SplitText, CustomEase, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

let mm = gsap.matchMedia();

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

    pinHeroTL
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
        end: '150%',
        fastScrollEnd: true,
        snap: {
          snapTo: [0.01, 0.5, 0.99],
          delay: 0,
          directional: false
        }
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
