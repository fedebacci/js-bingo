// Va implementata una partita a tombola, tra 1 giocatore e 1 pc.
// Vanno quindi estratti a caso 15 numeri, per la cartella del giocatore e per la cartella del pc.
// In seguito vanno estratti a caso dei numeri, fino a che uno dei due giocatori non vince la partita.


// POSSO FARE L'ESTRAZIONE TRA 1 E 90 IN VERSIONE DIGITALE
// * TODO: IN ALTERNATIVA, PER FARLO CON UNA LOGICA PIU SIMILE A QUELLA REALE, POSSO FARLO CON UN ARRAY CONTENENTE I NUMERI DA CUI LI RIMUOVO UNA VOLTA ESTRATI (EVENTUALMENTE da fare in versione 3)

// DEBUG
// const maxNumber = 10;
const maxNumber = 90;
const minNumber = 1;
const extractedNumbers = [];
// DEBUG
// const bingoTableLength = 3;
const bingoTableLength = 15;
const userNumbers = [];
const computerNumbers = [];

const btnStartGame = document.getElementById('startGame');
const btnNextTurn = document.getElementById('nextTurn');


btnStartGame.addEventListener('click', ()=> {
    console.clear();

    resetGameData();

    // console.debug("GENERO PER UTENTE")
    generateBingoTable(userNumbers, "user");
    console.debug("userNumbers:")
    console.table(userNumbers);
    // console.debug("GENERO PER COMPUTER")
    generateBingoTable(computerNumbers, "computer");
    console.debug("computerNumbers:")
    console.table(computerNumbers);

    if (btnNextTurn.classList.contains('d-none')) {
        btnNextTurn.classList.remove('d-none');
    };
});

btnNextTurn.addEventListener('click', () => {
    advanceTurns();
});



function generateBingoTable(bingoTable, userName) {
    console.debug("Genero la tabella dei numeri di:", userName);
    // console.debug("bingoTable", bingoTable);
    // console.debug("bingoTable.length", bingoTable.length);
    while (bingoTable.length < bingoTableLength) {
        const numberToAdd = getRandomNumber(maxNumber, minNumber);
        // console.debug("numberToAdd", numberToAdd);
        const isDuplicate = bingoTable.includes(numberToAdd);
        // console.debug("isDuplicate", isDuplicate);
        if (isDuplicate === false) {
            bingoTable.push(numberToAdd);
        };
    };
    bingoTable.sort((number1, number2) => number1 > number2 ? 1 : -1);
    // console.table(bingoTable);
}





function advanceTurns() {
    const extractedNumber = getRandomNumber(maxNumber, minNumber);
    const numberAlreadyExtracted = extractedNumbers.includes(extractedNumber);
    // console.log("numberAlreadyExtracted", numberAlreadyExtracted);
    
    if (numberAlreadyExtracted === false) {
        console.log("extractedNumber", extractedNumber);
        extractedNumbers.push(extractedNumber);
        checkForExtractedNumber(userNumbers, extractedNumber, "user");
        checkForExtractedNumber(computerNumbers, extractedNumber, "computer");
    
        checkForVictory();
    } else {
        advanceTurns();
    };
};

function checkForExtractedNumber(bingoTable, extractedNumber, userName) {
    // console.warn("Controllo la presenza per:", userName);
    // console.warn("checkForExtractedNumber(bingoTable)", bingoTable);
    const numberFound = bingoTable.includes(extractedNumber);
    // console.debug("numberFound", numberFound);

    if (numberFound === true) {
        bingoTable.splice(bingoTable.indexOf(extractedNumber), 1);
        console.debug(`bingoTable di: ${userName}`, bingoTable);
    };
};

function checkForVictory() {
    // console.warn("checkForVictory");
    const userVictory = userNumbers.length === 0 ? true : false;
    const computerVictory = computerNumbers.length === 0 ? true : false;
    let isSomebodyVictory = userNumbers.length === 0 || computerNumbers.length === 0 ? true : false;

    if (isSomebodyVictory) {
        if (userVictory === true && computerVictory === true) {
            alert("Pareggio!");
        } else if (userVictory === true) {
            alert("Hai vinto!");
        } else if (computerVictory === true) {
            alert("Hai perso!");
        };
    
        console.warn("RISULTATI:");
        console.debug("userNumbers:", userNumbers);
        console.debug("computerNumbers:", computerNumbers);
        console.debug("Numero di turni eseguiti:", extractedNumbers.length);
        console.debug("extractedNumbers in ordine di estrazione:", extractedNumbers);
        console.debug("extractedNumbers in ordine di grandezza:", extractedNumbers.sort((number1, number2) => number1 > number2 ? 1 : -1));

        resetGameData();
    };
};











function resetGameData() {
    userNumbers.length = 0;
    computerNumbers.length = 0;
    extractedNumbers.length = 0;
    btnNextTurn.classList.add('d-none');
}


function getRandomNumber (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};