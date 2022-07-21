import '../css/main.css'
import Camera from "./camera.js"
import * as UTILS from "./utils"
import { Debug } from "./debug"
import { initPlayer, Player } from "./player"
import { inputs, updateHorizontalAxis, resetInputs } from "./input"
import {
    initTracks, renderTracks, updateTracks,
    tracks, currentTrackInd, generateInitialTracks, score
} from './tracks'
import { initCollision, hasCollision } from './collision'
import { showGameOverMenu, showTextArea} from './menu'
// import { initUi, fillTextAt } from './ui'

// -- References --
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const cam = new Camera(ctx, { distance: 2000 }) // 2000 is good

// -- Global variables/settings --
let deltaTime; // time since last frame in seconds
let trackDimensions = { width: 200, height: 500 }
ctx.font = '25px Arial';
ctx.lineWidth = 5

// -- Canvas resizing --
const resizeCanvas = async () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cam.distance = 2000
    // console.log(cam.getDimensions_screenToWorld())
    ctx.lineWidth = 5
    window.getSelection().removeAllRanges()
}
resizeCanvas()
window.addEventListener("resize", () => {
    resizeCanvas()
})

// -- Object initializations --
const center = { x: canvas.width / 2, y: canvas.height / 2 }
const DEBUG = new Debug(ctx, cam)
const player = new Player(center);
initTracks(ctx, UTILS, 5, center, trackDimensions)
initPlayer(ctx, inputs, center, DEBUG, UTILS)
initCollision(ctx, player, tracks, UTILS, DEBUG, center)
// initUi(ctx, cam)
// initMenu(ctx, player, tracks, UTILS, DEBUG)

// -- Game loop --
let playing = true
let oldTimeStamp;
let fps;
let reqId;
const gameLoop = (timeStamp) => {
    if (!playing) {
        // reset inputs first
        resetInputs()

        // reset tracks and player
        generateInitialTracks()
        player.reset()

        // clear screen, cancel game loop, show menu
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(reqId)
        showGameOverMenu()
        return
    }
    // clear screen first, then start cam
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cam.begin()

    // Time/Fps logic
    deltaTime = (timeStamp - oldTimeStamp) / 1000; // from ms to s
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / deltaTime)

    // Input logic
    updateHorizontalAxis()

    // GameObject logic
    player.move()
    updateTracks(player.pos.y)
    renderTracks()
    if (hasCollision(currentTrackInd)) {
        playing = false // condition for game over
    }

    // UI logic
    // fillTextAt(score)
    showTextArea(score)

    // Debug logic
    // DEBUG.showFPS(fps)
    // DEBUG.mousePosText(inputs.DEBUG_mousePos_x, inputs.DEBUG_mousePos_y)
    // DEBUG.mousePosTextScreenCoords(inputs.DEBUG_mousePos_x, inputs.DEBUG_mousePos_y)
    // DEBUG.showScreenDim()
    // DEBUG.showMessage()

    // Camera logic
    cam.moveTo(player.pos.x, player.pos.y)
    cam.end()

    reqId = requestAnimationFrame(gameLoop)
}
// gameLoop()

window.addEventListener("startGameLoop", (e) => {
    // document.body.style.cursor = "none"
    playing = e.detail.playing
    reqId = requestAnimationFrame(gameLoop)
}, true)

window.addEventListener("gameOver", () => {
    // document.body.style.cursor = "auto"
    playing = false
}, true)