export function columnsTwo() {

  const columnSets = document.querySelectorAll('.columns-two')

  for (const columnSet of columnSets) {

    const columnItems = columnSet.querySelectorAll('.column-item.mix-visible')

    let leftSide = [], rightSide = [];
    // const m = Math.floor(columnItems.length/2);
    // const remainder = columnItems.length % 2;

    // [leftSide,rightSide] = [
    //   Object.entries(columnItems).slice(0,m + remainder), 
    //   Object.entries(columnItems).slice(m + remainder,columnItems.length)
    // ]

    columnItems.forEach((columnItem, i) => {
      if (i % 2 === 0) {
        leftSide.push(columnItem)
      } else {
        rightSide.push(columnItem)
      }
    })

    columnSet.querySelectorAll('[data-column]').forEach(col => col.parentNode.removeChild(col))

    const colLeft = document.createElement('div')
    columnSet.appendChild(colLeft)

    const colRight = document.createElement('div')
    columnSet.appendChild(colRight)

    for (const col of [colLeft, colRight]) {
      col.setAttribute('data-column', '')
      col.classList.add('w-full')
    }


    for (const columnItem of leftSide) {
      colLeft.appendChild(columnItem)
    }

    for (const columnItem of rightSide) {
      colRight.appendChild(columnItem)
    }
  }
}