/** @type{CanvasRenderingContext2D} */
let ctx = null
let inputs = null
let center = { x: 0, y: 0 }
let DEBUG = null
let UTILS = null

export const initPlayer = (_ctx, _inputs, _center = { x: 0, y: 0 }, _DEBUG, _UTILS) => {
    ctx = _ctx
    inputs = _inputs
    center = _center
    DEBUG = _DEBUG
    UTILS = _UTILS
}

export const getPlayerMovevectorX = (speed) => {
    let toX
    if (inputs.left === -1) {
        toX = speed * inputs.left
    } else if (inputs.right === 1) {
        toX = speed * inputs.right
    } else {
        toX = 0
    }
    return toX
}

const updateMoveVector = (moveVector = { x: 0, y: -1 }, angle = 10, speed = 5) => {
    const rotVec = UTILS.rotateVectorNormalized(moveVector, inputs.horizontalAxis * angle, speed)
    // console.log(rotVec)
    moveVector.x = rotVec.x
    moveVector.y = rotVec.y
    return moveVector
}

export class Player {
    constructor(pos = { x: center.x, y: center.y }, radius = 10, color = "red", rotationSpeedAngle = 3) {
        this.pos = { x: pos.x, y: pos.y - radius * 2}
        this.radius = radius
        this.color = color

        this.moveVector = { x: 0, y: -1 }
        this.rotationSpeedAngle = rotationSpeedAngle
    }
    move() {
        // ctx.beginPath()
        // ctx.fillStyle = this.color
        this.moveVector = updateMoveVector(this.moveVector, this.rotationSpeedAngle)
        if (!inputs.DEBUG_stopPlayer) {
            this.pos.x += this.moveVector.x
            this.pos.y += this.moveVector.y
        }
        // ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        // ctx.fill()
    }
    render() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
    reset() {
        this.pos = { x: center.x, y: center.y - this.radius * 2}
        this.moveVector = { x: 0, y: -1 }
        // DEBUG.logOnce(this.moveVector)
        // DEBUG.resetLogOnce()
        // this.speed = {x: 0, y: 0}
    }
}