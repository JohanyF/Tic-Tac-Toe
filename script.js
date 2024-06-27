
function Gameboard() {
    const row = 3;
    const column = 3
    // board = [];

    board = [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"],
    ]
    // board = [
    //     ["X", "O", "X"],
    //     ["O", "X", "O"],
    //     ["O", "X", ""],
    // ]
    

    // let num = 0;
    // for(let i = 0; i < row; i++) {
    //     board[i] = [];
    //     for(let j = 0; j < column; j++) {
    //         board[i][j] = num;
    //         num++;
    //     }
    // }

    // return the board
    const getBoard = () => board;

    //Places a marker based on give player (One Player will have marker "X" and other player will have "O");
    const placeMarker = (row, col, player) => {
        board[row][col] = player;
    }

    const printBoard = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                console.log(`${board[i][j]}`);
            }
            // console.log("\n");
        }
    }

    const resetBoard = () => {
        board = [
            ["1","2","3"],
            ["4","5","6"],
            ["7","8","9"],
        ]
    }



    return { getBoard, placeMarker, printBoard, resetBoard };
}

// Function start the game and controls the game logic
const GameController = (() => {
    const playerOneName = "Player 1";
    const playerTwoName = "Player 2";
    let isGameOver = false;

    const game = Gameboard();

    const players = [
        {
            player: playerOneName,
            marker: "X",
            score: 0
        },
        {
            player: playerTwoName,
            marker: "O",
            score: 0
        }
    ]

    // Active Player Turn
    let activePlayerTurn = players[0];
    // console.log(activePlayerTurn);

    //function that alternates between which Player turn it is
    const switchPlayerTurn = () => activePlayerTurn === players[0] ? activePlayerTurn = players[1] : activePlayerTurn = players[0];

    const printNextRound = () => {
        console.log(game.getBoard());
        console.log(`${getCurrentPlayer().player} turn...`)
        displayController.displayWhoTurnMessage(getCurrentPlayer().player);
    }

    const getCurrentPlayer = () => activePlayerTurn

    // Checks is a player has won or if the game had ended up in a draw
    const checkForWin = () => {
        const board = game.getBoard();
        for(let i = 0; i < 3; i++) {
            
            if(board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                console.log("COL SAME");
                return true;
            } else if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                console.log("ROW SAME");
                return true;
            }

            if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
                console.log("DIAGONAL &");
                return true;
            } else if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
                console.log("Diagonal /");
                return true;
            }
        }

        console.log("NOBODY HAS WON YET...");
        return false;
    }

    const checkForTie = () => {
        const board = game.getBoard();

        let tie = false;

        const isThereMarker = (marker) => {
            return marker == "X" || marker === "O";
        }

        for(let i = 0; i < 3; i++) {
            tie = board[i].every(isThereMarker);
            if(tie === false) {
                return tie;
            }
        }

        return tie;
    }

    // Play round
    const playRound = (row, col) => {
        // game.placeMarker(row, col, getCurrentPlayer().marker);
        game.placeMarker(row, col, activePlayerTurn.marker);

        if(checkForWin() === true) {
            console.log(`${activePlayerTurn.player} has won!`);
            console.log(activePlayerTurn.score);
            activePlayerTurn.score++
            console.log(activePlayerTurn.score);
            isGameOver = true;
            displayController.displayWinnerMessage();
            displayController.displayScore(players[0].score, players[1].score);
            console.log(activePlayerTurn.player);
        } else if(checkForTie() === true) {
            console.log("There has been a tie! Restart if you will like to continue...")
            isGameOver = true;
            displayController.displayTieMessage();
        } else {
            switchPlayerTurn();
            printNextRound();
        }


    }

    const restartGame = () => {
        // clear board (The array board, the diplayController will handle the html stuff)
        // set player's score to 0
        // set activePlayerTurn to player1 
        game.resetBoard();
        players[0].score = 0;
        players[1].score = 0;
        activePlayerTurn = players[0];
        console.log(activePlayerTurn);
        console.log(players[0]);
        isGameOver = false;


    }

    const rematch = () => {
        game.resetBoard();
        switchPlayerTurn();
        isGameOver = false;
    }

    const getIsGameOver = () => isGameOver;

    console.log(`It's ${getCurrentPlayer().player} turn...`)

    return { playRound, restartGame, rematch, getCurrentPlayer, getIsGameOver };

})();

// const TicTacToeGame = GameController();

const displayController = (() => {
    const btns = document.querySelectorAll(".btn-cell");
    const message = document.querySelector(".message");
    const player1ScoreElem = document.querySelector("#player-1");
    const player2ScoreElem = document.querySelector("#player-2");

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if(GameController.getIsGameOver() === true) return;
            console.log("CLICK");
            message.textContent = `${GameController.getCurrentPlayer().player} Turn...`;
            // console.log(`${GameController.getCurrentPlayer().marker}`);
            btn.textContent = GameController.getCurrentPlayer().marker;
            if(btn.textContent === "X" || btn.textContent === "O") {
                btn.disabled = true;
            } 
            GameController.playRound(btn.getAttribute("data-row"), btn.getAttribute("data-col"));
        })
    })

    const displayWinnerMessage = () => {
        message.textContent = `${GameController.getCurrentPlayer().player} has won!`;

    }

    const displayTieMessage = () => {
        message.textContent = "There has been a tie...";
    }

    const displayWhoTurnMessage = (player) => {
        message.textContent = `${player} Turn...`;
    }

    const displayScore = (player1Score, player2Score) => {
        player1ScoreElem.textContent = player1Score;
        player2ScoreElem.textContent = player2Score;
    } 

    const removeMarkers = () => {
        btns.forEach((btn) => {
            btn.textContent = "";
            btn.disabled = false;
        })
    }


    const restartBtn = document.querySelector(".restart-btn");
    restartBtn.addEventListener("click", () => {
        GameController.restartGame();
        removeMarkers();
        displayWhoTurnMessage(GameController.getCurrentPlayer().player);
        player1ScoreElem.textContent = 0;
        player2ScoreElem.textContent = 0;

    })
    const rematchBtn = document.querySelector(".rematch-btn");
    rematchBtn.addEventListener("click", () => {
        GameController.rematch();
        removeMarkers();
        displayWhoTurnMessage(GameController.getCurrentPlayer().player);
    })
    return { displayWinnerMessage, displayTieMessage, displayWhoTurnMessage, displayScore };
    
})();


// TODO: Just focus on the HTML/CSS Now
// Create a modal/dialog that pop up when a match is over and display the two buttons for user

const dialog = document.querySelector("dialog");
// console.log(dialog);
// dialog.showModal();
