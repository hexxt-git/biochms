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
        c.fillText(this.name, x+8, y+5)
    }
}
class branch {
    constructor(branch){
        this.branch = [...branch]
    } 
    render(x, y, dx, dy, wiggle_y){
        console.log(this.branch)
        for(let i = 0 ; i < this.branch.length ; i++){
            this.branch[i].render(x, y, wiggle_y?dx:-dx, wiggle_y?-dy:dy, !wiggle_y)
            if(i == this.branch.length-1) break
            c.beginPath()
            c.moveTo(x, y)
            x += dx +rdmAround(15)
            y += dy +rdmAround(15)
            c.lineTo(x, y)
            c.stroke()
            if(wiggle_y == true) dy *= -1
            if(wiggle_y == false) dx *= -1
        }
    }
}

test = new branch([
    new atom('A'), new atom('B'), new branch([new atom('B1'), new atom('B2'), new branch([new atom('B21'), new atom('B22'), new atom('B23')]), new atom('B3')]), new atom('C'), new bond(2), new atom('D')
]);

test.render(width/3, height*2/3, 70, 70, true)