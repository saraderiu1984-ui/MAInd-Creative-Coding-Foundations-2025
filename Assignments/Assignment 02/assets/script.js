let pattern = [];
let userInput = [];
let level = 0;

const sounds = {
    "1": 'assets/media/btn1.wav',
    "2": 'assets/media/btn2.mp3',
    "3": 'assets/media/btn3.wav',
    "4": 'assets/media/btn4.mp3'
};
const looseSound = 'assets/media/loose.wav';

const defaultColors = ["red", "blue", "green", "yellow"];
const specialColors = ["#8A2BE2", "#FF69B4", "#ed842eff", "#00dcb4ff"];
let currentColors = defaultColors;

const btn1 = document.querySelector('#button-1');
const btn2 = document.querySelector('#button-2');
const btn3 = document.querySelector('#button-3');
const btn4 = document.querySelector('#button-4');

const decbtn1 = document.querySelector('#r');
const decbtn2 = document.querySelector('#b');
const decbtn3 = document.querySelector('#g');
const decbtn4 = document.querySelector('#y');

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupButtons = document.getElementById('popup-buttons');
const closePopup = document.getElementById('close-popup');

const levelCounter = document.getElementById('message');

const blackbox = document.getElementById('popup-container')



function updateButtonColors() {
    btn1.style.backgroundColor = currentColors[0];
    btn2.style.backgroundColor = currentColors[1];
    btn3.style.backgroundColor = currentColors[2];
    btn4.style.backgroundColor = currentColors[3];

}

function getPatternKey() {
    let random = parseInt(Math.random() * 4 + 1);
    pattern.push(random);
    
    console.log(pattern)
}

function showPattern() {
    const buttons = [btn1, btn2, btn3, btn4];

    for (let i = 0; i < pattern.length; i++) {
        setTimeout(() => {
            for (let j = 0; j < buttons.length; j++) {
                if (buttons[j].dataset.number == pattern[i]) {
                    const btn = buttons[j];
                    const originalColor = currentColors[j];

                    btn.style.backgroundColor = "white";

                    const audio = new Audio(sounds[btn.dataset.number]);
                    audio.play();
                    

                    setTimeout(() => {
                        btn.style.backgroundColor = originalColor;
                    }, 500); 
                }
            }
        }, i * 1000);
    }
}

function userClick(id) {
    userInput.push(id);
    const audio = new Audio(sounds[id]);
    audio.play().then(() => {
        setTimeout(() => {
            controllo();
        }, 1500);
    });
}

function controllo() {
    for (let x = 0; x < userInput.length; x++) {
        if (userInput[x] != pattern[x]) {
            userInput = [];
            pattern = [];

            
            popupMessage.textContent = "You lose! Try again. Your score: " + level;
            popupButtons.style.display = "none";
            
            popup.classList.remove('hidden');
            closePopup.classList.remove('hidden');
            closePopup.classList.add('game-BTN')
            


            const audioFail = new Audio(looseSound);
            audioFail.play();

            blackbox.id='popup-container'

            level = 0;
            levelCounter.innerHTML = 'livello: ' + level;
            return;
        }
    }

    if (userInput.length === pattern.length) {
        userInput = [];
        level++;
        levelCounter.innerHTML = 'livello: ' + level;

        getPatternKey();
        showPattern();
    }
}

// Mostra popup all’inizio per scegliere i colori
function showColorPopup() {
    popupMessage.textContent = "Welcome in Simon says game, reproduce the sequence by clicking the buttons in order or using the keyboard (keys 1,2,3,4). Choose a set of colors:";
    popupButtons.style.display = "flex";
    popup.classList.remove('hidden');
   
}

// Pulsanti del popup per scegliere i colori
document.getElementById('default-colors-btn').addEventListener('click', () => {
    currentColors = defaultColors;
    blackbox.id='hidden'

    startGame();
});

document.getElementById('special-colors-btn').addEventListener('click', () => {
    currentColors = specialColors;
    blackbox.id='hidden'
    decbtn1.id = 'r1'
    decbtn2.id = 'b1'
    decbtn3.id = 'g1'
    decbtn4.id = 'y1'
    startGame();
});

// Funzione per iniziare il gioco generare e mostrare la prima sequenza
function startGame() {
    updateButtonColors();
    popup.classList.add('hidden');
    level = 0;
    levelCounter.innerHTML = 'livello: ' + level;
    pattern = [];
    userInput = [];
    getPatternKey();
    showPattern();
}


btn1.addEventListener('click', () => { userClick("1") });
btn2.addEventListener('click', () => { userClick("2") });
btn3.addEventListener('click', () => { userClick("3") });
btn4.addEventListener('click', () => { userClick("4") });

// Interazioni tastiera
document.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case '1': userClick("1"); controllo(); break;
        case '2': userClick("2"); controllo(); break;
        case '3': userClick("3"); controllo(); break;
        case '4': userClick("4"); controllo(); break;
    }
});


//  bottone di chiusura popup di sconfitta
closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');

    closePopup.classList.remove('game-BTN');
    closePopup.classList.add('hidden');
    showColorPopup()
});

// Mostra di nuovo il popo up iniziale per scegliere i colori
window.addEventListener('load', showColorPopup);
