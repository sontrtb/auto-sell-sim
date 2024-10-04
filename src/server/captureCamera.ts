import { BrowserWindow } from "electron";
import javascriptBarcodeReader from "javascript-barcode-reader";
import NodeWebcam, { WebcamOptions } from "node-webcam";

const opts: WebcamOptions = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false

};

const webcam = NodeWebcam.create(opts)

function captureCamera(mainWindow: BrowserWindow) {
    webcam.capture("src/server/bar_code", function (err: Error, data: string) {
        console.log("data", data)
        javascriptBarcodeReader({
            image: data,
            barcode: "code-128",
        })
            .then(code => {
                console.log("code:", code)
                mainWindow.webContents.send("getBarCode", code)
            })
            .catch(err => {
                console.log("err:", err?.message)
                mainWindow.webContents.send("getBarCode", err?.message)
            })
    });
}

export { captureCamera };