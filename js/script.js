const gameBoard = document.getElementById("gameBoard")
const gameBoardState = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]





// state 0 = empty 1 = black  2 = white
let whitePlayerTurn = true
function getLabelText(){
    if(whitePlayerTurn){
        return "Black player Turn"
    }else if(!whitePlayerTurn){
        return "White Player Turn"
    }
}
loadBoard()
function loadBoard(){
    for(let row = 0; row< 8; row++){
        for(let col = 0; col< 8; col++){
            const boardSquare = document.createElement("div")
            boardSquare.className = "boardSquare"
            const id = row.toString() + col.toString()
            boardSquare.id= id
            boardSquare.addEventListener("click",() =>{
                handleClick(row,col)
            })
            gameBoard.appendChild(boardSquare)
        }   
    }
    LoadDisk()
}

function handleClick(col,row){
let playerID = 0

if(whitePlayerTurn){
    console.log("White Turn")
    playerID = 2
} else if(!whitePlayerTurn){
    console.log("Black Turn")
    playerID = 1
}
if(gameBoardState[col][row] === playerID){
    return
} else{
    captureDiscs(col,row,playerID)
}
    
}

function LoadDisk(){
    document.getElementById("playerText").innerText = getLabelText()
    for(let col = 0; col< 8; col++){
        for(let row = 0; row< 8; row++){
            const boardSquare = document.getElementById(col.toString() + row.toString())
            boardSquare.innerHTML = getDiscHTML(gameBoardState[col][row])
        }}
}

function getDiscHTML(id){
    if(id === 0){
        return ""
    }
    let discHTML = ""
    if (id === 1){
        discHTML = `<div class="circle black-circle"> </div>`
    }else{
        discHTML = `<div class="circle white-circle"> </div>`
    }
    return discHTML
}



function flipDiscs(discsToFlip,playerID){
 for(let i = 0; i < discsToFlip.length; i++){
    let col = parseInt(discsToFlip[i].col)
    let row = parseInt(discsToFlip[i].row)
    gameBoardState[col][row] = playerID
    LoadDisk()
 }
}

function captureDiscs(col, row,playerID){
	const affectedDiscs = getAffectedDiscs(col,row,playerID);
    if(affectedDiscs.length > 0){
        affectedDiscs.push({col:col,row:row})
        flipDiscs(affectedDiscs,playerID)
        whitePlayerTurn = !whitePlayerTurn
        console.log(affectedDiscs)
    }
	// if(affectedDiscs.size() > 0) {
	// 	if(capture) {
	// 		// if player can click the spot and capture discs is true // flip discs
	// 		boardState.setButtonStatus(col, row,playerID); 
	// 		flipDiscs(affectedDiscs);
	// 	}
	// 	return true;
	// }else
	// 	return false;
}


function getAffectedDiscs(col,row,playerID){
    const affectedDiscs = new Array()
	let rowCounter = row;
    let colCounter = col;
    let couldBeAffected = new Array()

     // check left of the disc
     while(rowCounter < 7) {
		rowCounter += 1;
		let val = gameBoardState[col] [rowCounter];
		if(val === 0  || val === playerID) {     
			 if(val == playerID)
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
			 break;
		}	
		else
			couldBeAffected.push({col: col, row: rowCounter}); //add current index to couldBeaffected
	}

    couldBeAffected.length = 0
    rowCounter = row;

    couldBeAffected.length = 0
    rowCounter = row;

    // check left of the disc
    while(rowCounter > 0) {
		rowCounter -= 1;
        let val = gameBoardState[col] [rowCounter];
		if(val == 0  || val == playerID) {
			 if(val == playerID)
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
			 break;
		}	
		else
			couldBeAffected.push({col: col, row: rowCounter}); //add current index to couldBeaffected
	}


    couldBeAffected.length = 0
    colCounter = col;
    // check above of the disc
    while(colCounter > 0) {
		colCounter -= 1;
        let val = gameBoardState[colCounter] [row];
		if(val == 0  || val == playerID) {
			 if(val == playerID)
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
			 break;
		}	
		else
			couldBeAffected.push({col: colCounter, row: row}); //add current index to couldBeaffected
	}


    couldBeAffected.length = 0
    colCounter = col;
    // check below of the disc
    while(colCounter < 7) {
		colCounter += 1;
		let val = gameBoardState[colCounter][row];
		if(val == 0  || val == playerID) {
			 if(val == playerID)
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
			 break;
		}	
		else
			couldBeAffected.push({col: colCounter, row: row}); //add current index to couldBeaffected
	}

    
     //Check down right
     couldBeAffected.length = 0
     colCounter = col;
     rowCounter = row;

     while(colCounter < 7 && rowCounter < 7) {
         colCounter += 1;
         rowCounter += 1;
         let val = gameBoardState[colCounter][rowCounter];
         if(val == 0  || val == playerID) {
             if(val == playerID){
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
             } 
             break;
        }	
        else
            couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
     }

        //Check down Left
    couldBeAffected.length = 0
    colCounter = col;
    rowCounter = row;

    while(colCounter < 7 && rowCounter > 0) {
        colCounter += 1;
        rowCounter -= 1;

        let val = gameBoardState[colCounter][rowCounter];
        if(val == 0  || val == playerID) {
            if(val == playerID)
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
            break;
        }	
        else
            couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
    }

        
    //Check up Left
    couldBeAffected.length = 0
    colCounter = col;
    rowCounter = row;

    while(colCounter > 0 && rowCounter > 0) {
        colCounter -= 1;
        rowCounter -= 1;
        let val = gameBoardState[colCounter][rowCounter];
        if(val == 0  || val == playerID) {
            if(val == playerID)
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
            break;
        }	
        else
            couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
    }

  //Check up right
  couldBeAffected.length = 0
  colCounter = col;
  rowCounter = row;
 
  while(colCounter > 0 && rowCounter < 7) {
      colCounter -= 1;
      rowCounter += 1;
        let val = gameBoardState[colCounter][rowCounter];
        if(val == 0  || val == playerID) {
            if(val == playerID){}
                CopyArray(affectedDiscs, couldBeAffected)	// break and add couldbe affected to affectedlist. 
            break;
        }	
        else
            couldBeAffected.push({col: colCounter, row: rowCounter}); //add current index to couldBeaffected
    }
 
return affectedDiscs
}



function CopyArray(affectedDisk, couldBeAffected){
    for(let i = 0; i < couldBeAffected.length; i++){
        affectedDisk.push(couldBeAffected[i])
    }
}