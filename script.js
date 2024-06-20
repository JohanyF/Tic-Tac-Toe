// Some NOTES 

// Store the gameboard as an array inside Gameboard object

// Players stored in objects

// Want an object that control the flow of the game itself

// function creates the Tic Tac Toe Board
function Gameboard() {
    board = [];

    for(let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; j++) {
            board[i][j] = " ";
        }
    }

    // return the board
    const getBoard = () => board;

    // TOD: Create function that drops a marker based on give player (One Player will have marker "X" and other player will have "O");
    const dropMarker = (marker, player) => {

    }

    return { getBoard, dropMarker };
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

    // TODO: create function that alternates between which Player turn it is

    // TODO: Play round

    console.log(game.getBoard());

}


const TicTacToeGame = ControlGame();