const pauseModal = document.querySelector('#pause-modal');
const pauseModalOverlay = document.querySelector('#pause-modal-overlay');
const touchTutorial = document.querySelector('#touch-info');
const keyboardTutorial = document.querySelector('#keyboard-info');
const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');

playButton.addEventListener("click", function() {
    pauseModal.classList.toggle('closed');
    pauseModalOverlay.classList.toggle('closed');
    touchTutorial.classList.toggle('closed');
    keyboardTutorial.classList.toggle('closed');
    game.togglePause();
    update();
});
pauseButton.addEventListener("click", function() {
    pauseModal.classList.toggle('closed');
    pauseModalOverlay.classList.toggle('closed');
    touchTutorial.classList.toggle('closed');
    keyboardTutorial.classList.toggle('closed');
    game.togglePause();
    update();
});
