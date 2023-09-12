import { gsap } from "gsap";
import { SplitText, CustomEase } from "gsap/all";

export function menuToggle() {
	let menuTogg = document.querySelector('#menu-toggle');
	let menuIcon = document.querySelector('#menu-icon');

	let allMenuItems = document.querySelectorAll('.menu-item');
	let allSubMenus = document.querySelectorAll('.sub-menu');

	let currentMenuItem = document.querySelector('#mobile-navigation .current-menu-item');

	document.querySelector('#menu-toggle').addEventListener('click', checkNav);
	window.addEventListener("keyup", function(e) {
		if (e.key == 'Escape') closeNav();
	}, false);

	function checkNav() {
		if (document.body.classList.contains('menu-toggle-active')) {
			closeNav();
		} else {
			openNav();
		}
	}

	function openNav() {
		// Body
		document.body.classList.add('menu-toggle-active', 'scroll-disabled');

		// Toggle
		menuTogg.classList.add('smash');
		setTimeout(() => {
			menuTogg.classList.add('plus');
		}, 100)
		setTimeout(() => {
			menuTogg.classList.add('spin');
		}, 100)

    // Nav Panel Animation
    const navPanelAnimInTL = gsap.timeline({
      defaults: {
        duration: 1.1,
        delay: 0.5,
        ease: "power4",
      }
    }).addLabel('start')

    gsap.set('#nav-panel #contact-info > * > *', {autoAlpha: 1})

    gsap.utils.toArray("nav ul li").forEach(function(elem) {

      gsap.set(elem, {autoAlpha: 1})

      const innerSplit = new SplitText(elem, {
        type: "lines",
        linesClass: "split_inner"
      });
      const outerSplit = new SplitText(elem, {
        type: "lines",
        linesClass: "split_outer"
      });

      navPanelAnimInTL.from(innerSplit.lines, {
        yPercent: 150,
        opacity: 0,
        // stagger: 0.5,
        onComplete: function() {
          outerSplit.revert()
          innerSplit.revert()
        }
      }, 'start')
    })

    navPanelAnimInTL.from("html", {"--navPanelLineH": 0}, 'start+=0.25')
    navPanelAnimInTL.from("html", {"--navPanelLineV": 0}, 'start+=0.25')

    navPanelAnimInTL.from('#nav-panel #contact-info > * > *', {
      y: 10,
      opacity: 0,
    }, 'start+=0.5')
	}

	function closeNav() {
		// Body
		document.body.classList.remove('menu-toggle-active', 'scroll-disabled');

		// Toggle
		menuTogg.classList.remove('spin',);
		setTimeout(() => {
			menuTogg.classList.remove('plus');
		}, 100);
		setTimeout(() => {
			menuTogg.classList.remove('smash', 'before:hidden');
		}, 300);

		// Submenus
		for (const menuItem of allMenuItems) {
			menuItem.classList.remove('sub-menu-active');
		}

		for (const subMenu of allSubMenus) {
			subMenu.classList.remove('reveal');
		}

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

    navPanelAnimOutTL.to('#nav-panel #contact-info > * > *', {duration: 0.5, autoAlpha: 0}, 'start')
	}

	// Hash links on the same page should close the menu
	let currentLocation = window.location.href.replace(window.location.hash,"");
	let navLinks = document.querySelectorAll('#nav-panel a');

	for (const navLink of navLinks) {
		navLink.addEventListener('click', (function(e) {
			let linkHref = e.currentTarget.href.replace(e.currentTarget.hash,"");
			let linkHash = e.currentTarget.hash;
			if (linkHash && currentLocation == linkHref) {
				closeNav();
			}
		}));
	}

}