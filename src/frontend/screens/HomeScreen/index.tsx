import "./index.css";
import React, { useEffect, useState } from "react";
import Button, { ETypeButton } from "../../components/Button"
import { IBarcode } from "../../../types/barcode";
import Webcam from "react-webcam";


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function HomeScreen() {
    const [barcode, setBarCode] = useState<IBarcode>();
    const [imageCapture, setImageCapture] = useState();

    useEffect(() => {
        window.myAPI.getBarCode((e, value) => {
            console.log("value", value)
            setBarCode(value)
        })
    }, [])

    const handleStarBuySim = () => {
        window.myAPI.captureCamera()
    }

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log("imageSrc", imageSrc)
            setImageCapture(imageSrc)
        },
        [webcamRef]
    );

    const handleBlinkLed = () => {
        console.log("sd")
    }

    

    return (
        <div>
            <h1>Trang chủ</h1>
            <Button onClick={handleStarBuySim} typeButton={ETypeButton.PRIMARY}>Quét Barcode</Button>
            <h2>{barcode?.status ? barcode?.barcode : barcode?.err?.message}</h2>

            <br />
            <Button onClick={handleBlinkLed} typeButton={ETypeButton.PRIMARY}>Blink Led 21</Button>

            <br />
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={videoConstraints}
            />
            <Button onClick={capture}>Chụp ảnh</Button>
            <img src={imageCapture} className="img"/>
        </div>
    )
}

export default HomeScreen