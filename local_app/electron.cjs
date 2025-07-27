// electron.cjs

const { app, BrowserWindow, ipcMain, powerMonitor, systemPreferences } = require('electron');
const path = require('path');
const fs = require('fs');
const activeWin = require('active-win');
const { execSync } = require('child_process');

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

let trackingInterval;
let appUsage = {};
let lastCheckTime = null;

app.whenReady().then(async () => {
  if (process.platform === 'darwin') {
    const status = systemPreferences.getMediaAccessStatus('screen');
    if (status !== 'granted') {
      await systemPreferences.askForMediaAccess('screen');
    }
  }

  createWindow();

  ipcMain.on('start-tracking', () => {
    takeScreenshot(); // Take one screenshot immediately
    startScreenshotInterval(); // Start the interval
    
    if (trackingInterval) clearInterval(trackingInterval);
    appUsage = {};
    lastCheckTime = Date.now();
    trackingInterval = setInterval(async () => {
      try {
        const window = await activeWin();
        if (window) {
          const now = Date.now();
          const deltaTime = now - lastCheckTime;
          const appName = window.owner.name;
          if (!appUsage[appName]) {
            appUsage[appName] = 0;
          }
          appUsage[appName] += deltaTime;
          lastCheckTime = now;
        }
      } catch (error) { /* suppress errors */ }
    }, 1000);
  });
  
  ipcMain.on('stop-tracking', (event) => {
    stopScreenshotInterval();
    if (trackingInterval) {
      clearInterval(trackingInterval);
      trackingInterval = null;
    }
    event.sender.send('app-usage', appUsage);
    appUsage = {};
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
  if (screenshotInterval) clearInterval(screenshotInterval);
  // Set to run takeScreenshot every 10 minutes (600,000 milliseconds)
  screenshotInterval = setInterval(takeScreenshot, 60000);
}

function stopScreenshotInterval() {
  if (screenshotInterval) {
    clearInterval(screenshotInterval);
    screenshotInterval = null;
  }
}

// --- NEW SIMPLIFIED takeScreenshot FUNCTION ---
async function takeScreenshot() {
  console.log("Attempting to take a screenshot of the active window...");
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const screenshotsPath = path.join(__dirname, 'screenshots');

  if (!fs.existsSync(screenshotsPath)) {
    fs.mkdirSync(screenshotsPath, { recursive: true });
  }

  try {
    const activeWindow = await activeWin();

    if (activeWindow) {
      const windowId = activeWindow.id;
      const appName = activeWindow.owner.name;
      const windowName = activeWindow.title;

      // Filter out our own app
      if (appName === 'rest-express' || appName === 'Electron') {
        console.log(`Skipping screenshot of own application: ${appName}`);
        return;
      }

      const sanitizedAppName = appName.replace(/[^a-z0-9]/gi, '_');
      const sanitizedWindowName = windowName.replace(/[^a-z0-9]/gi, '_');
      const filename = path.join(screenshotsPath, `${sanitizedAppName}_${sanitizedWindowName}_${timestamp}.png`);

      // Use the -l flag with the window ID for a silent, direct capture.
      console.log(`Capturing active window ID ${windowId} (${appName}: ${windowName})`);
      execSync(`screencapture -l${windowId} "${filename}"`);
      
      if (fs.existsSync(filename) && fs.statSync(filename).size > 0) {
        console.log(`✓ Screenshot SAVED: ${filename}`);
        // Send screenshot data to the renderer process
        if (win) {
          win.webContents.send('screenshot-taken', {
            path: filename,
            timestamp: Math.floor(Date.now() / 1000) // Unix timestamp in seconds
          });
        }
      } else {
        console.log(`✗ Screenshot file for active window was empty or not created.`);
      }
    } else {
      console.log("No active window found to screenshot.");
    }
  } catch (error) {
    console.error('Error taking screenshot of active window:', error.message);
  }
}