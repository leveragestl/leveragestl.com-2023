import {gsap} from 'gsap'
import { ScrollSmoother } from 'gsap/all'

export function linkHandler() {

  // ===========================================================================
  // Hash Links
  // ===========================================================================

  if (window.matchMedia('(pointer: fine)').matches) {
    let smoother = ScrollSmoother.get()

    const offset = getComputedStyle(document.body).getPropertyValue('--site-header-height')

    // ~~~~~~~~~~~~~~~ Internal ~~~~~~~~~~~~~~ //
    let hashLinks = document.querySelectorAll('a[href^="#"]')
      
    for (const hashLink of hashLinks) {
      let target = hashLink.getAttribute('href')
      hashLink.setAttribute('href', 'javascript:void(0)')
      hashLink.setAttribute('data-hash', target)

      hashLink.addEventListener('click', (e) => {      
        e.preventDefault()
        smoother.scrollTo(target, true, `top ${offset}`)
      })
    }

    // ~~~~~~~~~~~~ From External ~~~~~~~~~~~~ //
    window.onload = (event) => {  
      let urlHash = window.location.href.split("#")[1]

      let scrollElem = document.querySelector("#" + urlHash)
      
      if (urlHash && scrollElem) {
        gsap.to(smoother, {
          scrollTop: smoother.offset(scrollElem, `top ${offset}`),
          duration: 0,
          delay: 0
        });
      }
    }
  }

  // ===========================================================================
  // External Links
  // ===========================================================================
  function link_is_external(link_element) {
    return (link_element.host !== window.location.host);
  }

  let regLinks = document.querySelectorAll('a[href]:not([href^="#"],[href^="mailto:"],[href^="tel:"]):not(.no-external-icon)');

  for (const regLink of regLinks) {
    if (link_is_external(regLink) && !regLink.querySelector('img')) {
      regLink.setAttribute('target', '_blank');
      regLink.classList.add('external');
    }
  } 
}