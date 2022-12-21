'use strict'
const main = document.querySelector('.wrapper')
const board = document.querySelector('.board')
const centerInfo = document.querySelector('.center')
const rotateBtn = document.querySelector('.rotate-btn')
const newGameBtn = document.querySelector('.new__game')
const backMoveBtn = document.querySelector('.move-back')
const whiteMove = document.querySelector('.move__white')
const blackMove = document.querySelector('.move__black')
const whiteNumber = document.querySelector('.white__least')
const blackNumber = document.querySelector('.black__least')
const blackTimerSeconds = document.querySelector('.black__timer_seconds')
const blackTimerMinutes = document.querySelector('.black__timer_minutes')
const blackTimer = document.querySelector('.black__timer')
const whiteTimerSeconds = document.querySelector('.white__timer_seconds')
const whiteTimerMinutes = document.querySelector('.white__timer_minutes')
const whiteTimer = document.querySelector('.white__timer')
const anotationContent = document.querySelector('.annotation__content')
const info = document.querySelector('.info')
const endGame = document.querySelector('.end')
const endGameText = document.querySelector('.end__text')
rotateBtn.addEventListener('click', rotateBoard)
board.addEventListener('click', move)
newGameBtn.addEventListener('click', newGame)
backMoveBtn.addEventListener('click', backMove)
let deleteIndex  = false
let deleteQween = false
let qweenAnn = false
let arrAn = []
arrAn[0] = ['qween status', 'moveFirstIndex', 'moveSecondIndex',
 'black', 'fightIndex', 'fightQweenStatus', 'fightColor']
