bluetooth.onBluetoothConnected(function () {
    connected = true
    for (let index = 0; index <= 4; index++) {
        led.plot(index, 0)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    connected = false
    for (let index = 0; index <= 4; index++) {
        led.unplot(index, 0)
    }
})
input.onButtonPressed(Button.A, function () {
    if (armed) {
        mouse.click()
    }
})
// Kan skru musen av og på om den er forstyrrende
input.onButtonPressed(Button.AB, function () {
    armed = !(armed)
    if (armed) {
        led.setBrightness(255)
    } else {
        led.setBrightness(25)
    }
})
input.onButtonPressed(Button.B, function () {
    if (armed) {
        mouse.rightClick()
    }
})
let connected = false
let armed = false
led.plot(3, 4)
led.plot(2, 4)
led.plot(1, 4)
armed = false
connected = false
mouse.startMouseService()
led.setBrightness(25)
basic.forever(function () {
    if (connected) {
        for (let index = 0; index <= 4; index++) {
            led.toggle(index, 0)
            basic.pause(100)
        }
    }
})
basic.forever(function () {
    if (armed) {
        for (let index = 0; index <= 2; index++) {
            led.plotBrightness(index + 1, 4, randint(100, 255))
        }
    }
    basic.pause(200)
})
basic.forever(function () {
    if (armed) {
        // Litt dødsone så man kan legge fra seg musen uten at den kribler
        if (input.acceleration(Dimension.Strength) > 80 || input.acceleration(Dimension.Strength) > 80) {
            mouse.movexy(input.acceleration(Dimension.X) / 10, input.acceleration(Dimension.Y) / 10)
        }
    }
})
