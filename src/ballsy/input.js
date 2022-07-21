export const inputs = {
    left: 0,
    right: 0,
    horizontalAxis: 0,
    DEBUG_stopPlayer: true,
    DEBUG_mousePos_x: 0,
    DEBUG_mousePos_y: 0
}

export const resetInputs = () => {
    listenToInputs = false
    inputs.left = 0
    inputs.right = 0
    inputs.horizontalAxis = 0
}

const getAxisHorizontal = () => {
    if (inputs.left > 0) return -1
    if (inputs.right > 0) return 1
    return 0
}

export const updateHorizontalAxis = () => {
    inputs.horizontalAxis = getAxisHorizontal()
}


let listenToInputs = false

window.addEventListener("startGameLoop", () => {
    listenToInputs = true
    inputs.DEBUG_stopPlayer = true
}, true)

window.addEventListener("gameOver", resetInputs , true)

window.addEventListener("keydown", (e) => {
    if (!listenToInputs) return
    switch (e.key) {
        case "ArrowLeft":
            // console.log("left")
            inputs.left = 1
            break;
        case "ArrowRight":
            inputs.right = 1
            // Right pressed
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // console.log("down")
            inputs.DEBUG_stopPlayer = !inputs.DEBUG_stopPlayer
            // Down pressed
            break;
    }
})
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            inputs.left = 0
            break;
        case "ArrowRight":
            inputs.right = 0
            // Right pressed
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;
    }
})
window.addEventListener("mousemove", (e) => {
    inputs.DEBUG_mousePos_x = e.x
    inputs.DEBUG_mousePos_y = e.y
})