import {IBarcode} from "./types/barcode"

export interface IElectronAPI {
  captureCamera: () => void,
  getBarCode: (callback: (event: Electron.IpcRendererEvent, barcode: IBarcode) => void) => void,
}

declare global {
  interface Window {
    myAPI: IElectronAPI
  }
}