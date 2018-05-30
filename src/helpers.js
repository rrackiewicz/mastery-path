/* =============================================================
Return a random color
============================================================= */
const colors = [
  'hsl(0, 0%, 21%)',
  'hsl(171, 100%, 41%)',
  'hsl(204, 86%, 53%)',
  'hsl(217, 71%, 53%)',
  'hsl(141, 71%, 48%)',
  'hsl(348, 100%, 61%)',
  'hsl(282, 44%, 47%)',
  'hsl(28, 80%, 52%)'
]

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getBars() {
  let bars = []
  for (let i=0; i<rand(20, 30); i++) {
    bars.push({flex : toString(rand(1,10))})
  }
  return bars;
}

export function randColor() {
  return colors[rand(0,colors.length-1)];
}