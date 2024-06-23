
function Gameboard() {
    const row = 3;
    const column = 3
    // board = [];

    // board = [
    //     ["1","2","3"],
    //     ["4","5","6"],
    //     ["7","8","9"],
    // ]
    board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["O", "X", ""],
    ]
    

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



    return { getBoard, placeMarker, printBoard };
}



// Function start the game and controls the game logic
function GameController() {
    const playerOneName = "Player 1";
    const playerTwoName = "Player 2";

    const game = Gameboard();

    const players = [
        {
            player: playerOneName,
            marker: "X"
        },
        {
            player: playerTwoName,
            marker: "O"
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
            // console.log(board[i].every(isThereMarker));
            tie = board[i].every(isThereMarker);
            // console.log(`Value of tie is ${tie}`);
            if(tie === false) {
                return tie;
            }
        }

        return tie;


    }

    // Play round
    const playRound = (row, col) => {
        game.placeMarker(row, col, getCurrentPlayer().marker);
        // checkForWin();
        if(checkForWin() === true) {
            console.log(`${getCurrentPlayer().player} has won!`);
        }
        if(checkForTie() === true) {
            console.log("There has been a tie! Restart if you will like to continue...")
        }

        switchPlayerTurn();
        printNextRound();

    }

    console.log(`It's ${getCurrentPlayer().player} turn...`)

    return { playRound, getCurrentPlayer};

}


const TicTacToeGame = GameController();