let moveStatus = false
let nextMove = 'white'
let nextMoveQween = false
let posiblyMove = true
let figthQween = false
let posibleFigth = false
whiteMove.classList.toggle('move__white')
let colorPeace
let deleteColor = false
let deleteCount = 0
let qween = false
let moveNumber = 1
let whiteFight = 12
let blackFight = 12
let time = false
const gameTime = 301
let secondsWhite 
let secondsBlack 
let intervalWhite
let intervalBlack
const arr = ['0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
endGame.onclick = () => {
  endGame.classList.remove('show__end')
  newGame()
}
createBoard()
createNewGame()
setTimer()

function newGame() {
  let arrBoard = document.querySelectorAll(`.square`)
  for(let item of arrBoard) {
    item.remove()
  } 
  let arrAnotation = document.querySelectorAll('.annotation__content > p')
  //console.log('', arrAnotation);
  arrAnotation.forEach(element => {
    element.remove()
  });
  if(whiteMove.classList.contains('move__white')) {
    whiteMove.classList.toggle('move__white')
    blackMove.classList.toggle('move__black')
    whiteTimer.classList.toggle('border')
    blackTimer.classList.toggle('border')
  }
  arrAn = []
  moveStatus = false
  nextMove = 'white'
  moveNumber = 1
  whiteFight = 12
  whiteNumber.textContent = whiteFight
  blackFight = 12
  blackNumber.textContent = blackFight
  time = false
  createBoard()
  createNewGame()
  setTimer()
}

function backMove() {
  let lastEl = arrAn[arrAn.length - 1]
  let subLastEl = arrAn[arrAn.length-2]
  removeAn()
  createNewEl(lastEl)
  if(lastEl[4]) {
    createDelEl(lastEl)
  }
  if(subLastEl[3] != lastEl[3]) {
    changeColorTimer()
  }
  document.querySelector(`.board-${+lastEl[1]}`).classList.remove('lighted')
  document.querySelector(`.board-${+lastEl[2]}`).classList.remove('lighted')
  
  document.querySelector(`.board-${+subLastEl[1]}`).classList.toggle('lighted')
  document.querySelector(`.board-${+subLastEl[2]}`).classList.toggle('lighted')
  
  
}

function removeAn() {
  const annContentForDdelete = document.querySelector('.annotation__content')
  //console.log('', annContentForDdelete);  
  annContentForDdelete.lastElementChild.remove()
}

function createDelEl(arr) {
  const delEl = document.querySelector(`.board-${arr[4]}`)
  const el = `
              <div class="${arr[6]}El ">
                <div class="${arr[6]}Center"> </div>
              </div>
            `
  delEl.insertAdjacentHTML('afterbegin', el)            
  delEl.classList.remove('empty')
  delEl.classList.add(`${arr[6]}-Peace`)    
  if(arr[5]) {
        delEl.classList.add('qween')
  }
  console.log('delEl[6 = color ',arr[6]);
  
  if(arr[6] == 'white') {
    whiteFight++
    whiteNumber.textContent = whiteFight
    console.log('add white');
    
  }
  if(arr[6] == 'black') {
    blackFight++
    blackNumber.textContent = blackFight
    console.log('add black');
    
  }
        //console.log('QWEEN');
        //console.log('targetIndex' , targetIndex);        
}

function createNewEl(arr) {
  const newEl = document.querySelector(`.board-${arr[1]}`)
  const delEl = document.querySelector(`.board-${arr[2]}`)
  delEl.firstElementChild.remove() 
     const el = `
              <div class="${arr[3]}El ">
                <div class="${arr[3]}Center"> </div>
              </div>
            `
      newEl.insertAdjacentHTML('afterbegin', el)            
      newEl.classList.remove('empty')
      newEl.classList.add(`${arr[3]}-Peace`)    
      if(arr[0]) {
        newEl.classList.add('qween')
        //delEl.classList.remove('qween')
        qween = true
      }
        //console.log('QWEEN');
        //console.log('targetIndex' , targetIndex);        
 
      delEl.classList.add('empty')
      delEl.classList.remove('qween')
      delEl.classList.remove(`${arr[3]}-Peace`)
      delEl.classList.remove('selected')
      moveNumber--
      arrAn.pop()
}

function rotateBoard() {
  board.classList.toggle('rotate')
  info.classList.toggle('rotate')
  centerInfo.classList.toggle('rotate')
  //rotateBtn.classList.toggle('rotate')
  whiteMove.classList.toggle('rotate')
  blackMove.classList.toggle('rotate')
  whiteNumber.classList.toggle('rotate')
  blackNumber.classList.toggle('rotate')
  whiteTimer.classList.toggle('rotate')
  blackTimer.classList.toggle('rotate')
  //whiteMove.textContent = whiteMove.textContent == 'black' ? 'white' : 'black'
  //blackMove.textContent = blackMove.textContent == 'black' ? 'white' : 'black'
}
function setTimer() {
  secondsWhite = gameTime
  secondsBlack = gameTime
  startTimerBlack()
  clearInterval(intervalBlack)
  startTimerWhite()
  clearInterval(intervalWhite)
}

function createBoard() {
  let color;
  const white = 'white'
  const black = 'black'
  for( let r = 8; r > 0; r--){
    for( let c = 1; c < 9; c++){
      color = (r + c) % 2 == 0 ? 'black' : 'white';
      //console.log(color);
      const square = `
        <div class="board-${r}${c} ${color} square" > 
         
        </div>
        `
      board.insertAdjacentHTML('beforeend', square)
      //board.insertAdjacentHTML('afterbegin', square)
    }
  }
}

function createNewGame() {
  moveNumber = 1
  let color;
  let colorN;
  for( let r = 8; r > 0; r--){
    for( let c = 1; c < 9; c++){
      if( r > 5 && (r + c ) % 2 !== 0) {
        color = 'black';
        colorN = 'white'
        const el = `
          <div class="${color}El">
            <div class="${color}Center"> </div>
          </div>
        `
        document.querySelector(`.board-${r}${c}`).insertAdjacentHTML('afterbegin', el)
        document.querySelector(`.board-${r}${c}`).classList.add(`${color}-Peace`)
      } else {
          if( r > 0 && r < 4 && (r + c) % 2 !== 0) {
            color = 'white';
            colorN = 'black'
            const el = `
              <div class="${color}El ">
                <div class="${color}Center"> </div>
              </div>
            `
            document.querySelector(`.board-${r}${c}`).insertAdjacentHTML('afterbegin', el)
            document.querySelector(`.board-${r}${c}`).classList.add(`${color}-Peace`)
          } else {
              document.querySelector(`.board-${r}${c}`).classList.add('empty')
            }
          }
    }
  }
}

function move(event) {  
  const target = event.target.closest('.square')
  const targetIndex = target.className.split(' ')[0].split('-')[1]
  //console.log('targetIndex= ' , +targetIndex - +moveStatus);
  if((+targetIndex - +moveStatus === -9 || +targetIndex - +moveStatus === -11 ) &&
      qween === false && colorPeace == 'white' &&
      !target.classList.contains(`white-Peace`) ) {
        return false
  }
  if((+targetIndex - +moveStatus === 9 || +targetIndex - +moveStatus === 11 ) &&
      qween === false && colorPeace == 'black' && 
      !target.classList.contains('black-Peace') ) {
        return false
  }

  if(target.classList.contains('black-Peace') && nextMove == 'black' ||
     target.classList.contains('white-Peace') && nextMove == 'white'){
      if (document.querySelector(`.selected`)) {
        document.querySelector('.selected').classList.remove('selected')       
      }
      target.classList.add('selected')
      if(target.classList.contains('qween')) {
        qween = true
        qweenAnn = true
      } else {
        qween = false
        qweenAnn = false
      }
      moveStatus = targetIndex 
      colorPeace = target.className.split(' ')[3].split('-')[0]

      //console.log(colorPeace);      
      //console.log('number ',moveStatus);    
  } else {
    if( compareEmpty(targetIndex, moveStatus, 1, target) && moveStatus) {
      //console.log('move');      
     // target.querySelector(`${[class$="El"]}`).remove()
      doMove(target, targetIndex)
    } else {
      beats(targetIndex, moveStatus,target)
    }
  }
  stopGame()
}

function compareEmpty(curInd, moveInd, step = 1, target) {
  if (qween) {
    if (target.classList.contains('empty')) {
      if ((+curInd - +moveInd) % 11 == 0 || (+curInd - + moveInd) % 9 == 0) {
        return true
      }
    }
  } 
  if ( target.classList.contains('empty') &&
     ( +curInd[0] + step == +moveInd[0] && +curInd[1] + step == +moveInd[1] ||
       +curInd[0] - step == +moveInd[0] && +curInd[1] - step == +moveInd[1] ||
       +curInd[0] - step == +moveInd[0] && +curInd[1] + step == +moveInd[1] ||
       +curInd[0] + step == +moveInd[0] && +curInd[1] - step == +moveInd[1] 
   )) { 
    //console.log('true');    
    return true
  } 
  
}

function compareBeats(curInd, moveInd) {
  let ind = [(+curInd[0] + +moveInd[0]) / 2, (+curInd[1] + +moveInd[1]) / 2]  
  ind = ind.join("")
  //console.log('posibleBeats' , ind);
  deleteColor = colorPeace == 'white' ? 'black' : 'white'
  const posibleBeats = document.querySelector(`.board-${ind}`) 
  //console.log(posibleBeats.classList.contains(`${deleteColor}-Peace`));   
  if( posibleBeats.classList.contains(`${deleteColor}-Peace`) ){
    return [ind, deleteColor]
  }
  return false
}
function findEmptyPeace(ind) {
  //console.log('findEmptyPeace', ind, deleteColor);

  if(document.querySelector(`.board-${ind}`) && 
     document.querySelector(`.board-${ind}`).classList.contains(`${colorPeace}-Peace`)){
        return false
  }
  
  if(document.querySelector(`.board-${ind}`) &&
     document.querySelector(`.board-${ind}`).classList.contains(`${deleteColor}-Peace`)) {
    if (posibleFigth == true) {
      posibleFigth = false
      return false
    } else {
        posibleFigth = true
    }
  }
  if(posibleFigth == true && document.querySelector(`.board-${ind}`) &&
     document.querySelector(`.board-${ind}`).classList.contains('empty')) {
      posibleFigth = false
      //console.log('return true', ind);      
      return true
  }
}

function findFigthQween(curInd ) {
  if(!nextMoveQween) {
    return false
  }
 // console.log('findFigthQween ', curInd);
  let step = 9
  let ind = +curInd
  let i = 1
  let boolen;
  
    while( ind + i * step < 89 ) {
      //console.log('(ind + i * step) % 10 != 0', (ind + i * step) % 10 != 0);      
      if((ind + i * step) % 10 != 0) {
        boolen = findEmptyPeace(ind + i * step)
        if (boolen === false) {
          break
        }
        if (boolen === true){
          return true
        }
      } else break
      i++
    }
    posibleFigth = false
    i = 1

    while( ind - i * step > 10) {
      //console.log('(ind - i * step) % 10 != 9', (ind - i * step) % 10 != 9);        
      if( (ind - i * step) % 10 != 9){
        boolen = findEmptyPeace(ind - i * step)
        if (boolen == false) {
          break
        }
        if (boolen == true){
          return true
        }
      } else break
      i++
    }
    posibleFigth = false
    i = 1

    step = 11
    while( ind + i * step < 89) {
      //console.log('(ind + i * step) % 10 != 9', (ind + i * step) % 10 != 9);
      if (( ind + i * step) % 10 != 9){      
        boolen = findEmptyPeace(ind + i * step)
        if (boolen == false) {
          break
        }
        if (boolen == true){
          return true
        }
      } else break
      i++
    }
    posibleFigth = false
    i = 1

    while( ind - i * step > 10) {
      //console.log('(ind - i * step) % 10 != 0', (ind - i * step) % 10 != 0);
      if (( ind - i * step) % 10 != 0){     
        boolen = findEmptyPeace(ind - i * step)
        if (boolen == false) {
          break
        }
        if (boolen == true){
          return true
        }        
      } else break
      i++
    }
    posibleFigth = false   
    return false 
}

function findPeace(ind) {
  let deleteIndex 
  deleteColor = colorPeace == 'white' ? 'black' : 'white'
  if (document.querySelector(`.board-${ind}`).classList.contains(`${colorPeace}-Peace`)) {
    posiblyMove = false
    return false
  }
  if (document.querySelector(`.board-${ind}`).classList.contains(`${deleteColor}-Peace`)) {
    //console.log('deleteCount in function', deleteCount);    
    deleteIndex = ind  
    const posibleBeats = document.querySelector(`.board-${ind}`) 
    //console.log(posibleBeats.classList.contains(`${deleteColor}-Peace`));   
    if( posibleBeats.classList.contains(`${deleteColor}-Peace`) ){
      //console.log('data ', [ind, deleteColor]);      
      return [ind, deleteColor]
    }
  }
  return false
}

function qweenMove(curInd, moveInd) { 
  //console.log('qweenBeatFunction ', deleteCount);    
  curInd = +curInd
  moveInd = +moveInd
  let data = []
  let ind = moveInd 
  let step = (curInd - moveInd) % 9 == 0 ? 9 : 11    
  while (curInd != ind ){
    if (curInd > moveInd) {
      ind = ind + step
      if (findPeace(ind)){
        data.push(findPeace(ind))
      } else if(!posiblyMove) {
        return false
      }
      //console.log('data+ ', data);      
    }
    if (curInd < moveInd) {
      ind = ind - step
      if(findPeace(ind)){
        data.push(findPeace(ind))
      } else  if(!posiblyMove){
        return false
      }
      //console.log('data-', data);      
    }
  }
  //console.log('data ', data);
  
  if (data.length == 1 ) {
    removePeace(data[0])
    nextMoveQween = true
  } else {
    if(data.length >  1){ 
      posiblyMove = false
    }
  }
  //console.log('deleteCount =', deleteCount);
  //console.log('posiblyMove =', posiblyMove);  
}

function beats (curInd, moveInd, target) {
    if(compareEmpty(curInd, moveInd, 2, target)) {
      let data = compareBeats( curInd, moveInd)
      if (data) {
        removePeace(data)
        doMove(target, curInd)
        //removePeace(data)
        beatsAgain(curInd, 11, 22)
        beatsAgain(curInd, -11, -22)
        beatsAgain(curInd, 9, 18)
        beatsAgain(curInd, -9, -18)
        if (moveStatus) {
          changeColorTimer()   
        }
      }
    } 
}

function beatsAgain(curInd, beatInd, emptyInd) {
  let posibleInd = +curInd + emptyInd
  if (posibleInd < 11 || posibleInd > 88 || 
      posibleInd % 10 == 0 || posibleInd % 10 == 9 ) {
    return false
  }
 // console.log('curInd ', curInd);
  //console.log('posibleIndex ', posibleInd);
  
  const posibleEmpty = document.querySelector(`.board-${posibleInd}`).
                       classList.contains('empty')
  //console.log('posiblyEmpty ', posibleEmpty);  
  if(document.querySelector(`.board-${+curInd + beatInd}`).
    classList.contains(`${deleteColor}-Peace`) && posibleEmpty) {
      document.querySelector(`.board-${curInd}`).classList.add('selected')
      moveStatus = curInd
  }
}

function removePeace(data) {
  const delPeace = document.querySelector(`.board-${data[0]}`)
  //console.log('deletePeace', delPeace);
  if(delPeace.classList.contains('qween')) {
    deleteIndex = +data[0]
    deleteQween = true
  } else { 
    deleteIndex = +data[0]
    deleteQween = false
  }
  delPeace.firstElementChild.remove()  
  delPeace.classList.add('empty')
  delPeace.classList.remove(`${data[1]}-Peace`)
  delPeace.classList.remove(`qween`)
  if (deleteColor == 'white') {
    whiteFight--
    whiteNumber.textContent = whiteFight
  } else {
    blackFight--
    blackNumber.textContent = blackFight
  }
  //nextMove = nextMove == 'white' ? 'black' : 'white'
  //console.log(delPeace);
}

function changeColorTimer () {
  nextMove = nextMove == 'white' ? 'black' : 'white'
  whiteMove.classList.toggle('move__white')
  blackMove.classList.toggle('move__black')  
  whiteTimer.classList.toggle('border')
  blackTimer.classList.toggle('border')
  
  if(whiteTimer.classList.contains('border')) {
    timerWhite()
    clearInterval(intervalBlack)        
  } else {
    timerBlack()
    clearInterval(intervalWhite)
  }
}

function doMove(target, targetIndex) {
    if (qween) { 
      qweenMove(targetIndex, moveStatus)     
      if( posiblyMove == false){
        //console.log('dont posible move');  
        posiblyMove = true      
        return false
      }      
    }   
  
     document.querySelector(`.board-${moveStatus}`).firstElementChild.remove() 
     const el = `
              <div class="${colorPeace}El ">
                <div class="${colorPeace}Center"> </div>
              </div>
            `
      target.insertAdjacentHTML('afterbegin', el)            
      target.classList.remove('empty')
      target.classList.add(`${colorPeace}-Peace`)    
      if(qween) {
        target.classList.add('qween')
      }
      if ((colorPeace == 'white' && +targetIndex > 80) || 
           (colorPeace == 'black' && +targetIndex < 20)){
        target.classList.add('qween')
        qween = true
        qweenAnn = true
        //console.log('QWEEN');
        //console.log('targetIndex' , targetIndex);        
      } 
      document.querySelector('.selected').classList.add('empty')
      document.querySelector('.selected').classList.remove('qween')
      document.querySelector('.selected').classList.remove(`${colorPeace}-Peace`)
      document.querySelector('.selected').classList.remove('selected')
      addMove(targetIndex, moveStatus)
      moveStatus = false
      changeColorTimer()
      if( qween && nextMoveQween) {
        if(findFigthQween(targetIndex)) {
          moveStatus = targetIndex
          target.classList.add('selected')
          changeColorTimer()       
        } 
        nextMoveQween = false
      } 
       //whiteMove.textContent = 'yo'     
      lightedSquare()
      console.log('move');      
}
function addMove(curInd, moveInd) {
  const text = `
    <p><span style="padding-right: 10px"> ${moveNumber}.</span>  ${arr[moveInd[1]]}${moveInd[0]}  : ${arr[curInd[1]]}${curInd[0]} </p>
  `
  anotationContent.insertAdjacentHTML('beforeend', text)
  arrAn[moveNumber] = [qweenAnn, moveInd ,curInd, colorPeace, deleteIndex, deleteQween, deleteColor] 
  console.log('', arrAn[moveNumber]);
  
  deleteIndex = false
  deleteQween = false 
  moveNumber++
  if(moveNumber > 3 ) {
    anotationContent.scrollBy(0, 31)
  }

}

function lightedSquare() {
  //console.log('', arrAn[moveNumber-1]);
  let indFirst = arrAn[moveNumber-1]
  document.querySelector(`.board-${+indFirst[1]}`).classList.toggle('lighted')
  document.querySelector(`.board-${+indFirst[2]}`).classList.toggle('lighted')
  
  if(moveNumber > 2) {
    indFirst = arrAn[moveNumber-2]
    //console.log('1= ', indFirst);  
    document.querySelector(`.board-${+indFirst[1]}`).classList.toggle('lighted')
    document.querySelector(`.board-${+indFirst[2]}`).classList.toggle('lighted')
  }
  //document.querySelector(`.board-${+indFirst[1]}`).classList.toggle('lighted')
}

function timerWhite() {
  //clearInterval(intervalWhite)
  //whiteTimerMinutes.innerHTML = `0${Math.floor(gameTime/60)}  :`
  //whiteTimerSeconds.innerHTML = gameTime % 60 > 9 ? 
  //                        `${gameTime % 60}` :
  //                        `0${gameTime % 60}`
  intervalWhite = setInterval( startTimerWhite, 1000)
}

function startTimerWhite() {
  secondsWhite--
  let seconds = secondsWhite
  if(seconds > 599) {
    whiteTimerMinutes.innerHTML = `${Math.floor(seconds/60)}:`
    whiteTimerSeconds.innerHTML = seconds % 60 > 9 ? 
    `${seconds % 60}` :
    `0${seconds % 60}`
  }
  if(seconds > 59 && seconds < 600) {
    whiteTimerMinutes.innerHTML = `0${Math.floor(seconds/60)}:`
    whiteTimerSeconds.innerHTML = seconds % 60 > 9 ? 
    `${seconds % 60}` :
    `0${seconds % 60}`
  }
  if( seconds < 60 ){
    whiteTimerMinutes.innerHTML = '00:'
    whiteTimerSeconds.innerHTML = `${seconds}`
  }
  
  if(seconds < 10) {
    whiteTimerMinutes.innerHTML = '00:'
    whiteTimerSeconds.innerHTML = `0${seconds}`
  } 

  if(seconds == 0) {
    console.log('seconds ', seconds);

    
   // whiteTimerMinutes.innerHTML = '00  :'
    //whiteTimerSeconds.innerHTML = `0${seconds}`
    clearInterval(intervalWhite)
    stopGame()
  }
}

function timerBlack() {
 // clearInterval(intervalBlack)
 // blackTimerMinutes.innerHTML = `0${Math.floor(gameTime/60)}  :`
  //blackTimerSeconds.innerHTML = gameTime % 60 > 9 ? 
   //                       `${gameTime % 60}` :
    //                      `0${gameTime % 60}`
  intervalBlack = setInterval( startTimerBlack, 1000)
}

function startTimerBlack() {
  
  secondsBlack--
  let seconds = secondsBlack
  if(seconds > 599) {
    blackTimerMinutes.innerHTML = `${Math.floor(seconds/60)}:`
    blackTimerSeconds.innerHTML = seconds % 60 > 9 ? 
    `${seconds % 60}` :
    `0${seconds % 60}`
  }
  if(seconds < 600 &&  seconds > 59)  {
    blackTimerMinutes.innerHTML = `0${Math.floor(seconds/60)}:`
    blackTimerSeconds.innerHTML = seconds % 60 > 9 ? 
    `${seconds % 60}` :
    `0${seconds % 60}`
  }
  if( seconds < 60 ){
    blackTimerMinutes.innerHTML = '00:'
    blackTimerSeconds.innerHTML = `${seconds}`
  }
  
  if(seconds < 10) {
    blackTimerMinutes.innerHTML = '00:'
    blackTimerSeconds.innerHTML = `0${seconds}`
  } 

  if(seconds == 0) {
    //blackTimerMinutes.innerHTML = '00  :'
    //blackTimerSeconds.innerHTML = `0${seconds}`
    stopGame()
    clearInterval(intervalBlack)
  }
}

function stopGame() {  
  if(secondsWhite == 0 || whiteFight == 0) {
    //alert('Time is over, Black wins!!!')
    clearInterval(intervalWhite)
    clearInterval(intervalBlack)
    endGameText.textContent = 'BLACK WIN !!!'
    endGame.classList.add('show__end')
  } else { 
    if (secondsBlack == 0 || blackFight == 0) {
      //alert('Time is over, White wins!!!')
      clearInterval(intervalWhite)
      clearInterval(intervalBlack)
      endGameText.textContent = 'WHITE WIN !!!'
      endGame.classList.add('show__end')
    }
  }  
  const message = 'white wins'
  const text = ` 
    <div clas="end__text"> ${message}</div>
  `
  //endGame.insertAdjacentHTML('afterbegin', text)
  
}
