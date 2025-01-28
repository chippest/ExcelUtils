// const path = require("path");
// require("electron-reload")(path.join(__dirname, "."), {
//   electron: require(`${__dirname}/node_modules/electron`),
// });

const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 330,
    height: 660, // Increased height to accommodate new elements
    frame: false, // Removes the default title bar
    transparent: true, // Enables transparency
    alwaysOnTop: true, // Keeps the window on top of others (optional)
    // resizable: false, // Prevent resizing for consistent visuals
    hasShadow: false, // Removes the shadow for a cleaner look
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
