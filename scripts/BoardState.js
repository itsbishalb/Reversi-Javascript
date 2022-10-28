export class Board{
    constructor (gameBoard,LoadDisk){
        this.gameBoard = gameBoard
        this.playerID = 1
    }
     // 2 black / / 1 white
    boardState = [
        [1,1,1,1,1,2,2,0],
        [1,1,1,1,1,2,1,0],
        [1,1,1,1,1,2,1,0],
        [1,1,1,1,1,2,1,0],
        [1,1,1,1,1,2,1,0],
        [1,1,1,1,1,2,1,0],
        [1,1,1,1,1,2,1,0],
        [1,1,1,1,1,2,1,0]

         // [0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,0],
        // [0,0,0,2,1,0,0,0],
        // [0,0,0,1,2,0,0,0],
        // [0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,0],
        // [0,0,0,0,0,0,0,0]
    ]

   
    getButtonState(col,row){
        return this.boardState[col][row]
    }
    setButtonState(col,row,state){
        this.boardState[col][row] = state
    }

    getPlayerID(){
        return this.playerID
    }

    setPlayerID(){
        if(this.playerID == 1){
            this.playerID = 2
        }
        else{
            this.playerID = 1
        }
    }
    getLabelText(){
        const disc = this.playerID === 2 ? "White " : "Black "
        return  disc +  "Discs Turn"
    }


    loadDiscs(){
        document.getElementById("playerText").innerText = this.getLabelText()
        for(let col = 0; col< 8; col++){
          for(let row = 0; row< 8; row++){
              const boardSquare = document.getElementById(col.toString() + row.toString())
              boardSquare.innerHTML = this.getDiscHTML(this.getButtonState(row,col))
          }
        }
    }

    loadBoard(handleClick){
        document.getElementById ("gameoverContainer").style.display = "none"
        for(let col = 0; col< 8; col++){
            for(let row = 0; row< 8; row++){
                const boardSquare = document.createElement("div")
                boardSquare.className = "boardSquare"
                const id = row.toString() + col.toString()
                boardSquare.id= id
                boardSquare.addEventListener("click",() =>{
                    handleClick(col,row,false)
                })
                this.gameBoard.appendChild(boardSquare)
            }
        }
    this.loadDiscs()
    }



    getDiscHTML(id){
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


    checkGameOver (gameOver){
        let str = ""
        let whiteDiscsCount = 0
        let blackDiscsCount = 0

        for(let col = 0; col< 8; col++){
            for(let row = 0; row< 8; row++){
                if(this.getButtonState(col,row) === 1){
                    whiteDiscsCount ++
                } else if(this.getButtonState(col,row) === 2){
                    blackDiscsCount ++
                }
            }
        }

        if((whiteDiscsCount+blackDiscsCount == 64) || gameOver) {
            const gameOverContainer = document.getElementById ("gameoverContainer")
            if(blackDiscsCount == 0 || (whiteDiscsCount > blackDiscsCount)){
                str = "White Wins"
            } else if(whiteDiscsCount == 0 || (blackDiscsCount > whiteDiscsCount)){
                str = "Black Wins"
            }else if(whiteDiscsCount == blackDiscsCount){
                str = "Draw"
            }

            document.getElementById("gameOver").innerText = str
            document.getElementById("blackScore").innerText = blackDiscsCount
            document.getElementById("whiteScore").innerText = whiteDiscsCount
            document.getElementById("gameBoardContainer").style.display = "none"
            gameOverContainer.style.display = "flex"
        }
    }
}