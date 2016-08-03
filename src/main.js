const electron = require('electron')
const {app} = electron
const {BrowserWindow} = electron
const fs = require('fs')

let win

function createWindow() {
	win = new BrowserWindow({width: 1200, height: 1000})

	win.loadURL('http://www.hotpepper.jp/')

	win.on('closed', () => {
		win = null
	})

	win.webContents.on('did-finish-load', captureFunc)
}

function captureFunc() {
	win.capturePage(function(img) {
		setTimeout(function() {
			fs.writeFileSync('img/screenshot_' + (new Date()).getTime() + '.png', img.toPng())
		}, 1000)
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

