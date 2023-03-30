const fields = Array.from(document.querySelectorAll('.field'));
const DisplayCurrentPlayer = document.querySelector('.currentPlayer'); 
const ResetButton = document.querySelector('#ResetButton');
const announcer = document.querySelector('#announcer');
const currentPlayerAnnouncer = document.querySelector('#currentPlayerAnnouncer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winConditions = 
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const CheckPositionsInList = (character, ListOfPositions, List) =>{
    for (let index = 0; index < ListOfPositions.length; index++) {
        if (List[ListOfPositions[index]] !== character) {
            return false;
        } 
    }
    return true;
}

const DidTheyWin = () =>{
    for (let index = 0; index < winConditions.length; index++) {
        if (CheckPositionsInList(currentPlayer, winConditions[index], board)) {
            return winConditions[index];
        }
        
    }
    return null;
}

const changePlayer = () => {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
        DisplayCurrentPlayer.innerText = 'O';
    } else {
        currentPlayer = 'X';
        DisplayCurrentPlayer.innerText = 'X'
    }
}

const AvailableSpace = () => {
    let count = 0;
    for (let index = 0; index < board.length; index++) {
        if (board[index] === 'X' || board[index] === 'O'){
            count++;
            console.log(count);
        }
    }
    return count;
}


const PlayerAction = (field, index) => {
    if (isGameActive && field.innerText !== 'X' && field.innerText !== 'O'){
        field.innerText = currentPlayer;
        board[index] = currentPlayer;
        
        let Response = DidTheyWin();
        if (Response !== null) {
            isGameActive = false;
            currentPlayerAnnouncer.classList.add('hide');
            announcer.classList.remove('hide');
            announcer.innerText ='Player ' + currentPlayer + ' WON in position ' + Response;
        } else if(AvailableSpace()==9){
            isGameActive = false;
            announcer.innerText ="it's a tie";
            currentPlayerAnnouncer.classList.add('hide');
            announcer.classList.remove('hide');
            
        }
        
        changePlayer();           
    }
}

fields.forEach((field, index) => field.addEventListener('click', () => PlayerAction(field, index)));


ResetButton.addEventListener('click', () => {
    announcer.classList.add('hide');
    currentPlayerAnnouncer.classList.remove('hide');

    fields.forEach(element => {
        element.innerText = '';
    });

    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
})