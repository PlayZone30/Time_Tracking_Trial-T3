const { app, BrowserWindow, ipcMain, desktopCapturer, powerMonitor } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('start-tracking', () => {
    startScreenshotInterval();
    startAppUsageTracking();
  });

  ipcMain.on('stop-tracking', () => {
    stopScreenshotInterval();
    stopAppUsageTracking();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  powerMonitor.on('suspend', () => {
    win.webContents.send('system-sleep');
  });

  powerMonitor.on('resume', () => {
    win.webContents.send('system-wake');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

let screenshotInterval;

function startScreenshotInterval() {
  screenshotInterval = setInterval(takeScreenshot, 600000); // 10 minutes
}

function stopScreenshotInterval() {
  clearInterval(screenshotInterval);
}

function takeScreenshot() {
  const timestamp = new Date().getTime();
  const screenshotsPath = path.join(__dirname, 'screenshots');

  if (!fs.existsSync(screenshotsPath)) {
    fs.mkdirSync(screenshotsPath);
  }

  desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } }).then(async sources => {
    for (const source of sources) {
      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
        const screenshotPath = path.join(screenshotsPath, `screenshot-${timestamp}.png`);
        fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
          if (error) return console.log(error);
          console.log(`Screenshot saved to ${screenshotPath}`);
        });
        return;
      }
    }
  });
}

let appUsageInterval;
let lastApp = null;
let lastAppStartTime = null;

function startAppUsageTracking() {
  appUsageInterval = setInterval(trackAppUsage, 1000);
}

function stopAppUsageTracking() {
  clearInterval(appUsageInterval);
  trackAppUsage(); // Track the last app before stopping
  win.webContents.send('app-usage', appUsage);
  appUsage = {};
}

let appUsage = {};

function trackAppUsage() {
  exec('python3 get_active_window.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    const currentApp = stdout.trim();
    if (lastApp) {
      const elapsed = new Date().getTime() - lastAppStartTime;
      if (!appUsage[lastApp]) {
        appUsage[lastApp] = 0;
      }
      appUsage[lastApp] += elapsed;
    }
    lastApp = currentApp;
    lastAppStartTime = new Date().getTime();
  });
}