var pokeNum = 1;
var pokeNames = [];
var pokeData = [];
var imgPokemon = [];
var bufferPokemon = [];
var click = 0;
var numerCard = 0;


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    start();
})

function home() {
    pokeNum = 1;
    click = 0;
    numerCard = 0;
    fetchData();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchData = async () => {
    try {
        loadData();
        for (let index = 0; index < 9; index++) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
            const data = await res.json();
            bufferPokemon[index] = await data;
            pokeNum++;
        }
        for (let index = 0; index < bufferPokemon.length; index++) {
            paintCrad(bufferPokemon[index]);
            numerCard++;
        }
        numerCard = 0;
        readyData();
        managerButton();
    } catch (error) {
        console.log(error);
    }

}

const paintCrad = (pData) => {
    image = document.getElementById('container' + numerCard.toString());
    image.src = pData.sprites.other.dream_world.front_default;
    imgPokemon[numerCard] = pData.sprites.other.dream_world.front_default;
    image.style.width = '100px';
    image.style.height = '100px';
    setData(pData);
}

const setData = (pData) => {
    var i = 0;
    var BreakException = {};
    var strgData = "Name : " + pData.name + "<br>" +
        "weight: " + pData.weight + "<br>" +
        "height: " + pData.height + "<br>" +
        "Moves: <br>";
    try {
        pData.moves.forEach(element => {
            strgData += element.move.name + ", ";
            if (i == 2) {
                throw BreakException;
            }
            i++;
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }

    strgData += "Type: "

    pData.types.forEach(element => {
        strgData += element.type.name + ", ";
    });

    pokeData[numerCard] = strgData;
    pokeNames[numerCard] = pData.name;
    pokeName = pData.name;
    numIndex = 'p' + (numerCard);
    document.getElementById(numIndex).innerHTML = pokeName;
}



function loadData() {
    var i = 0;
    document.getElementById("backButton").disabled = true;
    document.getElementById("nextButton").disabled = true;
    while (i < 9) {
        image = document.getElementById(`container${i}`);
        image.src = 'https://media.giphy.com/media/W2LPUUdHkPFNLaWwPZ/giphy.gif?cid=ecf05e47dppbqp02fo7ugqykojmvmo08zbda664qymchtoxd&rid=giphy.gif&ct=s';
        image.style.width = '100px';
        image.style.height = '100px';

        document.getElementById(`p${i}`).innerHTML = '. . .';
        document.getElementById(`plus${i}`).disabled = true;
        i++;
    }
}

function readyData() {
    var i = 0;
    document.getElementById("backButton").disabled = false;
    document.getElementById("nextButton").disabled = false; 
    while (i < 9) {
        document.getElementById(`plus${i}`).disabled = false;
        i++;
    }
}


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
        imagePlus.style.width = '40px';
        imagePlus.style.height = 'auto';
    }

    click = 0;
}



function managerButton(){
    console.log('-> ', click);
    if(click==0){
        console.log('--> ', click);
        document.getElementById("backButton").disabled = true;
    }
}

function bPlus(pNum) {
    document.getElementById("cardGhostTable").style.display = "block";
    document.getElementById("cardGhostOne").style.display = "block";
    document.getElementById("cardGhostTwo").style.display = "block";

    var imageBR = document.getElementById("container00");
    imageBR.src = imgPokemon[pNum];
    imageBR.style.width = '340px';
    imageBR.style.height = '290px';
    document.getElementById("msgError").innerHTML = pokeData[pNum];
    document.getElementById("pokeName").innerHTML = pokeNames[pNum];
}

function offData() {
    document.getElementById("cardGhostTable").style.display = "none";
    document.getElementById("cardGhostOne").style.display = "none";
    document.getElementById("cardGhostTwo").style.display = "none";
}

function sharePokemons(pFalg) {
    if (pFalg) {
        fetchData();
        click++;
    } else {
        click--;
        pokeNum = (click * 9) + 1;
        if (pokeNum <= 0) {
            pokeNum = 1
        }
        fetchData();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('backButton');
    button.addEventListener('click', function () {
        document.getElementById("backButton").disabled = true;
        click--;
        pokeNum = (click * 9) + 1;
        if (pokeNum <= 0) {
            pokeNum = 1
        }

        fetchData();
        document.getElementById("backButton").disabled = false;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('nextButton');
    button.addEventListener('click', function () {
        document.getElementById("nextButton").disabled = true;
        fetchData();
        click++;
        document.getElementById("nextButton").disabled = false;
    });
});
