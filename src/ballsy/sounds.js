import scoreIncreasedSound from "./sounds/scoreIncreased.wav"
import playerCrashedSound from "./sounds/playerCrashed.wav"

const sound = new Audio()

window.addEventListener("scoreIncreased", () => {
    sound.src = scoreIncreasedSound
    sound.load()
    sound.play()
}, true)

window.addEventListener("playerCrashed", () => {
    sound.src = playerCrashedSound
    sound.load()
    sound.play()
}, true)