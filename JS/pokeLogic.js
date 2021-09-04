var pokeNum = 1; // number of pokemon
var pokeNames = [];// array to save names (size 9)
var pokeData = [];// array to save only importan data (size 9)
var imgPokemon = [];// array to save img url (size 9)
var bufferPokemon = [];// array save all json of pokemon (size 9)
var click = 0;// clicks
var numerCard = 0;// number of card

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// share API and web
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    start();
})

// get data from API
const fetchData = async () => {
    try {
        var i = 0;

        // get data onli nine pokemon per turn
        while (i < 9) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
            const data = await res.json();
            bufferPokemon[i] = await data;
            pokeNum++;
            i++;
        }
        if (click != 0) {
            await sleep(1000);
        }
        // pain set name and save importan data 0-9
        for (let index = 0; index < bufferPokemon.length; index++) {
            paintCrad(bufferPokemon[index]);
            numerCard++;
        }
        numerCard = 0;// restar 
        readyData();// enable button
        managerButton();// disable button by clicks

    } catch (error) {
        console.log(error);
    }

}

// paint pokemon in pokedex table 
const paintCrad = (pData) => {
    var image = document.getElementById('container' + numerCard.toString());
    image.src = pData.sprites.other.dream_world.front_default;
    imgPokemon[numerCard] = pData.sprites.other.dream_world.front_default;// save pokemon image
    image.style.width = '15vh';
    image.style.height = '15vh';
    setData(pData);
}

// save only importan data
const setData = (pData) => {
    var i = 0;
    var BreakException = {};

    var strgData =
        "Name : " + pData.name + "<br><br>" +
        "weight: " + pData.weight + "<br><br>" +
        "height: " + pData.height + "<br><br>" +
        "Moves: ";

    try {
        pData.moves.forEach(element => {
            if (i == 2) {
                strgData += element.move.name + "<br><br>"
                throw BreakException;
            } else {
                strgData += element.move.name + ",";
                i++;
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }

    strgData += "Type: "

    var j = 1;
    var len = pData.types.length;
    try {
        pData.types.forEach(element => {
            if (len == j) {
                strgData += element.type.name;
                throw BreakException;
            } else {
                j++;
                strgData += element.type.name + ",";
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }

    pokeData[numerCard] = strgData; // array to save only importan data (size 9)
    pokeNames[numerCard] = pData.name;// array to save names (size 9)
    pokeName = pData.name;
    numIndex = 'p' + (numerCard);
    document.getElementById(numIndex).innerHTML = pokeName;//set poke name
}

// reset
function home() {
    pokeNum = 1; // number of pokemon
    click = 0;// clicks
    numerCard = 0;// number of card
    fetchData();
}

// disable buttons
function loadData() {
    var i = 0;
    var image;
    document.getElementById("backButton").disabled = true;
    document.getElementById("nextButton").disabled = true;
    while (i < 9) {        
        image = document.getElementById(`container${i}`);
        image.src = 'https://media.giphy.com/media/W2LPUUdHkPFNLaWwPZ/giphy.gif?cid=ecf05e47dppbqp02fo7ugqykojmvmo08zbda664qymchtoxd&rid=giphy.gif&ct=s';
        image.style.width = '15vh';
        image.style.height = '15vh';
        document.getElementById(`p${i}`).innerHTML = '. . .';
        document.getElementById(`plus${i}`).disabled = true;
        i++;
    }
}

// disable buttons
function readyData() {
    var i = 0;
    document.getElementById("backButton").disabled = false;
    document.getElementById("nextButton").disabled = false;
    while (i < 9) {
        document.getElementById(`plus${i}`).disabled = false;
        i++;
    }
}

//enable button
function start() {
    document.getElementById("cardGhostTable").style.display = "none";
    document.getElementById("cardGhostOne").style.display = "none";
    document.getElementById("cardGhostTwo").style.display = "none";

    var imagePlus = document.getElementById('plus');
    var stringP;
    var imagePlus
    for (let index = 0; index < 9; index++) {
        stringP = 'plus' + (index);
        imagePlus = document.getElementById(stringP);
        imagePlus.src = "../Resources/plus.png";
    }
    click = 0;
}

// disables button by clicks
function managerButton() {
    console.log('-> ', click);
    if (click == 0) {
        console.log('--> ', click);
        document.getElementById("backButton").disabled = true;
    }
}

// click funtion in button plus
function bPlus(pNum) {
    document.getElementById("cardGhostTable").style.display = "block";
    document.getElementById("cardGhostOne").style.display = "block";
    document.getElementById("cardGhostTwo").style.display = "block";

    var imageBR = document.getElementById("container00");
    imageBR.src = imgPokemon[pNum];
    imageBR.style.width = '33vh';
    imageBR.style.height = '33vh';

    document.getElementById("msgError").innerHTML = pokeData[pNum];
    document.getElementById("pokeName").innerHTML = pokeNames[pNum];
}

// click funtion in overlay
function offData() {
    document.getElementById("cardGhostTable").style.display = "none";
    document.getElementById("cardGhostOne").style.display = "none";
    document.getElementById("cardGhostTwo").style.display = "none";
}

// click funtion in button next 
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('nextButton');
    button.addEventListener('click', function () {
        loadData(); // disable buttons
        fetchData();
        click++;
    });
});

// click funtion in button back
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('backButton');
    button.addEventListener('click', function () {
        click--;
        pokeNum = (click * 9) + 1;
        if (pokeNum <= 0) {
            pokeNum = 1
        }
        loadData(); // disable buttons
        fetchData();
    });
});

