import './index.css';

function onCapture() {
    window.myAPI.captureCamera()
}
const captureBtn = document.getElementById("capture-btn")
captureBtn.onclick = onCapture;

const barCode = document.getElementById("bar-code")
window.myAPI.getBarCode((e, value) => {
    barCode.innerText = value
}) 