// import mixitup from 'mixitup';
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/all";

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

export function mix() {
  const container = document.querySelector('[data-filter="container"]')
  const include = document.querySelector('[data-filter="include"]')
  const exclude = document.querySelector('[data-filter="exclude"]')

  document.querySelectorAll('[data-mix="item"]').forEach((item, i) => {
    if (i % 2 !== 0) { 
      item.classList.add('offset')
    }    
  })

  let mixer = mixitup(container, {
    animation: {
      enable: false
    },
    controls: {
      toggleLogic: 'or'
      
    },
    callbacks: {
      onMixStart: function(state, futureState) {
        futureState.hide.forEach((hiddenEl, i) => {
          hiddenEl.setAttribute('data-mix-state', 'exclude')
          // exclude.appendChild(hiddenEl)
        })
        futureState.show.forEach((visibleEl, i) => {
          visibleEl.setAttribute('data-mix-state', 'include')
          visibleEl.classList.remove('offset')
          if (i % 2 !== 0) {
            visibleEl.classList.add('offset')
          }
          // include.appendChild(visibleEl)
        })

        setTimeout(() => {
          // container.classList.add('transition-opacity', 'duration-500', 'ease-out')
          container.classList.remove('opacity-0')
        }, 500);
      },
      onMixEnd: function(state) {
        let smoother = ScrollSmoother.get()
        smoother.kill()
        smoother = ScrollSmoother.create({
          smooth: 1,
          effects: true,
          // smoothTouch: 0.1,
        })
      }
    }
  })

  /*
  mixer.show().then(function(state) {
    console.log(state.show);
  })

  document.addEventListener('mixEnd', function() {
    columnsTwo()
    console.log(mixer.targets)
  })

  document.addEventListener('mixEnd', function() {
    columnsTwo()
    mixer.show(function(state) {
      console.log(state.show);
    })
  })
  */
}

// =============================================================================
// Project Filters
// =============================================================================
export function projectFilters() {
  // Set Offset
  setOffset(document.querySelectorAll('[data-filter="item"]'))

  let filterSelections = []
  let dropdownActive = false

  document.addEventListener('click', (e) => {

    // check if clicked el is button
    if(!e.target.closest('button')) return
    const target = e.target.closest('button')

    // =========================================================================
    // Mobile dropdown
    // =========================================================================
    
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

    } else if (target.getAttribute('data-filter') === 'filter') {

      const filterSelection = target.getAttribute('data-filter-target')

      // Add/remove filter target from filterSelections Array
      if (filterSelections.includes(filterSelection)) {
        // remove if already included
        filterSelections.splice((filterSelections.indexOf(filterSelection)), 1)
      } else {
        // add if not already included
        filterSelections.push(target.getAttribute('data-filter-target'))
      }

      // clear filterSelections if first/default filter button is clicked
      if (target.getAttribute('data-filter-target') === 'all') filterSelections = []

      // toggle "active" class on filter buttons
      for (const filterButton of document.querySelectorAll('[data-filter="filter"]')) {
        filterButton.classList.remove('active')
        if (filterSelections.includes(filterButton.getAttribute('data-filter-target'))) {
          filterButton.classList.add('active')
        }
      }

      // toggle "active" class on first/default filter button if no filters selected
      if(filterSelections.length === 0) {
        document.querySelector('[data-filter-target="all"]').classList.add('active')
      }

      // =========================================================================
      // Find matching projects
      // =========================================================================

      const projects = document.querySelectorAll('[data-filter="item"]')

      // setup activeProjects Array
      let activeProjects = [...projects]
      if (filterSelections.length > 0) {
        activeProjects = []
      }

      // compare tags to selections
      for (const [i, project] of projects.entries()) {
        const tags = project.getAttribute('data-filter-tags').split(',')

        if (arrayIntersect(tags, filterSelections).length) {
          activeProjects.push(project)
          project.setAttribute('data-filter-state', 'include')
        } else {
          project.setAttribute('data-filter-state', 'exclude')
        }

        if (filterSelections.length === 0) {
          project.setAttribute('data-filter-state', 'include')
        }
      }

      // animate items
      gsap.timeline()
        .fromTo('[data-filter="item"] a > *', {autoAlpha: 1, y: 0, stagger: 0.1}, {duration: 1, ease: 'expo.in', autoAlpha: 0, y: 50, onComplete: function() {resetSmoother(); setOffset(activeProjects)}})
        .set('[data-filter-state="exclude"]', {display: 'none'})
        .set('[data-filter-state="include"]', {display: ''})
        .fromTo('[data-filter-state="include"] a > *', {autoAlpha: 0, y: -50, stagger: 0.1}, {autoAlpha: 1, y: 0, stagger: 0.1})

    }
  })
}