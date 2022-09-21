const { app, BrowserWindow, Menu } = require("electron");
const { constant } = require("lodash");

var mainWindow = null;
async function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
  });

  await window.loadFile("index.html");
  //Remover Menu
  let menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);
}

//on ready
app.whenReady().then(createWindow);
