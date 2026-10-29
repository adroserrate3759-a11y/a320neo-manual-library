const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 360,
    minHeight: 600,
    backgroundColor: "#0b121b",
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile(path.join(__dirname, "..", "www", "index.html"));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) shell.openExternal(url);
    return { action: "deny" };
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });

