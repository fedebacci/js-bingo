// DEBUG
// const maxNumber = 10;
const maxNumber = 90;
const minNumber = 1;
const extractedNumbers = [];
// DEBUG
// const bingoTableLength = 3;
const bingoTableLength = 15;


const players = [];
// * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
// * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
let playersCounter = 0;

const btnAddPlayer = document.getElementById('addPlayer');
const formAddPlayers = document.getElementById('addPlayers');
const btnSetupGame = document.getElementById('setupGame');
const btnStartGame = document.getElementById('startGame');
const btnNextTurn = document.getElementById('nextTurn');



btnAddPlayer.addEventListener('click', addPlayer);
btnSetupGame.addEventListener('click', setupGame);
// btnStartGame.addEventListener('click', startGame);






function addPlayer () {
    const newPlayer = {
        playerName: "",
        playerNumbers: []
    };
    console.debug("newPlayer", newPlayer);
    console.debug("players", players);
    
    const newPlayerInput = document.createElement('input');
    newPlayerInput.type = 'text';
    // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
    // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
    newPlayerInput.dataset.playerNumber = playersCounter + 1;
    playersCounter ++;
    newPlayerInput.classList.add('playerInput', 'form-control', 'mb-3');
    console.debug("newPlayerInput", newPlayerInput);

    formAddPlayers.appendChild(newPlayerInput);

    if (btnSetupGame.classList.contains('d-none')) {
        btnSetupGame.classList.remove('d-none');
    };
};


function setupGame () {
    const playerInputs = Array.prototype.slice.call(document.querySelectorAll('.playerInput'));
    console.debug("playerInputs", playerInputs);

    playerInputs.forEach(function(playerInput) {
        console.debug("playerInput", playerInput)
        console.debug("playerInput.value", playerInput.value)
        const isPlayerNamed = playerInput.value.length === 0 ? false : true;
        const isPlayerNameDuplicate = players.find((player) => player.playerName === playerInput.value);
        console.debug("isPlayerNamed", isPlayerNamed);
        console.debug("isPlayerNameDuplicate", isPlayerNameDuplicate);
        if (isPlayerNamed === true && isPlayerNameDuplicate === undefined) {
            setPlayerData(playerInput);
        } else if (isPlayerNamed === false) {
            // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
            // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
            alert(`Il giocatore numero ${playerInput.dataset.playerNumber} non ha un nome!`);
        } else {
            // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
            // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
            alert(`Il giocatore numero ${playerInput.dataset.playerNumber} è già stato inserito!`);
        };
    });
    
    console.table(players);


    if (players.length === 1) {
        const isPlayAlone = confirm('Vuoi giocare da solo contro il computer?');
        console.warn("isPlayAlone", isPlayAlone);
        if (isPlayAlone === true) {
            const newPlayer = {
                playerName: "computer",
                playerNumbers: []
            };
            generatePlayerNumbers(newPlayer);
            players.push(newPlayer);
        }
        console.table(players);
    } else {
        const computerPlayer = players.find((player) => player.playerName === 'computer');
        console.debug("computerPlayer", computerPlayer)
        if (computerPlayer !== undefined) {
            const isRemoveComputer = confirm('Il computer è presente come giocatore, vuoi rimuoverlo?');
            if (isRemoveComputer === true) {
                players.splice(players.indexOf(computerPlayer), 1);
            }
            console.table(players);
        };
    };
};



function setPlayerData(playerInput) {
    console.debug("playerInput", playerInput);

    const newPlayer = {
        playerName: playerInput.value,
        playerNumbers: []
    }

    generatePlayerNumbers(newPlayer);

    console.debug("newPlayer", newPlayer);
    players.push(newPlayer);
    console.table(players);
};



function generatePlayerNumbers(player) {
    while (player.playerNumbers.length < bingoTableLength) {
        const numberToAdd = getRandomNumber(maxNumber, minNumber);
        // console.debug("numberToAdd", numberToAdd);
        const isDuplicate = player.playerNumbers.includes(numberToAdd);
        // console.debug("isDuplicate", isDuplicate);
        if (isDuplicate === false) {
            player.playerNumbers.push(numberToAdd);
        };
    };
    player.playerNumbers.sort((number1, number2) => number1 > number2 ? 1 : -1);
}



function getRandomNumber (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};