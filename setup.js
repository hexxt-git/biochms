let container = $('display-tab')
let canvas = $('canvas')

width = container.clientWidth
height = container.clientHeight

canvas.width = width
canvas.height = height - 4

let c = canvas.getContext('2d')

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'
c.font = '20px roboto';
