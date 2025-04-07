// DEBUG
const maxNumber = 10;
// const maxNumber = 90;
const minNumber = 1;
const extractedNumbers = [];
// DEBUG
const bingoTableLength = 3;
// const bingoTableLength = 15;


const players = [];
// // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
// // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
// let playersCounter = 0;

const btnAddPlayer = document.getElementById('addPlayer');
const formAddPlayers = document.getElementById('addPlayers');
const playersDataContainer = document.getElementById('playersDataContainer');
const btnSetupGame = document.getElementById('setupGame');
// const btnStartNewGame = document.getElementById('startNewGame');
const btnNextTurn = document.getElementById('nextTurn');



btnAddPlayer.addEventListener('click', addPlayer);
btnSetupGame.addEventListener('click', setupGame);
// btnStartNewGame.addEventListener('click', startNewGame);
btnNextTurn.addEventListener('click', advanceTurns);






function addPlayer () {
    const newPlayer = {
        playerName: "",
        playerNumbers: []
    };
    // console.debug("newPlayer", newPlayer);
    // console.debug("players", players);
    
    const newPlayerInput = document.createElement('input');
    newPlayerInput.type = 'text';
    // // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
    // // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
    // newPlayerInput.dataset.playerNumber = playersCounter + 1;
    // playersCounter ++;
    newPlayerInput.classList.add('playerInput', 'form-control', 'mb-3');
    // console.debug("newPlayerInput", newPlayerInput);

    formAddPlayers.appendChild(newPlayerInput);

    if (btnSetupGame.classList.contains('d-none')) {
        btnSetupGame.classList.remove('d-none');
    };
};


function setupGame () {

    // * TODO (#2) DECIDERE SE VA BENE GESTITO IN QUESTO MODO
    if (players.length !== 0) {
        players.length = 0;
    };

    const playerInputs = Array.prototype.slice.call(document.querySelectorAll('.playerInput'));
    // console.debug("playerInputs", playerInputs);
    let isSetupProblem = false;

    playerInputs.forEach(function(playerInput) {
        // console.debug("playerInput", playerInput)
        // console.debug("playerInput.value", playerInput.value)
        const isPlayerNamed = playerInput.value.length === 0 ? false : true;
        const isPlayerNameDuplicate = players.find((player) => player.playerName === playerInput.value);
        // console.debug("isPlayerNamed", isPlayerNamed);
        // console.debug("isPlayerNameDuplicate", isPlayerNameDuplicate);
        if (isPlayerNamed === true && isPlayerNameDuplicate === undefined) {
            setPlayerData(playerInput);
        } else if (isPlayerNamed === false) {
            // // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
            // // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
            // alert(`Il giocatore numero ${playerInput.dataset.playerNumber} non ha un nome!`);
            alert("Un giocatore non ha il nome!");
            isSetupProblem = true;
        } else {
            // // * TODO (#1) CAPIRE SE SERVE DAVVERO, CARINO DIRE QUALE GIOCATORE NON HA NOME O VIENE RIPETUTO, MA SERVE SOLO A QUELLO
            // // * SE VOGLIO PERMETTERE DI RIMUOVERE INPUT PER GIOCATORI DIVENTA UN PROBLEMA DA RISOLVERE
            // alert(`Il giocatore numero ${playerInput.dataset.playerNumber} è già stato inserito!`);
            alert(`Il giocatore ${playerInput.value} è già stato inserito!`);
            isSetupProblem = true;
        };
    });
    
    // console.table(players);



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
            showNextTurnButton();
            hideGameSetup();
        };
    } else {
        // * TODO(#3) CONTROLLARE
        // RESETTANDO I PLAYERS QUANDO FACCIO IL SETUP NON DOVREBBE PIU ACCADERE CHE RIMANGA IL COMPUTER
        const computerPlayer = players.find((player) => player.playerName === 'computer');
        console.debug("computerPlayer", computerPlayer);
        if (computerPlayer !== undefined) {
            const isRemoveComputer = confirm('Il computer è presente come giocatore, vuoi rimuoverlo?');
            if (isRemoveComputer === true) {
                players.splice(players.indexOf(computerPlayer), 1);
            };
        };
        if (isSetupProblem === false) {
            showNextTurnButton();
            hideGameSetup();
        };
    };
    console.table(players);
};



