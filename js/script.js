const startGame = document.getElementById("startGame");
const newWord = document.getElementById("newWord");

const saveAndStart = document.getElementById("saveAndStart");
const cancel = document.getElementById("cancel");
const input = document.getElementById("inputText");
const alertText = document.getElementById("alert");

const newGame = document.getElementById("newGame");
const desist = document.getElementById("desist");
const wordGame = document.getElementById("word");

const paint = document.getElementById("paint");
const body = document.getElementById("body");
const leftleg = document.getElementById("leftleg");
const rightleg = document.getElementById("rightleg");
const rightarm = document.getElementById("rightarm");
const leftarm = document.getElementById("leftarm");
const head = document.getElementById("head");

const defaultWords = ["Alfonso","Jugar","Perro","Salame","Celular","Mate","Chicle","Lente","Dorito","Teclado","Natasha","Fahrmut"];

let gameIsRunning = false;
let changed = false;
let arrayChar = "";
let counter = 0;
let tries = 0;
let comparator = 0;

let lettersUseds = [];

function separateText(text){
    let arrayText = text.split("");

    if(arrayText.length>8)
        alert("Esa palabra supera las 8 letras, ingrese una nueva");
    else if (arrayText=="")
        alert("Debes ingresar una palabra.");
    else
        return arrayText;
}

function setWord(){
    let word = input.value;
    
    arrayChar = separateText(word);

    const arrayCharUppercase = arrayChar.map(element => {
        return element.toUpperCase();
    });

    if(arrayChar!=undefined){
        for(let i = 0; i < arrayChar.length; i++){
            var tag1 = document.createElement("div");
            var tag2 = document.createElement("p");
            tag1.appendChild(tag2);
            tag2.className = i;
            tag2.style.opacity = 0.0;
            var tagtext = document.createTextNode(arrayCharUppercase[i]);
            tag2.appendChild(tagtext);
            var element = document.getElementById("word");
            element.appendChild(tag1);
        }
    }
}

function removeWord(){
    wordGame.querySelectorAll('*').forEach( n => n.remove() );
}

function triesF(){
    tries++;
    console.log("2 " + tries + " " + changed);
    switch(tries){
        case 1: 
            head.style.display = "flex";
            changed = false;
            console.log(tries + " " + changed);
            break;
        case 2: 
            body.style.display = "flex";
            changed = false;
            console.log(tries + " " + changed);
            break;
        case 3: 
            leftarm.style.display = "flex";
            changed = false;
            console.log(tries + " " + changed);
            break;
        case 4: 
            rightarm.style.display = "flex";
            changed = false;
            console.log(tries + " " + changed);
            break;
        case 5: 
            leftleg.style.display = "flex";
            changed = false;
            console.log(tries + " " + changed);
            break;
        case 6:
            rightleg.style.display = "flex";
            setTimeout(() => {
                alert("Perdiste! intentalo de nuevo");
            }, 1);
            gameIsRunning = false;
            tries=0;
            break;
    }

}

function startGameF(){
    input.value = "";
    removeWord();
    counter = 0;

    if(input.value==""){
        input.value = defaultWords[Math.floor(Math.random()*defaultWords.length)];
        setWord();
    }
    startGame.parentElement.style.display = "none";

    newGame.parentElement.style.display = "flex";
    wordGame.style.display = "flex";

    paint.style.display = "flex";
    body.style.display = "none";
    leftleg.style.display = "none";
    rightleg.style.display = "none";
    rightarm.style.display = "none";
    leftarm.style.display = "none";
    head.style.display = "none";

    gameIsRunning = true;
}

function newWordF(){
    input.value = "";
    removeWord();
    counter = 0;

    newWord.parentElement.style.display = "none";

    saveAndStart.parentElement.style.display = "flex";
    input.style.display = "flex";
    alertText.style.display = "flex";

    input.value = "";
    input.focus();

}

function cancelF(){
    newWord.parentElement.style.display = "flex";

    saveAndStart.parentElement.style.display = "none";
    input.style.display = "none";
    alertText.style.display = "none";

}

function saveAndStartF(){
    setWord();

    newGame.parentElement.style.display = "flex";
    wordGame.style.display = "flex";
    
    saveAndStart.parentElement.style.display = "none";
    input.style.display = "none";
    alertText.style.display = "none";


    
    gameIsRunning = true;
    counter = 0;

    paint.style.display = "flex";
    body.style.display = "none";
    leftleg.style.display = "none";
    rightleg.style.display = "none";
    rightarm.style.display = "none";
    leftarm.style.display = "none";
    head.style.display = "none";
}

function desistF(){
    input.value = "";
    removeWord();
    counter = 0;

    startGame.parentElement.style.display = "flex";
    newGame.parentElement.style.display = "none";

    word.style.display = "none";
    
    gameIsRunning = false;
    
    paint.style.display = "none";
    body.style.display = "flex";
    leftleg.style.display = "flex";
    rightleg.style.display = "flex";
    rightarm.style.display = "flex";
    leftarm.style.display = "flex";
    head.style.display = "flex";
}

document.addEventListener("keypress", function(event) {
    if(gameIsRunning){
        comparator=0;
        if (lettersUseds.indexOf(event.key.toUpperCase()==-1)){
            console.log(lettersUseds.indexOf(event.key.toUpperCase()) + " " + lettersUseds);
            lettersUseds.push(event.key.toUpperCase());
            console.log(lettersUseds);
        }
        for(let i = 0; i < arrayChar.length; i++){
            if (event.key.toUpperCase()==arrayChar[i].toUpperCase()){
                if(wordGame.querySelector("div:nth-child("+ (i+1) +")").querySelector("p").style.opacity == 0.0){
                    wordGame.querySelector("div:nth-child("+ (i+1) +")").querySelector("p").style.opacity = 1.0;
                    counter++;
                    comparator = counter+1;
                }
            } else if (event.key.toUpperCase()!=arrayChar[i].toUpperCase()){
            }
        }
        if (comparator<=counter)
            triesF();
            
        if (counter==arrayChar.length){
            setTimeout(() => {
                alert("Ganaste");
            }, 1);
            gameIsRunning = false;
        }
    }
});


//Arreglar cuando una no se ingresa una palabra da error de javascript
//Arreglar el macaquito que se dibuja aun acertando la letra - FIXED
//Agregar un reloj de tiempo
//Agregar que cuando se termina el juego incompleto aparezcan la letras faltantes en rojo