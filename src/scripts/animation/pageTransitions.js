import {gsap} from 'gsap'

export function pageTransitions() {

  // const links = document.querySelectorAll('a');

  // for (const link of links) {
  //   if (link.getAttribute('href', 'javascript:void(0)')) {
  //     console.log(link);
  //   }
  // }

  window.addEventListener('click', (e) => {
    gsap.set('.transition-wipe', {yPercent: -100})

    if (e.target.closest('a') ) {
      const self = e.target.closest('a')
      const dest = self.getAttribute('href')
      
      if (self.hostname === location.hostname) {
        if (self.getAttribute('data-hash')) return
        e.preventDefault()

        const transitionOutAnimTL = gsap.timeline({
          onComplete: setTimeout(() => {
            window.location.href = dest
          }, 1000)
        })

        transitionOutAnimTL.to('.transition-out', {duration: 1.5, ease: 'power3.inOut', yPercent: '+=100'})
        transitionOutAnimTL.to('.transition-out', {duration: 1, ease: 'power1.out', autoAlpha: 0}, '<+=0.5')
        transitionOutAnimTL.to('.transition-wipe', {duration: 0.5, ease: 'expo.out', yPercent: 0}, '-=0.85')

        // setTimeout(() => {
        //   window.location.href = dest
        // }, 500);
      }
      
    }
  })

  const transitionInAnimTL = gsap.timeline()

  transitionInAnimTL.to('.transition-wipe', {duration: 0.5, ease: 'expo.in', yPercent: 100})
  transitionInAnimTL.from('.transition-in', {duration: 1.5, ease: 'power3.inOut', yPercent: '-=10'}, '-=0.85')
  transitionInAnimTL.from('.transition-in', {duration: 1, ease: 'power1.out', autoAlpha: 0}, '<+=0.5')
}