import { BrowserWindow } from "electron";
import javascriptBarcodeReader from "javascript-barcode-reader";
import NodeWebcam, { WebcamOptions } from "node-webcam";
import { IBarcode } from "../types/barcode";

const opts: WebcamOptions = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    callbackReturn: "location",
    verbose: false,

};

const webcam = NodeWebcam.create({})

function captureCamera(mainWindow: BrowserWindow) {
    webcam.list(function (list) {
        // const anotherCam = NodeWebcam.create({ device: false, ...opts, });
        const anotherCam = NodeWebcam.create({  ...opts, device: "/dev/video1"});
        anotherCam.capture("bar_code", function (err: Error, data: string) {
            if (err) {
                const barcode: IBarcode = {
                    status: false,
                    err: {
                        code: err.name,
                        message: err.message
                    }
                }
                mainWindow.webContents.send("getBarCode", barcode)
                return;
            }

            javascriptBarcodeReader({
                image: data,
                barcode: "code-128",
            })
                .then(code => {
                    const barcode: IBarcode = {
                        status: true,
                        barcode: code
                    }
                    mainWindow.webContents.send("getBarCode", barcode)
                })
                .catch(err => {
                    const barcode: IBarcode = {
                        status: false,
                        err: {
                            code: err.name,
                            message: err.message
                        }
                    }
                    mainWindow.webContents.send("getBarCode", barcode)
                })
        });
    });
}

export { captureCamera };