const { app, BrowserWindow, Menu } = require("electron");
const { constant } = require("lodash");
const path = require("path");
//const BrowserWindow = electron.remote.BrowserWindow;

let mainWindow;

// Function to create independent window or main window
function createWindow() {
  mainWindow = new BrowserWindow({
    //titleBarStyle: "hidden",
    //titleBarOverlay: true,
    width: 800,
    height: 600,
    // Make sure to add webPreferences with
    // nodeIntegration and contextIsolation
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });
  

  // Main window loads index.html file
  mainWindow.loadFile("index.html");
  //tirar menu
  let menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);

  // To maximize the window
  mainWindow.maximize();
  mainWindow.show();
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
