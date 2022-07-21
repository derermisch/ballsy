// /** @type{CanvasRenderingContext2D} */
// let ctx
// let player
// let tracks
// let currentTrackInd = 0
// let UTILS
// let DEBUG
// export const initMenu = (_ctx, _player, _tracks, _UTILS, _DEBUG) => {
//     ctx = _ctx
//     player = _player
//     tracks = _tracks
//     UTILS = _UTILS
//     DEBUG = _DEBUG
// }
const gameMenuMenuEle = document.querySelector(".gameMenu__menu")
const gameMenuPlayingEle = document.querySelector(".gameMenu__playing")
const gameMenuGameoverEle = document.querySelector(".gameMenu__gameOver")

const startGameLoopEvent = new CustomEvent("startGameLoop", { detail: { playing: true } })
const gameOverEvent = new CustomEvent("gameOver")

const playing_score = document.querySelector(".gameMenu__playing__textArea__score")

// -- Event listeners for Buttons, trigger state events --
gameMenuMenuEle.querySelector(".gameButton").addEventListener("click", function () {
    this.dispatchEvent(startGameLoopEvent)
    showGameMenu()
})
gameMenuPlayingEle.querySelector(".gameMenu__playing__buttons")
    .querySelector(".gameButton").addEventListener("click", function () {
        this.dispatchEvent(gameOverEvent)
    })
gameMenuGameoverEle.querySelector(".gameButton").addEventListener("click", function () {
    this.dispatchEvent(gameOverEvent)
    this.dispatchEvent(startGameLoopEvent)
    showGameMenu()
})
gameMenuGameoverEle.querySelectorAll(".gameButton")[1].addEventListener("click", function () {
    this.dispatchEvent(gameOverEvent)
    showMainMenu()
})

// -- Menu states --
export const showMainMenu = () => {
    gameMenuPlayingEle.style.visibility = "hidden"
    gameMenuGameoverEle.style.visibility = "hidden"
    gameMenuMenuEle.style.visibility = "visible"
}

export const showGameMenu = () => {
    gameMenuMenuEle.style.visibility = "hidden"
    gameMenuGameoverEle.style.visibility = "hidden"
    gameMenuPlayingEle.style.visibility = "visible"
}

export const showGameOverMenu = () => {
    gameMenuMenuEle.style.visibility = "hidden"
    gameMenuPlayingEle.style.visibility = "hidden"
    gameMenuGameoverEle.style.visibility = "visible"
    dispatchEvent(gameOverEvent)
}

export const showTextArea = (score = "0") => {
    playing_score.textContent = score
}