function showPattern() {
    for (let i = 0; i < pattern.length; i++) {

        const buttons = [btn1, btn2, btn3, btn4];
        const buttonIds = [btn1Id, btn2Id, btn3Id, btn4Id];

        // aggiungo un ritardo per farli andare in sequenza
        setTimeout(() => {

            for (let j = 0; j < buttons.length; j++) {

                if (buttonIds[j] == pattern[i]) {

                    buttons[j].style.background = "white";

                    const audio = new Audio(sounds[buttonIds[j]]);
    audio.play();


                    setTimeout(() => {
                        if (j == 0) buttons[j].style.background = "red";
                        if (j == 1) buttons[j].style.background = "blue";
                        if (j == 2) buttons[j].style.background = "green";
                        if (j == 3) buttons[j].style.background = "yellow";
                    }, 500); //durata della luce sul singolo tasto
                }
            }

        }, i * 800); // ritardo di un tasto dopo l'altro
    }
}




























//startBTN.addEventListener('click', );

let pattern = [];
let userInput = [];
let level=0

// function getPatternKey() {
//     let random = parseInt(Math.random() * 4 + 1);

//     // controlla se è già presente
//     if (!pattern.includes(random)) {
//         pattern.push(random);
//     } else {
//         console.log("Numero già presente, non lo aggiungo");
        
//         getPatternKey(); 
//     }
    
// }

const sounds = {
    "1": 'assets/media/btn1.wav',
    "2": 'assets/media/btn2.wav',
    "3": 'assets/media/btn3.wav',
    "4": 'assets/media/btn4.mp3'
};

const looseSound = 'assets/media/loose.wav';


function getPatternKey() {
    let random = parseInt(Math.random() * 4 + 1);
    pattern.push(random); // aggiungi sempre
}

console.log(pattern);
// getPatternKey();
// getPatternKey();
// getPatternKey();
// getPatternKey();


const startBTN = document.querySelector('#start');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');


function StartGamefunc(){
    if (startBTN.textContent == "Start") {
        // se il bottone è "start" all'inizio lo trasforma in restart al click 
        startBTN.textContent = "Restart";

        getPatternKey();
        showPattern();
    } else {
        // se il bottone non è start (è gia stato cliccato) esegue il reload() della pagine
        location.reload();
    }
}

// startBTN.addEventListener('click', () => {
//     if (startBTN.textContent == "Start") {
//         // se il bottone è "start" all'inizio lo trasforma in restart al click 
//         startBTN.textContent = "Restart";

//         getPatternKey();
//         showPattern();
//     } else {
//         // se il bottone non è start (è gia stato cliccato) esegue il reload() della pagine
//         location.reload();
//     }
// });




// function startGame() {
//     getPatternKey();
//     showPattern();
// }


console.log(pattern);

const btn1= document.querySelector('#red');
const btn1Id = "1";
const btn2= document.querySelector('#blue');
const btn2Id = "2";
const btn3= document.querySelector('#green');
const btn3Id = "3";
const btn4= document.querySelector('#yellow');
const btn4Id = "4";

// if (btn1Id == pattern[0] ){
//     console.log('ciao');
//     btn1.style.background="black";
// }

// else if (btn2Id == pattern[0] ){
//     console.log('ciao2');
//     btn2.style.background="black";
// }

// else if (btn3Id == pattern[0] ){
//     console.log('ciao3');
//     btn3.style.background="black";
// }

// else if (btn4Id == pattern[0] ){
//     console.log('ciao4');
//     btn4.style.background="black";
// }



// const buttons = [btn1, btn2, btn3, btn4];
// const buttonIds = [btn1Id, btn2Id, btn3Id, btn4Id];

    function showPattern() {
    for (let i = 0; i < pattern.length; i++) {

        const buttons = [btn1, btn2, btn3, btn4];
        const buttonIds = [btn1Id, btn2Id, btn3Id, btn4Id];

        // aggiungo un ritardo per farli andare in sequenza
        setTimeout(() => {

            for (let j = 0; j < buttons.length; j++) {

                if (buttonIds[j] == pattern[i]) {

                    buttons[j].style.background = "white";

                    const audio = new Audio(sounds[buttonIds[j]]);
    audio.play();


                    setTimeout(() => {
                        if (j == 0) buttons[j].style.background = "red";
                        if (j == 1) buttons[j].style.background = "blue";
                        if (j == 2) buttons[j].style.background = "green";
                        if (j == 3) buttons[j].style.background = "yellow";
                    }, 500); //durata della luce sul singolo tasto
                }
            }

        }, i * 800); // ritardo di un tasto dopo l'altro
    }
}


//interazioni con click e tastiera
// 
// Click dei bottoni
btn1.addEventListener('click', () => {
    userClick("1");
    controllo();
});
btn2.addEventListener('click', () => {
    userClick("2");
    controllo();
});
btn3.addEventListener('click', () => {
    userClick("3");
    controllo();
});
btn4.addEventListener('click', () => {
    userClick("4");
    controllo();
});

// Tastiera usando switch direttamente
document.addEventListener('keydown', (event) => {
    switch(event.key.toLowerCase()) {
        case 'r':
            userClick("1");
            controllo();
            break;
        case 'b':
            userClick("2");
            controllo();
            break;
        case 'g':
            userClick("3");
            controllo();
            break;
        case 'y':
            userClick("4");
            controllo();
            break;
    }
});


document.addEventListener('keydown', (event) => {
    
    if (event.key === 'y' || event.key === 'Y') {
        console.log("yellow");
        controllo();
        

    }
});


function userClick(id) {
    userInput.push(id);
    console.log(userInput);

    const audio = new Audio(sounds[id]);
    audio.play();
}

let levelCounter=document.getElementById('message')

function controllo() {
    for (let x = 0; x < userInput.length; x++) {
        if (userInput[x] != pattern[x]) {
            console.log('sbaaagliato'); 
            userInput = []; 
            pattern=[];
            // alert('spagliatp')
            popup.classList.remove('hidden');
            
            const audioFail = new Audio(looseSound);
    audioFail.play();

            level = 0;
            document.getElementById("message").innerHTML = 'livello: ' + level;
            return;
            
            
        }
    }

    

    if (userInput.length === pattern.length) {
        console.log('giuuuuuuusto'); // sequenza corretta
        userInput = [];
        level++
        document.getElementById("message").innerHTML = 'livello: ' + level
        console.log(level)


        // aspetta 1 secondo prima della prossima sequenza senno si incasinano i suoni 
        setTimeout(() => {
            getPatternKey();
            showPattern();
        }, 1000);
    }
}

closePopup.addEventListener('click', () => {
               popup.classList.add('hidden');
            });