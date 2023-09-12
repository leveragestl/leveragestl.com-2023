import { gsap } from "gsap"
import { SplitText, ScrollSmoother, CustomEase } from "gsap/all"

gsap.registerPlugin(SplitText, ScrollSmoother, CustomEase)

export function menuToggle() {
	let menuTogg = document.querySelector('#menu-toggle')
  let scrollPosY = 0

	document.querySelector('#menu-toggle').addEventListener('click', checkNav)
	window.addEventListener("keyup", function(e) {
		if (e.key == 'Escape') closeNav()
	}, false)

	function checkNav() {
		if (document.body.classList.contains('menu-toggle-active')) {
			closeNav()
		} else {
			openNav()
		}
	}

	function openNav() {
		// Body
		document.body.classList.add('menu-toggle-active')

    // Scroll Handler
    setTimeout(() => {
      document.body.classList.add('scroll-disabled')
    }, 1000);
    let smoother = ScrollSmoother.get()

    scrollPosY = smoother.scrollTop()

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

    gsap.utils.toArray("nav ul li").forEach(function(elem, i) {

      gsap.set(elem, {autoAlpha: 1})

      const innerSplit = new SplitText(elem, {
        type: "lines",
        linesClass: "split_inner"
      })
      const outerSplit = new SplitText(elem, {
        type: "lines",
        linesClass: "split_outer"
      })

      let offset = 0.25
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
    })

    navPanelAnimInTL
      .from("html", {"--navPanelLineH": 0}, 'navLoaded-=1')
      .from("html", {"--navPanelLineV": 0}, 'navLoaded-=1')
      .from('#nav-panel #contact-info > * > *', {y: 10, opacity: 0, duration: 1.5}, 'navLoaded-=0.85')
	}

	function closeNav() {
    // Scroll Handler
    document.body.classList.remove('scroll-disabled')
    let smoother = ScrollSmoother.get()
    smoother.scrollTo(scrollPosY)
    
    setTimeout(() => {
      // Body
		  document.body.classList.remove('menu-toggle-active')

      // Toggle
      menuTogg.classList.remove('spin',)
      setTimeout(() => {
        menuTogg.classList.remove('plus')
      }, 100)
      setTimeout(() => {
        menuTogg.classList.remove('smash', 'before:hidden')
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
    }, 250);

	}
}