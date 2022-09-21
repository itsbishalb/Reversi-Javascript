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
console.log(gameBoardState[0][0])
loadBoard()
function loadBoard(){
    for(let row = 0; row< 8; row++){
        for(let col = 0; col< 8; col++){
            const boardSquare = document.createElement("div")
            boardSquare.className = "boardSquare"
            const id = row.toString() + col.toString()
            boardSquare.id= id
            boardSquare.addEventListener("click",(event) =>{
                handleClick(row,col)
            })
            gameBoard.appendChild(boardSquare)
        }   
    }
    
    startDisk()
}

function handleClick(row,col){
let playerID = whitePlayerTurn ? 2 : 1
captureDiscs(row,col,playerID)
}

function startDisk(){
    for(let row = 0; row< 8; row++){
        for(let col = 0; col< 8; col++){
            const boardSquare = document.getElementById(row.toString() + col.toString())
            boardSquare.innerHTML = getDiscHTML(gameBoardState[row][col])
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



function flipDisk(diskToFlip){
 
}

function captureDiscs(col, row){
	let affectedDiscs = getAffectedDiscs(col,row);
	if(affectedDiscs.size() > 0) {
		if(capture) {
			// if player can click the spot and capture discs is true // flip discs
			boardState.setButtonStatus(col, row,playerID); 
			flipDiscs(affectedDiscs);
		}
		return true;
	}else
		return false;
}


function getAffectedDiscs(row,col){
    let affectedDisc = [[],[]]
	let rowCounter = row;
    let colCounter = col;

    let couldBeAffected= [[],[]]


    while(rowCounter < 7) {
		rowCounter += 1;
		let val = gameBoardState[col, rowCounter];
		if(val == 0  || val == playerID) {
			 if(val == playerID)
				 affectedDisc.addAll(couldBeAffected);	// break and add couldbe affected to affectedlist. 
			 break;
		}	
		else
			couldBeAffected.add(new Point(col,rowCounter)); //add current index to couldBeaffected
	}

}