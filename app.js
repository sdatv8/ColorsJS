const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (down) => {
  event.preventDefault()
  if(down.code.toLocaleLowerCase() === 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type
  if (type === 'lock') {
    const node = event.target.tagName.toLocaleLowerCase() === 'i' 
    ? event.target
    : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type
  if (type === 'header') {
    copyClickBoard(event.target.textContent)
  }
})


function copyClickBoard(text) {
  return navigator.clipboard.writeText(text)
}


function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromhash() : []
  
  cols.forEach( (col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')

    if (isLocked) {
      colors.push(text.textContent)
      return
    }
    const color  = isInitial
    ? colors[index]
      ? colors[index]
      : chroma.random()
    : chroma.random()

    !isInitial && colors.push(color)
    col.style.background = color
    text.textContent = color

    setTextColor(text, color)
    setTextColor(button, color)
  })
  
  updateColorsHash(colors)
}

function updateColorsHash (colors = []) {
  document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}

function getColorsFromhash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(color => '#' + color)
  }
  return ([])
}

setRandomColors(true)