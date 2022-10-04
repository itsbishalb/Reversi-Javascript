import {Board} from "./BoardState.js"


const gameBoard = document.getElementById("gameBoard")
const board = new Board(gameBoard)


  board.loadBoard(handleClick)

  function handleClick(col,row){
    let canMove = false
    if(board.getButtonState(col,row) != 0){
      return
    }
    captureDiscs(col,row)
    board.loadDiscs()
  }


// // state 0 = empty 1 = black  2 = white
// let whitePlayerTurn = false
// let playerID = 1
// function 



    
// }







// function flipDiscs(discsToFlip){
//  for(let i = 0; i < discsToFlip.length; i++){
//     let col = parseInt(discsToFlip[i].col)
//     let row = parseInt(discsToFlip[i].row)
//     gameBoardState[col][row] = playerID
//     LoadDisk()
//  }
// }

 function captureDiscs(col,row){
  const playerID = board.getPlayerID()
 	const affectedDiscs = getAffectedDiscs(col,row,playerID);
     if(affectedDiscs.length > 0){
         affectedDiscs.push({col:col, row:row})
         flipDiscs(affectedDiscs,playerID)
         board.setPlayerID()
     }
 }

 function flipDiscs(discsToFlip,playerID){
  for(let i = 0; i < discsToFlip.length; i++){
     let col = parseInt(discsToFlip[i].col)
     let row = parseInt(discsToFlip[i].row)
     board.setButtonState(col,row,playerID)
     board.loadDiscs()
  }

  board.checkGameOver()
 }


 function getAffectedDiscs(col,row,playerID){
  const affectedDiscs = new Array()
  const couldBeAffected = new Array()
 	let colCounter = col;
  let rowCounter = row;
  // check above the disc
  while(colCounter > 0) {
    colCounter -= 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 	 	couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }
  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  // check below the disc
  while(colCounter < 7) {
    colCounter += 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }

  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  // check right to the disc
  while(rowCounter < 7) {
    rowCounter += 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }

  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  // check right to the disc
  while(rowCounter > 0) {
    rowCounter -= 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }

  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  //Check down left
  while(colCounter < 7 && rowCounter < 7) {
    colCounter += 1;
		rowCounter += 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }

  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  //Check up left
  while(colCounter < 7 && rowCounter > 0) {
    colCounter += 1;
		rowCounter -= 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }


  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  //Check up right
  while(colCounter > 0 && rowCounter < 7) {
    colCounter -= 1;
		rowCounter += 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }

  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
  //Check down right
  while(colCounter > 0 && rowCounter > 0) {
    colCounter -= 1;
		rowCounter -= 1;
 		let val = board.getButtonState(colCounter,rowCounter)
 	  if(val === 0  || val === playerID) {    
      if(val === playerID)
        CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
      break;
 		}	
 		couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
  }




  return affectedDiscs

}

function CopyArray(affectedDisk, couldBeAffected){
  for(let i = 0; i < couldBeAffected.length; i++){
      affectedDisk.push(couldBeAffected[i])
  }
}
