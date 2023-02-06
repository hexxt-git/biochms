class bond{
    constructor(number){
        this.number = number
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
        c.fillText(this.name, x+8, y+4)
    }
}
class branch {
    constructor(...branch){
        this.branch = branch
    } 
    render(x, y, dx, dy, wiggle_y){
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
                if( wiggle_y) dy *= -1
                if(!wiggle_y) dx *= -1
            }
            if(this.branch[i] instanceof bond){
                for(let j = 1 ; j < this.branch[i].number ; j++){
                    let offset = Math.round(j/2)*3*(j%2*2-1)
                    c.beginPath()
                    c.moveTo(x+offset*(dy>0?-1:1), y+offset*(dx>0?1:-1))
                    c.lineTo(x+dx+offset*(dy>0?-1:1), y+dy+offset*(dx>0?1:-1))
                    c.stroke()
                }
            }
            if(this.branch[i] instanceof branch){
                let DX = dx*(!wiggle_y?-1:(this.branch[i-1] instanceof branch?-1:1))
                let DY = dy*(wiggle_y?-1:(this.branch[i-1] instanceof branch?-1:1))
                if(this.branch[i].branch[0] instanceof atom){
                    c.beginPath()
                    c.moveTo(x, y)
                    c.lineTo(x+DX, y+DY)
                    c.stroke()
                    this.branch[i].render(x+DX, y+DY, DX, DY, !wiggle_y)
                } else {
                this.branch[i].render(x, y, DX, DY, !wiggle_y)
                }
            }
        }
    }
}

function parser(string){
    molecule = branch([])
    return molecule
}

test = new branch(
    new atom('A'), new atom('B'), new branch(new atom('b')), new branch(new atom('B1'), new bond(3), new atom('B2'), new branch(new atom('B21'), new atom('B22'), new atom('B23')), new atom('B3')), new atom('C'), new bond(2), new atom('D'), new atom('E')
);

test.render(width/3, height*2/3, 70, 70, true)