function setPlayerData(playerInput) {
    console.debug("playerInput", playerInput);

    const newPlayer = {
        playerName: playerInput.value,
        playerNumbers: []
    }

    generatePlayerNumbers(newPlayer);

    // console.debug("newPlayer", newPlayer);
    players.push(newPlayer);
    // console.table(players);
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



// function showStartNewGameButton() {
//     if (btnStartNewGame.classList.contains('d-none')) {
//         btnStartNewGame.classList.remove('d-none');
//     };
// };
// function startNewGame() {
//     console.warn("startNewGame");
// }
    

function advanceTurns() {
    console.warn("advanceTurns");
    const extractedNumber = getRandomNumber(maxNumber, minNumber);
    const numberAlreadyExtracted = extractedNumbers.includes(extractedNumber);
    console.debug("extractedNumber", extractedNumber);
    console.debug("numberAlreadyExtracted", numberAlreadyExtracted);
    
    if (numberAlreadyExtracted === false) {
        console.debug("extractedNumber", extractedNumber);
        extractedNumbers.push(extractedNumber);
        players.forEach((player) => checkForExtractedNumber(player, extractedNumber))
    
        checkForVictory();
    } else {
        advanceTurns();
    };
};


function checkForExtractedNumber(player, extractedNumber) {
    // console.warn("Controllo la presenza per:", player.playerName);
    // console.warn("checkForExtractedNumber(player.playerNumbers)", player.playerNumbers);
    const numberFound = player.playerNumbers.includes(extractedNumber);
    // console.debug("numberFound", numberFound);

    if (numberFound === true) {
        player.playerNumbers.splice(player.playerNumbers.indexOf(extractedNumber), 1);
        console.debug(`bingoTable di: ${player.playerName}`, player.playerNumbers);
    };
};



function checkForVictory() {
    // // DEBUG
    // players[0].playerNumbers.length = 0;
    // players[2].playerNumbers.length = 0;

    const playersWhoWon = players.filter((player) => player.playerNumbers.length === 0);
    // console.log("playersWhoWon", playersWhoWon);

    if (playersWhoWon.length !== 0) {
        playersWhoWon.forEach(function(playerWhoWon) {
            alert(`${playerWhoWon.playerName} ha fatto tombola!`);
        });

        console.warn("RISULTATI:");
        console.debug("Numero di turni eseguiti:", extractedNumbers.length);
        console.debug("extractedNumbers in ordine di estrazione:", extractedNumbers);
        console.debug("extractedNumbers in ordine di grandezza:", extractedNumbers.sort((number1, number2) => number1 > number2 ? 1 : -1));

        if (!btnNextTurn.classList.contains('d-none')) {
            btnNextTurn.classList.add('d-none');
        };
        showGameSetup();
    };

    // * TODO (3)
    // * INSERIRE UN PULSANTE PER RESETTARE COMPLETAMENTE ED UNO PER INIZIARE UNA NUOVA PARTITA MANTENENDO GLI STESSI GIOCATORI
    // resetGameData();
};

// function resetGameData() {
//     players.length = 0;
//     extractedNumbers.length = 0;
//     btnNextTurn.classList.add('d-none');
// }



function showNextTurnButton() {
    if (btnNextTurn.classList.contains('d-none')) {
        btnNextTurn.classList.remove('d-none');
    };
};
function hideGameSetup() {
    if (!btnSetupGame.classList.contains('d-none')) {
        btnSetupGame.classList.add('d-none');
    };
    if (!formAddPlayers.classList.contains('d-none')) {
        formAddPlayers.classList.add('d-none');
    };
    if (!btnAddPlayer.classList.contains('d-none')) {
        btnAddPlayer.classList.add('d-none');
    };
};
function showGameSetup() {
    if (btnSetupGame.classList.contains('d-none')) {
        btnSetupGame.classList.remove('d-none');
    };
    if (formAddPlayers.classList.contains('d-none')) {
        formAddPlayers.classList.remove('d-none');
    };
    if (btnAddPlayer.classList.contains('d-none')) {
        btnAddPlayer.classList.remove('d-none');
    };
};


function getRandomNumber (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};