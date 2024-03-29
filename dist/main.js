const { app, BrowserWindow } = require('electron');
const path = require('path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon:path.join(__dirname, 'accelon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js')
    }
  })
  win.loadFile('index.html')
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
	  
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})