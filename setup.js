let canvas = $('canvas')
let c = canvas.getContext('2d')

width = window.innerWidth
height = window.innerHeight

canvas.width = width
canvas.height = height - 4

c.fillStyle = 'black'
c.strokeStyle = 'black'

c.font = '25px roboto';
