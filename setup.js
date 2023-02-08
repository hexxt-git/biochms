let container = $('display-tab')
let canvas = $('canvas')
let c = canvas.getContext('2d')

function resize(){
    width = container.clientWidth
    height = container.clientHeight

    canvas.width = width
    canvas.height = height - 4

    c.fillStyle = '#CCC'
    c.strokeStyle = '#CCC'
    c.font = '16px roboto';
}
resize()
window.addEventListener('resize', resize)

