import gsap from "gsap"
import ScrollTrigger from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export function careersAnimations() {
  const animGroup = document.querySelector('[data-anim-group="cascade"]')
  const photos = animGroup.querySelectorAll('[data-anim-item]')

  scrubAnimation()

  function scrubAnimation() {
    const careersHeroPinTL = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'none'
      },
      scrollTrigger: {
        trigger: '.pin-wrapper',
        scrub: true,
        pin: '.pin-wrapper',
        // end: `+=${(photos.length - 2) * 100}%`,
        // markers: true,
        invalidateOnRefresh: true
      }
    })

    function animLastPhoto() {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'none'
        },
      })
      tl.to('[data-anim-item="4"]', {y: '-=50vh', scrollTrigger: {
        trigger: animGroup,
        start: 'top top',
        scrub: true,
        // markers: true,
        invalidateOnRefresh: true,
        paused: true
      }})
      return tl
    }
  
    careersHeroPinTL
      .set('[data-anim-item]', {autoAlpha: 1})
      .to('[data-anim-item="1"]', {y: '-50vh'})
      .to('[data-anim-item="2"]', {y: '-50vh'}, '<+=0.2')
      .to('[data-anim-item="3"]', {y: '-100vh'}, '<+=0.1')
      .to('[data-anim-item="4"]', {y: 0, onComplete: () => animLastPhoto()}, '<')
  }

  /*
  const scene = document.querySelector('[data-anim-group="cascade"]');
  const sections = [...document.querySelectorAll("[data-anim-item]")];

  const setTimeline = (scene) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        pin: '.pin-wrapper',
        scrub: true,
        markers: true,
        start: "top top",
        end: () => "+=" + scene.scrollHeight
      }
    });
  };

  const animateSections = (sections) => {
    return gsap.to(sections, {
      autoAlpha: 1,
      yPercent: -((sections.length - 1) * 100),
      ease: "none"
    });
  }

  const timeline = setTimeline(scene);
  timeline.add(animateSections(sections))
  */
}