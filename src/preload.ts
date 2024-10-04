import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('myAPI', {
    captureCamera: () => ipcRenderer.send('captureCamera'),
    getBarCode: (callback: (event: Electron.IpcRendererEvent, barcode: string) => void) => ipcRenderer.on('getBarCode', callback)
})