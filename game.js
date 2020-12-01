const width = 28;
const gridField = document.querySelector('.grid')
const scoreElement = document.getElementById('score')
let squares = []
let pacmanCurrentIndex = 490
let score = 0;

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const gameLayout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard () {
    for (let i = 0; i < gameLayout.length; i ++) {
        let square = document.createElement('div')
        gridField.appendChild(square)
        squares.push(square)
        
        if (gameLayout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (gameLayout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (gameLayout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (gameLayout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard()

squares[pacmanCurrentIndex].classList.add('pacman')

function controle (e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
   switch(e.keyCode) {
       case 40:
        console.log('pushed down')
        if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + width < width* width) pacmanCurrentIndex += width
        break
        case 38:
        console.log('pushed up')
        if (!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - width >=0) pacmanCurrentIndex -= width
        break
        case 37:
        console.log('pushed left')
        if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width != 0) pacmanCurrentIndex -=1
        if (pacmanCurrentIndex === 364) {
            pacmanCurrentIndex = 391
        }
        break
        case 39:
        console.log('pushed right')
        if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width < width-1) pacmanCurrentIndex +=1
        if (pacmanCurrentIndex === 391) {
            pacmanCurrentIndex = 364
        }
        break
   }
   squares[pacmanCurrentIndex].classList.add('pacman')
   pacDotEaten()
   powerPelletEaten()
   checkForWin()
}

document.addEventListener('keyup', controle)

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++
        console.log(score)
        scoreElement.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')

    }
}

function powerPelletEaten() {
   
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
   
    score +=10
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    ghosts.forEach(ghost => ghost.isScared = true)
        
    setTimeout(unScareGhosts, 10000)   
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


class Ghost {
    constructor (className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {squares[ghost.startIndex].classList.add(ghost.className)
                        squares[ghost.startIndex].classList.add('ghost')})

ghosts.forEach(ghost => moveGhost(ghost))


function moveGhost (ghost) {
    const directions = [+1, -1, + width, - width] 
    let direction = directions[Math.floor(Math.random()* directions.length)]

    ghost.timerId = setInterval(function() {
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {

        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        
        ghost.currentIndex += direction;
        
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random()* directions.length)]
        if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')}

        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score +=100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
        checkForWin()
    }, ghost.speed )
    }

    function checkForGameOver() {
     
        if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
            !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
                ghosts.forEach(ghost => clearInterval(ghost.timerId))
                document.removeEventListener('keyup', controle)
                scoreElement.innerHTML = 'You have lost!'
            }
    }

    function checkForWin() {
        if (score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', controle)
            scoreElement.innerHTML = 'YOU HAVE WON!!!'
        }
    }
    