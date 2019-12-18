const arrowUp = 38;
const arrowDown = 40;
const arrowLeft = 37;
const arrowRight = 39;
const letterA = 65;
const letterB = 66;

const audio = new Audio('./toasty.mp3');
const speed = 2;
const konamiCode = [arrowUp, arrowUp, arrowDown, arrowDown, arrowLeft, arrowRight, arrowLeft, arrowRight, letterB, letterA]

let keysPressed = [];		

let toastyAppears = 0;

async function checkCode(event){

    const keyPressed = event.keyCode

    if(konamiCode.includes(keyPressed)){
        keysPressed.push(keyPressed)
        
        if(contaisKeyPressed(konamiCode, keysPressed)){
            
            playAudio();
            
            if(toastyAppears%2==0){
                const image = document.getElementById('toasty-left')
                moveImage(image, 'marginLeft');
            } else {
                const image = document.getElementById('toasty-right')
                moveImage(image, 'marginRight')
            }
            
            clearKeyPressedArray();

            toastyAppears++
            
        }
        
    } else {
        clearKeyPressedArray()
    }

}

async function moveImage(image, cssElement){
    const limit = 0;
    let position = -150;

    while (position <= limit) {
        position += speed;
        image.style[cssElement] = (position) + 'px';
        await sleep(1);
    }

    await sleep(500)

    while (position >= -150) {
        position = (position - speed);
        image.style[cssElement] = (position) + 'px';
        await sleep(1);
    }
}

function clearKeyPressedArray() {
    keysPressed = [];
}

function playAudio() {
    audio.play();
}

function contaisKeyPressed(keysPressed, keysSequence){
    return JSON.stringify(keysPressed) == JSON.stringify(keysSequence)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
