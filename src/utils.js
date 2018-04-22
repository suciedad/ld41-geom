const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

const generateType = (possibleColors) => {
  const randomEl = (array) => {
    let randomIndex = Math.floor(Math.random() * ((array.length-1) + 1));
    return array[randomIndex];
  }

  let colorsDictionary
  if (possibleColors === undefined) {
    colorsDictionary = ['red', 'blue', 'green', 'yellow']
  } else {
    colorsDictionary = possibleColors
  }
  let shapesDictionary = ['triangle', 'square']

  let randColor = randomEl(colorsDictionary)
  let randShape = randomEl(shapesDictionary)

  if (randColor === 'yellow') {
    return `yellow-gold`
  }
  return `${randColor}-${randShape}`
}

// Generate new global id (used for chips)
const newId = () => {
  let count = 0;

  return () => { return count++ };
}
let generateId = newId();

export { centerGameObjects, generateType, generateId }
