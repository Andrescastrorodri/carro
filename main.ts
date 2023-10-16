let servosActivados = false
let startTime = 0
let currentTime = 0
let elapsedTime = 0
let speedFactor = 0
let leftSpeed = 0
let rightSpeed = 0
function apagarServos () {
    servosActivados = false
    // Detén el servo izquierdo
    pins.servoWritePin(AnalogPin.P0, 90)
    // Detén el servo derecho
    pins.servoWritePin(AnalogPin.P1, 90)
}
function encenderServos () {
    servosActivados = true
    // tiempo de inicio
    startTime = input.runningTime()
    currentTime = input.runningTime()
    while (servosActivados && currentTime - startTime < 7000) {
        // Aumentar velocidad inicial (primeros 4 segundos)
        if (currentTime - startTime < 4000) {
            // Gira el servo izquierdo en sentido horario
            pins.servoWritePin(AnalogPin.P0, -1000)
            // Gira el servo derecho en sentido antihorario
            pins.servoWritePin(AnalogPin.P1, 1000)
        } else {
            // Disminución de velocidad (después de los primeros 4 segundos)
            elapsedTime = currentTime - startTime - 4000
            // Cambia la velocidad uniformemente en 3 segundos
            speedFactor = Math.min(1, elapsedTime / 3000)
            // Velocidad del servo izquierdo
            leftSpeed = Math.round(90 + 90 * speedFactor)
            // Velocidad del servo derecho
            rightSpeed = Math.round(90 - 90 * speedFactor)
            pins.servoWritePin(AnalogPin.P0, leftSpeed)
            pins.servoWritePin(AnalogPin.P1, rightSpeed)
            Victoria()
        }
        currentTime = input.runningTime()
    }
    apagarServos()
}
input.onButtonPressed(Button.A, function () {
    apagarServos()
})
function Victoria () {
    music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
}
input.onButtonPressed(Button.B, function () {
    if (!(servosActivados)) {
        encenderServos()
    }
})
