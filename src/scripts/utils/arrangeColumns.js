export function twoColumns() {

  let rearrangeFired = false, resetFired = true
  const twoColParent = document.querySelector('[data-arrange="2-columns"]')
  const twoColElems = document.querySelectorAll('[data-arrange="2-columns"] > [data-arrange-item]')
  const twoColElemsArr = Array.prototype.slice.call(twoColElems);

  const newElemLeft = document.querySelector('[data-arrange-column="1"]')
  const newElemRight = document.querySelector('[data-arrange-column="2"]')

  const classes = ['grid', 'lg:grid-cols-2', 'gap-x-60']

  function rearrange() {
    let leftSide, rightSide;
    const split = Math.floor(twoColElemsArr.length / 2);
    [leftSide,rightSide] = [twoColElemsArr.slice(0, split), twoColElemsArr.slice(split, twoColElemsArr.length)];

    let odds = []
    let evens = []

    twoColElems.forEach((twoColElem, i) => {
      if ((i+1) % 2 === 0) {
        evens.push(twoColElem)
      } else {
        odds.push(twoColElem)
      }
    });

    // Parent
    twoColParent.classList.add(...classes)

    // Left
    for (const odd of odds) {
      newElemLeft.appendChild(odd)
    }

    // Right
    for (const even of evens) {
      newElemRight.appendChild(even)
    }
  }

  function reset() {
    twoColParent.classList.remove(...classes)

    for (const twoColElem of twoColElems) {
      twoColParent.appendChild(twoColElem)
    }
  }

  function check() {
    if (window.matchMedia('only screen and (min-width: 1024px)').matches) {
      if (!rearrangeFired) {
        rearrange()
        rearrangeFired = true
        resetFired = false
      }
    } else {
      if (!resetFired) {
        reset()
        rearrangeFired = false
        resetFired = true
      }
    }
  }

  check()
  window.addEventListener('resize', check)
}