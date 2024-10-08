radio.onReceivedNumber(function (receivedNumber) {
    radio.sendNumber(enumRequestReceived)
    if (receivedNumber == enumDispense) {
        Dispense()
    }
    if (receivedNumber == enumCycleTurnsPerFeed) {
        CycleTurnsPerFeed()
    }
    radio.sendNumber(enumRequestComplete)
})
function CycleTurnsPerFeed () {
    TempArrayIndex = TurnsPerFeedOptions.indexOf(TurnsPerFeed) + 1
    if (TempArrayIndex >= TurnsPerFeedOptions.length) {
        TurnsPerFeed = TurnsPerFeedOptions[0]
    } else {
        TurnsPerFeed = TurnsPerFeedOptions[TempArrayIndex]
    }
    ShowPortionSize(neopixel.colors(NeoPixelColors.Green), TurnsPerFeed)
}
function Dispense () {
    for (let index = 0; index < 3; index++) {
        basic.pause(200)
        ShowPortionSize(neopixel.colors(NeoPixelColors.Green), TurnsPerFeed)
        basic.pause(200)
        basic.clearScreen()
        strip.clear()
        strip.show()
    }
    for (let index = 0; index <= TurnsPerFeedOptions.indexOf(TurnsPerFeed); index++) {
        ShowPortionSize(neopixel.colors(NeoPixelColors.Blue), index + 1)
        robotbit.StepperDegree(robotbit.Steppers.M2, -360)
    }
    strip.clear()
    strip.show()
    for (let index = 0; index < 3; index++) {
        basic.pause(100)
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        basic.clearScreen()
    }
    ShowPortionSize(neopixel.colors(NeoPixelColors.Green), TurnsPerFeed)
}
function ShowPortionSize (colour: number, ledCount: number) {
    strip.clear()
    strip.show()
    for (let index = 0; index <= 3; index++) {
        if (ledCount > index) {
            strip.setPixelColor(index, neopixel.colors(NeoPixelColors.Green))
        }
        if (ledCount == index + 1) {
            strip.setPixelColor(index, colour)
        }
    }
    strip.show()
}
input.onButtonPressed(Button.A, function () {
    Dispense()
})
input.onButtonPressed(Button.B, function () {
    CycleTurnsPerFeed()
})
let TempArrayIndex = 0
let enumRequestComplete = 0
let enumRequestReceived = 0
let enumDispense = 0
let enumCycleTurnsPerFeed = 0
let TurnsPerFeed = 0
let TurnsPerFeedOptions: number[] = []
let strip: neopixel.Strip = null
strip = robotbit.rgb()
strip.setBrightness(15)
TurnsPerFeedOptions = [
1,
2,
3,
4
]
TurnsPerFeed = TurnsPerFeedOptions[0]
CycleTurnsPerFeed()
enumCycleTurnsPerFeed = 1
enumDispense = 2
enumRequestReceived = 3
enumRequestComplete = 4
radio.setGroup(1)
radio.setTransmitSerialNumber(true)
