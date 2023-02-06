let container = $('display-tab')
let canvas = $('canvas')

canvas.width = container.clientWidth
canvas.height = container.clientHeight-4

let c = canvas.getContext('2d')

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'
c.font = 'bold 30px monospace';
