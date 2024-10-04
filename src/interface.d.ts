export interface IElectronAPI {
    captureCamera: () => void,
    getBarCode: (callback: (event: Electron.IpcRendererEvent, barcode: string) => void) => void,
  }
  
  declare global {
    interface Window {
        myAPI: IElectronAPI
    }
  }