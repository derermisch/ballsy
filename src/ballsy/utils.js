export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomFloatFromInterval = (min, max) => {
    return Math.random() * (max - min) + min
}

export const degToRad = (angle) => {
    return (angle * Math.PI) / 180
}

export const radToDeg = (rad) => {
    return rad * 180 / Math.PI
}

export const getRandomAngleBetween = (angle1Deg, angle2Deg) => {
    const randomRad = randomFloatFromInterval(degToRad(angle1Deg), degToRad(angle2Deg))

    // console.log(randomRad, randomRad * 180 / Math.PI)
    return randomRad
}

export const getMagXY = (x, y) => {
    // console.log(x, y)

    const mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return mag
}

export const normalizeVector = (vector) => {
    const mag = getMagXY(vector.x, vector.y)
    return {
        x: vector.x / mag,
        y: vector.y / mag
    }
}

export const rotateVector = (vector, angleDeg) => {
    const angle = angleDeg * Math.PI / 180
    return {
        x: Math.cos(angle) * vector.x - Math.sin(angle) * vector.y,
        y: Math.sin(angle) * vector.x + Math.cos(angle) * vector.y
    }
}

export const scaleVector = (vector, scaler) => {
    vector.x *= scaler
    vector.y *= scaler
    return vector
}

export const rotateVectorNormalized = (vector, angleDeg, scaler = 100) => {
    let normVec = normalizeVector(rotateVector(vector, angleDeg))
    normVec = scaleVector(normVec, scaler)
    return normVec
}

export const dist = (point1, point2) => {
    const distX = point1.x - point2.x;
    const distY = point1.y - point2.y;
    return Math.sqrt((distX * distX) + (distY * distY));
}

export const minmax = (one, two) => {
    let min, max
    if (one > two){
        min = two
        max = one
    } else {
        min = one
        max = two
    }
    return {min, max}
}