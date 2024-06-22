
function Gameboard() {
    const row = 3;
    const column = 3
    board = [];

    for(let i = 0; i < row; i++) {
        board[i] = [];
        for(let j = 0; j < column; j++) {
            board[i][j] = " ";
            // board[i].push(Cell());
        }
    }

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
    const statusOfGame = () => {

    }

    // Play round
    const playRound = (row, col) => {
        game.placeMarker(row, col, getCurrentPlayer().marker);

        switchPlayerTurn();
        printNextRound();

    }

    console.log(`It's ${getCurrentPlayer().player} turn...`)

    return { playRound, getCurrentPlayer };

}


const TicTacToeGame = GameController();