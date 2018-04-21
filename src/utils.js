const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

const generateType = () => {
  const randomEl = (array) => {
    let randomIndex = Math.floor(Math.random() * ((array.length-1) + 1));
    return array[randomIndex];
  }

  const colorsDictionary = ['red', 'blue', 'green']
  const shapesDictionary = ['triangle', 'square']

  let randColor = randomEl(colorsDictionary)
  let randShape = randomEl(shapesDictionary)

  return `${randColor}-${randShape}`
}

// Generate new global id (used for chips)
const newId = () => {
  let count = 0;

  return () => { return count++ };
}
let generateId = newId();

export { centerGameObjects, generateType, generateId }
