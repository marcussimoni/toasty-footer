const arrowUp = 38;
const arrowDown = 40;
const arrowLeft = 37;
const arrowRight = 39;
const letterA = 65;
const letterB = 66;

const audio = new Audio('./toasty.mp3');
const speed = 3;
const konamiCode = [arrowUp, arrowUp, arrowDown, arrowDown, arrowLeft, arrowRight, arrowLeft, arrowRight, letterB, letterA]

let keysPressed = [];		

async function checkCode(event){

    const keyPressed = event.keyCode

    if(konamiCode.includes(keyPressed)){
        keysPressed.push(keyPressed)
        
        if(contaisKeyPressed(konamiCode, keysPressed)){
            let image = document.getElementById('toasty')
            
            let limit = 0;
            let position = -100;

            playAudio();

            position = await moveFromLeftToRight(position, limit, speed, image);
            
            await sleep(1000)

            position = await moveFromRightToLeft(position, speed, image);
            
            clearKeyPressedArray();
        }
        
    } else {
        clearKeyPressedArray()
    }

}

function clearKeyPressedArray() {
    keysPressed = [];
}

async function moveFromRightToLeft(position, speed, image) {
    while (position >= -160) {
        position -= speed;
        image.style.marginLeft = (position) + 'px';
        await sleep(1);
    }
    return position;
}

async function moveFromLeftToRight(position, limit, speed, image) {
    while (position <= limit) {
        position = (position + speed);
        image.style.marginLeft = (position) + 'px';
        await sleep(1);
    }
    return position;
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
