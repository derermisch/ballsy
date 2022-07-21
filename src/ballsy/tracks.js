/** @type{CanvasRenderingContext2D} */
let ctx = null
let UTILS = null
let center
let generatedTracksAmount = 5
export const tracks = Array.from({ length: generatedTracksAmount }, () => null)
export let currentTrackInd = 0
export let score = 0
let trackDimensions = {width: 200, height: 400}

export const initTracks = (_ctx, _UTILS, _trackAmount = 5, _center = {x: 0, y: 0}, 
    _trackDimensions = {width: 200, height: 400}) => {
    ctx = _ctx
    UTILS = _UTILS
    generatedTracksAmount = _trackAmount
    center = _center
    trackDimensions = _trackDimensions
    generateInitialTracks()
}

export class TrackSegment {
    constructor(prevSeg = null, startSegment = false,
        trackWidth = trackDimensions.width, trackHeight = trackDimensions.height,
        pos = { x: 0, y: 0 }, angleRad = 0) {

        this.pos = { x: pos.x, y: pos.y }
        this.trackWidth = trackWidth
        this.trackHeight = trackHeight

        this.isStartSegment = startSegment

        if (startSegment) {
            // Left side, bottom top
            this.p1 = { x: pos.x - trackWidth / 2, y: pos.y }
            this.p2 = { x: this.p1.x, y: pos.y - trackHeight }

            // Right side, bottom top
            this.p3 = { x: pos.x + trackWidth / 2, y: pos.y }
            this.p4 = { x: this.p3.x, y: pos.y - trackHeight }
        }
        if (prevSeg) {
            // Left side, bottom top
            this.p1 = { x: prevSeg.p2.x, y: prevSeg.p2.y }
            const orientationVector = { x: 0, y: -trackHeight }
            const rotatedVectorLeft = {
                x: Math.cos(angleRad) * orientationVector.x - Math.sin(angleRad) * orientationVector.y,
                y: Math.sin(angleRad) * orientationVector.x + Math.cos(angleRad) * orientationVector.y
            }
            this.p2 = { x: this.p1.x + rotatedVectorLeft.x, y: this.p1.y + rotatedVectorLeft.y }

            // Right side, bottom top
            this.p3 = { x: prevSeg.p4.x, y: prevSeg.p4.y }
            const rotatedVectorRight = {
                x: Math.cos(angleRad) * orientationVector.x - Math.sin(angleRad) * orientationVector.y,
                y: Math.sin(angleRad) * orientationVector.x + Math.cos(angleRad) * orientationVector.y
            }
            this.p4 = { x: this.p3.x + rotatedVectorRight.x, y: this.p3.y + rotatedVectorLeft.y }

            // Update position, anchor is bottom: |_| => |.| (point)
            this.pos.x = this.p1.x + trackWidth / 2
            this.pos.y = this.p1.y + (this.p3.y - this.p1.y)
        }
    }
    render() {
        ctx.beginPath()
        // Right side
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        // Left side
        ctx.moveTo(this.p3.x, this.p3.y)
        ctx.lineTo(this.p4.x, this.p4.y)

        if (this.isStartSegment){
            ctx.moveTo(this.p1.x, this.p1.y)
            ctx.lineTo(this.p3.x, this.p3.y)
        }
        ctx.stroke()
        // ctx.fillRect(this.p1.x, this.p1.y, 10,10)
        // ctx.fillRect(this.p2.x, this.p2.y, 10,10)
        // ctx.fillRect(this.p3.x, this.p3.y, 10,10)
        // ctx.fillRect(this.p4.x, this.p4.y, 10,10)
        // ctx.fillRect(this.pos.x, this.pos.y, 10,10)
    }
}


export const getNextTrack = (prevTrack) => {
    const angle = UTILS.getRandomAngleBetween(-45, 45)
    const newTrack = new TrackSegment(prevTrack, false,
        prevTrack.trackWidth, prevTrack.trackHeight,
        { x: prevTrack.pos.x, y: prevTrack.pos.y - prevTrack.trackHeight }, angle)
    return newTrack
}

export const generateInitialTracks = () => {
    score = 0
    tracks.forEach(track => track = null)
    currentTrackInd = 0
    const beginningTrack = new TrackSegment(null, true, trackDimensions.width, 
        trackDimensions.height, { x: center.x, y: center.y })
    tracks[0] = beginningTrack
    for (let i = 1; i < tracks.length; i++) {
        tracks[i] = getNextTrack(tracks[i - 1])
    }
}

export const renderTracks = () => {
    tracks.forEach(track => track.render())
}

export const updateTracks = (playerYpos) => {
    if (tracks === undefined) return
    if (playerYpos <= tracks[Math.round(generatedTracksAmount / 2)].pos.y) {
        tracks.push(getNextTrack(tracks[tracks.length - 1]))
        tracks.shift()
        currentTrackInd = Math.round(generatedTracksAmount / 2) - 1 // Current Is always the middle of arr
        score++
    } else if (playerYpos <= tracks[currentTrackInd + 1].pos.y) { // For first tracks until middle
        currentTrackInd += 1
        score++
    }
}