class bond{
    constructor(number){
        if(typeof number == 'string') this.number = number.length
        else this.number = number
    }
    render(){}
}
class atom{
    constructor(name, links){
        this.name = name
        this.links = links
    }
    render(x, y){
        c.fillRect(x-2, y-2, 4, 4)
        //c.strokeText(this.name, x+8, y+8)
        c.fillText(this.name, x+8, y+8)
        //c.fillText(this.name+' ('+String(Math.round(x))+', '+String(Math.round(y))+')', x+8, y+4)
    }
}
class branch {
    constructor(...branch){
        this.branch = branch
    } 
    render(x, y, dx, dy, wiggle_y){
        let smallest_x = x
        let smallest_y = y
        let largest_x = x
        let largest_y = y
        for(let i = 0 ; i < this.branch.length ; i++){
            if(this.branch[i] instanceof atom){
                if(i != 0){
                    c.beginPath()
                    c.moveTo(x, y)
                    x += dx
                    y += dy
                    c.lineTo(x, y)
                    c.stroke()
                }
                this.branch[i].render(x, y)
                if(x < smallest_x) smallest_x = x
                if(x > largest_x) largest_x = x
                if(y < smallest_y) smallest_y = y
                if(y > largest_y) largest_y = y                
                if( wiggle_y) dy *= -1
                if(!wiggle_y) dx *= -1
            }
            if(this.branch[i] instanceof bond){
                for(let j = 1 ; j < this.branch[i].number ; j++){
                    let offset = Math.round(j/2)*bond_offset*(j%2*2-1)
                    c.beginPath()
                    c.moveTo(x+offset*(dy>0?-1:1), y+offset*(dx>0?1:-1))
                    c.fillRect(x+offset*(dy>0?-1:1)-2, y+offset*(dx>0?1:-1)-2, 4, 4)
                    c.lineTo(x+dx+offset*(dy>0?-1:1), y+dy+offset*(dx>0?1:-1))
                    c.fillRect(x+dx+offset*(dy>0?-1:1)-2, y+dy+offset*(dx>0?1:-1)-2, 4, 4)
                    c.stroke()
                }
            }
            if(this.branch[i] instanceof branch){
                let r = {}
                let DX = dx*(!wiggle_y?-1:(this.branch[i-1] instanceof branch?1:1))
                let DY = dy*(wiggle_y?-1:(this.branch[i-1] instanceof branch?1:1))
                if(this.branch[i].branch[0] instanceof atom){
                    c.beginPath()
                    c.moveTo(x, y)
                    c.lineTo(x+DX, y+DY)
                    c.stroke()
                    r = this.branch[i].render(x+DX, y+DY, DX, DY, !wiggle_y)
                } else {
                    r = this.branch[i].render(x, y, DX, DY, !wiggle_y)
                }
                if(r.smallest_x < smallest_x) smallest_x = r.smallest_x
                if(r.largest_x > largest_x) largest_x = r.largest_x
                if(r.smallest_y < smallest_y) smallest_y = r.smallest_y
                if(r.largest_y > largest_y) largest_y = r.largest_y
            }
        }
        return {
            smallest_x: smallest_x,
            smallest_y: smallest_y,
            largest_x: largest_x,
            largest_y: largest_y,
            width: largest_x - smallest_x,
            height: largest_y - smallest_y
        }
    }
}

function parser(string, separate_H=false){
    console.log(string)
    string = string.replace(/[(]/gm, '[')
    string = string.replace(/[)]/gm, ']')
    if(separate_H) string = string.replace(/[A-G|I-Z][a-z|0-9|H]*/gm, 'new atom("$&"),')
    else string = string.replace(/[A-Z][a-z|0-9]*/gm, 'new atom("$&"),')
    string = string.replace(/[[]/gm, 'new branch(')
    string = string.replace(/\/+/gm, 'new bond("$&"),')
    string = string.replace(/,]/gm, '),')
    string = string.slice(0, -1)
    string = `new branch(${string})`
    console.log(string)
    return eval(string)
}

let bond_offset = 5
let start_x = width*2/5
let start_y = height*3/5
let scale = 80

let formula

if(localStorage.getItem('formula') != undefined){
    formula = localStorage.getItem('formula')
} else {
    formula = 'CH3CH2C(OH)//O'
}

$('formula-changer').value = formula

$('submit').addEventListener('click',()=>{
    formula = $('formula-changer').value
    localStorage.setItem('formula', formula)
    location.reload()
})

$('reset').addEventListener('click',()=>{
    formula = 'CH3CH2C(OH)//O'
    localStorage.setItem('formula', formula)
    location.reload()
})

let chemical = parser(formula, true)

returned = chemical.render(start_x, start_y, scale, scale, true)

console.table(returned)
