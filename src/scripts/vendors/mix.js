// import mixitup from 'mixitup';
import { gsap } from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollSmoother, ScrollTrigger )

// =============================================================================
// Utils
// =============================================================================

// Array Intersection
function arrayIntersect (arr1, arr2) {
	return arr1.filter(function (item) {
		return arr2.includes(item);
	});
}

// Set Offset
function setOffset(array) {
  array.forEach((elem, i) => {
    elem.classList.remove('offset')
    if (i % 2 !== 0) {
      elem.classList.add('offset')
    }
  })
}

// Reset Smoother
function resetSmoother() {
  let smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.kill()
    smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      // smoothTouch: 0.1,
    })
  }
}

// =============================================================================
// Project Filters
// =============================================================================
export function projectFilters() {
  // Set Offset
  setOffset(document.querySelectorAll('[data-filter="item"]'))

  const projects = document.querySelectorAll('[data-filter="item"]')

  let filterSelections = []
  let dropdownActive = false
  let url = new URL(window.location.href)
  let params = url.searchParams
  let initialLoad = true

  setTimeout(() => {
    initialLoad = false
  }, 500)

  // ===========================================================================
  // findMatching() Function
  // ===========================================================================

  function findMatching(items, selections) {
    // setup activeItems Array
    let activeItems = [...items]
    if (selections.length > 0) {
      activeItems = []
    }

    // compare tags to selections
    for (const [i, project] of items.entries()) {
      const tags = project.getAttribute('data-filter-tags').split(',')

      if (arrayIntersect(tags, selections).length) {
        activeItems.push(project)
        project.setAttribute('data-filter-state', 'include')
      } else {
        project.setAttribute('data-filter-state', 'exclude')
      }

      if (selections.length === 0) {
        project.setAttribute('data-filter-state', 'include')
      }
    }

    // ~~~~~~~~~~~~~~ Animation ~~~~~~~~~~~~~~ //

    const tl = gsap.timeline().addLabel('start')

    if (selections.length !== 0 && activeItems.length == 0) {
      document.querySelector('[data-filter="container"]').setAttribute('data-items', 0)
      console.log('no items');
      tl.to('[data-filter-message]', {autoAlpha: 1, delay: 1}, 'start')
    } else {
      document.querySelector('[data-filter="container"]').setAttribute('data-items', activeItems.length)
      tl.to('[data-filter-message]', {autoAlpha: 0}, 'start')
    }

    // fade out all items
    if (!initialLoad) {
      tl
      .fromTo(
          '[data-filter="item"] a > *',
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1
          },
          {
            duration: 1,
            ease: 'expo.in',
            autoAlpha: 0,
            y: 50,
            onComplete: function() {resetSmoother(); setOffset(activeItems)}
          },
          'start'
        )
      .addLabel('items-fadeOut')
    }

    // set excluded items to "display: none"
    if (document.querySelector('[data-filter-state="exclude"]')) {
      tl
        .set(
          '[data-filter-state="exclude"]',
          {
            display: 'none'
          }
        )
        .addLabel('items-hidden')
    }

    // fade in selected items
    if (document.querySelector('[data-filter-state="include"]')) {
      tl
        .set(
          '[data-filter-state="include"]',
          {
            display: '',
            onComplete: function() {ScrollTrigger.refresh()}
          }
        )
        .addLabel('items-displayed')
      
      tl
        .fromTo(
          '[data-filter-state="include"] a > *',
          {
            autoAlpha: 0,
            y: -50,
            stagger: 0.1,
          },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
          }
        )
        .addLabel('items-fadeIn')
    }

  }

  // ===========================================================================
  // toggleActiveButtons Functions
  // ===========================================================================
  function toggleActiveButtons(selections) {
    document.querySelector('[data-filter-target="all"]').classList.remove('active')
    // toggle "active" class on filter buttons
    for (const filterButton of document.querySelectorAll('[data-filter="filter"]')) {
      // filterButton.classList.remove('active')
      if (selections.includes(filterButton.getAttribute('data-filter-target'))) {
        filterButton.classList.add('active')
      } else {
        filterButton.classList.remove('active')
      }
    }

    // toggle "active" class on first/default filter button if no filters selected
    if(selections.length === 0) {
      document.querySelector('[data-filter-target="all"]').classList.add('active')
    }
  }

  // ===========================================================================
  // Check URL Params on Load
  // ===========================================================================
  let paramCategories = params.get('category')

  if (paramCategories) {
    paramCategories = paramCategories.split(',')
    filterSelections = paramCategories
  }
  
  findMatching(projects, filterSelections)
  toggleActiveButtons(filterSelections)

  // =========================================================================
  // Mobile dropdown click
  // =========================================================================
  document.addEventListener('click', (e) => {

    // check if clicked el is button
    if(!e.target.closest('button')) return
    const target = e.target.closest('button')
    
    // check if clicked button is the dropdown
    if (target.getAttribute('data-filter') === 'dropdown') {

      const filters = document.querySelector('[data-filter="filters"]')

      if (dropdownActive) {
        dropdownActive = false
        filters.classList.add('hidden')
        target.classList.remove('open')
      } else {
        dropdownActive = true
        filters.classList.remove('hidden')
        target.classList.add('open')
      }

    } 
  })

  // ===========================================================================
  // Normal filter button click
  // ===========================================================================
  document.addEventListener('click', (e) => {
    // check if clicked el is button
    if(!e.target.closest('button')) return
    const target = e.target.closest('button')
    
    if (target.getAttribute('data-filter') === 'filter') {

      const filterSelection = target.getAttribute('data-filter-target')

      // Add/remove filter target from filterSelections Array
      if (filterSelections.includes(filterSelection)) {
        // remove if already included
        filterSelections.splice((filterSelections.indexOf(filterSelection)), 1)
      } else {
        // add if not already included
        filterSelections.push(filterSelection)
      }

      // clear filterSelections if first/default filter button is clicked
      if (target.getAttribute('data-filter-target') === 'all') {
        filterSelections = []
        params.delete('category')
      }

      // update params
      params.delete('category')
      if (filterSelections.length !== 0) {
        params.set('category', filterSelections)
      }

      // update URL in browser
      // history.replaceState(history.state, '', url.href)
      history.replaceState(history.state, '', url.href.replaceAll("%2C", ","))

      findMatching(projects, filterSelections)

      toggleActiveButtons(filterSelections)

    }
  })
}