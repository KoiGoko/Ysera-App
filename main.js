const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minHeight: 600,
        minWidth: 1020,

        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: 'white',
            symbolColor: 'black'
        },
        webPreferences: {
            preload: 'preload.js'
        },


    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('open-url', (event, url) => {
        dialog.showErrorBox('欢迎回来', `你好`)
    })
})
app.commandLine.appendSwitch('--enable-features', 'OverlayScrollbar')

console.log('welcome to electron')