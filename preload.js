const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
    // 能暴露的不仅仅是函数，我们还可以暴露变量
})


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

//handle drag without electron menubar
function initTopDragBar() {
    const topDiv = document.createElement('div')
}

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded () {
    initTopDragBar()
    document.getElementById('drag-top-line').
    addEventListener('dblclick', e => {
        if (window.$isMac) {window.ipcRenderer.send('toggleMax')}})
})

