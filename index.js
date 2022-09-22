const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
//const BrowserWindow = electron.remote.BrowserWindow;

let mainWindow;
  
// Function to create independent window or main window
function createWindow() {
  mainWindow = new BrowserWindow({
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
  
// criar janela filha 
function createcadastrowin() {
  cadastroWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    modal: true,
    show: false,
    parent: mainWindow, // adição do parente
    frame:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    
  
  });
  
  // carregar janela cadastro.html file
  cadastroWindow.loadFile("cadastro.html");
  
  cadastroWindow.once("ready-to-show", () => {
    cadastroWindow.show();
  });
}
  
ipcMain.on("openChildWindow", (event, arg) => {
  createcadastrowin();
});
  
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