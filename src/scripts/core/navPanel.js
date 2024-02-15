import { gsap } from "gsap"
import { SplitText, ScrollSmoother, CustomEase } from "gsap/all"

gsap.registerPlugin(SplitText, ScrollSmoother, CustomEase)

let navPanelToggled = false
let menuTogg = document.querySelector('#menu-toggle')
let scrollPosY = 0

export function menuToggle() {
	document.querySelector('#menu-toggle').addEventListener('click', checkNav)
	window.addEventListener("keyup", function(e) {
		if (e.key == 'Escape') closeNav(250)
	}, false)
}

export function checkNav() {
  if (document.body.classList.contains('menu-toggle-active')) {
    closeNav(250)
  } else {
    openNav()
  }
}

export function openNav() {
  // Body
  document.body.classList.add('menu-toggle-active')

  // Scroll Handler
  setTimeout(() => {
    document.body.classList.add('scroll-disabled')
  }, 1500);

  if (window.matchMedia('(any-hover: hover) and (pointer: fine)').matches && ScrollSmoother.get()) {
    let smoother = ScrollSmoother.get()
    scrollPosY = smoother.scrollTop()   
  }

  // Toggle
  menuTogg.classList.add('smash')
  setTimeout(() => {
    menuTogg.classList.add('plus')
  }, 100)
  setTimeout(() => {
    menuTogg.classList.add('spin')
  }, 100)

  // Nav Panel Animation
  const navPanelAnimInTL = gsap.timeline({
    defaults: {
      duration: 1.25,
      // delay: 0.5,
      ease: CustomEase.create("easeName", "0, 0, 0, 1")
    }
  }).addLabel('start')

  gsap.set('#nav-panel #contact-info', {autoAlpha: 1})

  let offset = 0.6
  
  gsap.utils.toArray("nav ul li").forEach(function(elem, i) {

    gsap.set(elem, {autoAlpha: 1})

    const elemLines = elem.querySelectorAll('.fillText__line')

    gsap.set('.fillText__line', {opacity: 1})
    /*
    const innerSplit = new SplitText(elem, {
      type: "lines",
      linesClass: "split_inner"
    })
    const outerSplit = new SplitText(elem, {
      type: "lines",
      linesClass: "split_outer"
    })

    let offset = 0.5
    let decay = 0.15 / (i + 1)

    if (i > 0) {
      offset = `<+=${decay}`
    }

    navPanelAnimInTL.from(innerSplit.lines, {
      yPercent: 200,
      opacity: 0,
      // stagger: 0.5,
      onComplete: () => {
        outerSplit.revert()
        innerSplit.revert()
        navPanelAnimInTL.addLabel('navLoaded')
      }
    }, offset)
    */

    let decay = 0.15 / (i + 1)

    if (i > 0) {
      offset += decay
    }

    for (const elemLine of elemLines) {
      navPanelAnimInTL.from(elemLine, {yPercent: 200, opacity: 0}, offset)
    }
  })

  navPanelToggled = true

  navPanelAnimInTL
    .from("html", {"--navPanelLineH": 0}, 'navLoaded-=1')
    .from("html", {"--navPanelLineV": 0}, 'navLoaded-=1')
    .from('#nav-panel #contact-info > * > *', {y: 10, opacity: 0, duration: 1.5}, 'navLoaded-=0.85')
}

export function closeNav(delay) {
  // Scroll Handler
  document.body.classList.remove('scroll-disabled')

  if (window.matchMedia('(any-hover: hover) and (pointer: fine)').matches && ScrollSmoother.get()) {
    let smoother = ScrollSmoother.get()
    smoother.scrollTo(scrollPosY)
  }
  
  setTimeout(() => {
    // Body
    document.body.classList.remove('menu-toggle-active')

    // Toggle
    menuTogg.classList.remove('spin',)
    setTimeout(() => {
      menuTogg.classList.remove('plus')
    }, 100)
    setTimeout(() => {
      menuTogg.classList.remove('smash')
    }, 300)

    // Nav Panel Animation
    const navPanelAnimOutTL = gsap.timeline({
      defaults: {
        duration: 0.5,
        autoAlpha: 0,
      }
    }).addLabel('start')

    gsap.utils.toArray("nav ul li").forEach(function(elem) {
      navPanelAnimOutTL.to(elem, {duration: 0.5, autoAlpha: 0}, 'start')
    })

    navPanelAnimOutTL.to('#nav-panel #contact-info', {duration: 0.5, autoAlpha: 0}, 'start')
    
  }, delay);

  navPanelToggled = false

}

export function currentMenuItem() {
  const navLinks = document.querySelectorAll("nav a")

  // `slice` here to remove the first `/` in pathname
  let currentPath = window.location.pathname

  // if (currentPath.length > 1) {
  //   currentPath = currentPath.slice(1)
  // }
  

  navLinks.forEach((link) => {
    link.closest('li').classList.remove("current-menu-item")

    // `link.href` returns a whole url, such as: "https://somedomain.com/posts" and we only need the last part
    const thisPath = link.getAttribute('href')

    if (currentPath === thisPath) {
      link.closest('li').classList.add("current-menu-item")
    }
  });

}