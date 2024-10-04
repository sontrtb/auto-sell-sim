import React, { useEffect, useState } from "react";
import Button from "../../components/Button"
import { IBarcode } from "../../../types/barcode";

function HomeScreen() {
    const [barcode, setBarCode] = useState<IBarcode>();

    useEffect(() => {
        window.myAPI.getBarCode((e, value) => {
            console.log("value", value)
            setBarCode(value)
        })
    }, [])

    const handleStarBuySim = () => {
        window.myAPI.captureCamera()
    }
    return (
        <div>
            <h1>Trang chủ</h1>
            <Button title="Mua sim" onClick={handleStarBuySim}/>
            <h2>{barcode?.status ? barcode?.barcode : barcode?.err?.message}</h2>
        </div>
    )
}

export default HomeScreen