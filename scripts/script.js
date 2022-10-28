import {Board} from "./BoardState.js"
StartGame()
document.getElementById("playAgain").addEventListener("click", () =>{
  document.getElementById("gameBoardContainer").style.display = "flex"
  gameOverContainer.style.display = "none"
  StartGame()
  
})
function StartGame(){
  const gameBoard = document.getElementById("gameBoard")
  const aiButton = document.getElementById("playAI")
  
  const board = new Board(gameBoard)


  board.loadBoard(handleClick)

  aiButton.addEventListener("click",() => {
    const playerID = board.getPlayerID()
    makeAIMove(playerID)
    // first get a player id
    // check all valid moves loop through
    // move the higest score
  })

  function makeAIMove(playerID){
    const currentAIMoves = []
    for(let col = 0; col< 8; col++){
      for(let row = 0; row< 8; row++){
        if(board.getButtonState(col,row) != 0){
          continue
        }else{
          const returnedArray = captureDiscs(col,row,playerID,false)
          if(!returnedArray.length){
            continue
          }
          if(!currentAIMoves.length){
            currentAIMoves.push(returnedArray)
            continue
          } else if(returnedArray.length > currentAIMoves.length){
            currentAIMoves.length = 0;
            currentAIMoves.push(returnedArray)
          }
        }
      }
    }

    flipDiscs(compareAIMove,playerID)
  }
  function handleClick(col,row){
    if(board.getButtonState(col,row) != 0){
      return
    }
    captureDiscs(col,row,true)
    board.loadDiscs()
  }

 function captureDiscs(col,row,toCapture){
  const playerID = board.getPlayerID()
 	const affectedDiscs = getAffectedDiscs(col,row,playerID);
     if(affectedDiscs.length > 0 && toCapture){
         affectedDiscs.push({col:col, row:row})
         flipDiscs(affectedDiscs,playerID)
         board.setPlayerID()
     } else if(!toCapture){
      return affectedDiscs;
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



}
