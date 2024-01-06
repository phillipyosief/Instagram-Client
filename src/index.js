const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');
const { session } = require('electron')
const { mainWindow } = require('electron/main');

let url = "https://instagram.com/";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 624,
    minHeight: 624,
    minWidth: 800,
    title: "Instagram",
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 20
    },
    icon: "icon.png",

    webPreferences: {
      nodeIntegration: true, 
    },
  });



  if (nativeTheme.shouldUseDarkColors) {
    url = "https://instagram.com/"
    mainWindow.loadURL(url+"?theme=dark");
  }
  else {
    url = "https://instagram.com/"
    mainWindow.loadURL(url+"?theme=light");
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
    const draggableDiv = document.createElement('div');
    draggableDiv.style.cssText = '-webkit-app-region: drag; height: 20px; position: fixed; top: 0; left: 0; width: 100%;';
    document.body.appendChild(draggableDiv);
    draggableDiv.addText(' test');
  `);
  });

  
  nativeTheme.on('updated', () => {
    try {
      url = mainWindow.webContents.getURL();
    }
    catch (error) {
      url = "https://instagram.com/";
    }
    if (nativeTheme.shouldUseDarkColors) {
      url = "https://instagram.com/"
      mainWindow.loadURL(url+"?theme=dark");
    }
    else {
      url = "https://instagram.com/"
      mainWindow.loadURL(url+"?theme=light");
    }
  });





};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

nativeTheme.on('updated', () => {
  try {
    url = mainWindow.webContents.getURL();
  }
  catch (error) {
    url = "https://instagram.com/";
  }
  if (nativeTheme.shouldUseDarkColors) {
    try {
      mainWindow.loadURL(url+"?theme=dark");
    }
    catch (error) {
      console.log(error);
    }
    
  }
  else {
    try {
      mainWindow.loadURL(url+"?theme=light");
    }
    catch (error) {
      console.log(error);
    }
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
