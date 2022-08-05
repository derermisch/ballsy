export const createTouchOverlay = async (isTouch) => {
    if (!isTouch) return //TODO: if there is a touchField, delete it

    // Create Touch overlay: Two invisible boxes, for left and right side of screen
    const touchField = document.createElement("div")
    touchField.className = "gameTouchField"
    // Create left
    const touchFieldLeft = document.createElement("div")
    touchFieldLeft.className = "gameTouchField__left"
    // Create right
    const touchFieldRight = document.createElement("div")
    touchFieldRight.className = "gameTouchField__right"
    // Append to elements, style via css
    touchField.append(touchFieldLeft)
    touchField.append(touchFieldRight)
    document.body.append(touchField)
}

const setTouchFieldToFront = () => {
    document.querySelectorAll(".gameTouchField > *").forEach(item => item.style.zIndex = 2)
}

const setTouchFieldToBack = () => {
    document.querySelectorAll(".gameTouchField > *").forEach(item => item.style.zIndex = 0)
}

// Event listeners are added, after game has started
const addTouchListeners = () => {
    const touchFieldLeft = document.querySelector(".gameTouchField__left")
    const touchFieldRight = document.querySelector(".gameTouchField__right")
    // console.log(touchFieldLeft, touchFieldRight)
    // Add event listeners
    touchFieldLeft.addEventListener("pointerdown", () => {
        // console.log("Clicked left side")
        inputs.left = 1
    }, true)
    touchFieldRight.addEventListener("pointerdown", () => {
        // console.log("Clicked right side")
        inputs.right = 1
    }, true)
    touchFieldLeft.addEventListener("pointerup", () => {
        inputs.left = 0
    }, true)
    touchFieldRight.addEventListener("pointerup", () => {
        inputs.right = 0
    }, true)
}

export const inputs = {
    left: 0,
    right: 0,
    horizontalAxis: 0,
    DEBUG_stopPlayer: true,
    DEBUG_mousePos_x: 0,
    DEBUG_mousePos_y: 0,
    DEBUG_playerCanStopAlways: false
}

export const resetInputs = () => {
    listenToInputs = false
    inputs.left = 0
    inputs.right = 0
    inputs.horizontalAxis = 0
}

export const initInputs = () => {
    listenToInputs = true
    inputs.DEBUG_stopPlayer = true
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

// window.addEventListener("startGameLoop", initInputs, true)
window.addEventListener("unlockMovement", () => {
    setTouchFieldToFront()
    addTouchListeners()
    initInputs()
    inputs.DEBUG_stopPlayer = false
}, true)
window.addEventListener("gameOver", () => {
    setTouchFieldToBack()
    resetInputs()
    inputs.DEBUG_stopPlayer = true
} , true)

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
            if (inputs.DEBUG_playerCanStopAlways){
                inputs.DEBUG_stopPlayer = !inputs.DEBUG_stopPlayer
            }
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