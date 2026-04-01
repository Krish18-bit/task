
const systemNumber = Math.floor(Math.random() * 100) + 1;


const input = document.getElementById('userGuess');
const button = document.getElementById('guessBtn');
const display = document.getElementById('feedback');

button.addEventListener('click', () => {
    const guess = Number(input.value);
    let message = "";
    let cssClass = "wrong";

   
    if (guess === systemNumber) {
        message = `⭐ ${guess} is CORRECT! You win!`;
        cssClass = "correct";
        button.disabled = true; 
    } else if (guess > systemNumber) {
        message = `Lower! ${guess} is too high.`;
    } else if (guess < systemNumber) {
        message = `Higher! ${guess} is too low.`;
    }

 
    const newResult = document.createElement('p');
    newResult.innerHTML = message;
    newResult.className = cssClass;
    display.prepend(newResult); 

    
    input.value = "";
    input.focus();
});