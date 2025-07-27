const { app, BrowserWindow, ipcMain, desktopCapturer, powerMonitor, systemPreferences } = require('electron');
const path = require('path');
const fs = require('fs');
const activeWin = require('active-win');
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
let appUsage = {}; // Stores time spent on each app in milliseconds
let lastCheckTime = null;
app.whenReady().then(async () => { // Make the function async
  // --- FIX 1: REQUEST PERMISSIONS ---
  // On macOS, you must request screen recording permission.
  // This will prompt the user on the first run.
  if (process.platform === 'darwin') { // 'darwin' is the name for macOS
    const status = systemPreferences.getMediaAccessStatus('screen');
    if (status !== 'granted') {
      await systemPreferences.askForMediaAccess('screen');
    }
  }
  // --- END OF FIX 1 ---

  createWindow();
ipcMain.on('start-tracking', () => {
// Immediately take a screenshot when tracking starts, then start the interval
takeScreenshot();
startScreenshotInterval();
if (trackingInterval) clearInterval(trackingInterval);

appUsage = {}; // Reset usage data
lastCheckTime = Date.now();

trackingInterval = setInterval(async () => {
  try {
    const window = await activeWin();
    const now = Date.now();
    const deltaTime = now - lastCheckTime;

    if (window) {
      const appName = window.owner.name;
      if (!appUsage[appName]) {
        appUsage[appName] = 0;
      }
      appUsage[appName] += deltaTime;
    }
    
    lastCheckTime = now;

  } catch (error) {
    console.error('Error getting active window:', error);
  }
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
screenshotInterval = setInterval(takeScreenshot, 600000);
}
function stopScreenshotInterval() {
if (screenshotInterval) {
clearInterval(screenshotInterval);
screenshotInterval = null;
}
}
// --- MODIFIED FUNCTION ---
async function takeScreenshot() {
  console.log("Attempting to take screenshots of all windows...");
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const screenshotsPath = path.join(__dirname, 'screenshots');

  if (!fs.existsSync(screenshotsPath)) {
    fs.mkdirSync(screenshotsPath, { recursive: true });
  }

  try {
    const sources = await desktopCapturer.getSources({
        types: ['window', 'screen'], // Include screen just in case window fails
        thumbnailSize: { width: 1920, height: 1080 }
    });

    // --- FIX 2: DEBUG LOGGING ---
    console.log('Found sources:', sources.length);
    if (sources.length === 0) {
        console.log('Desktop Capturer returned no sources. Check OS permissions.');
    }
    // --- END OF FIX 2 ---

    for (const source of sources) {
      const appName = source.name.toLowerCase();

      // Improved filtering
      if (!source.name || appName === 'rest-express' || appName === 'electron' || appName === 'entire screen') {
        // Log skipped windows to see what's being ignored
        console.log(`Skipping source: ${source.name}`);
        continue;
      }

      const sanitizedAppName = source.name.replace(/[\\?%*:|"<>.]/g, '');
      const screenshotPath = path.join(screenshotsPath, `${sanitizedAppName}-${timestamp}.png`);
      
      try {
        const imageBuffer = source.thumbnail.toPNG();
        fs.writeFileSync(screenshotPath, imageBuffer);
        console.log(`Screenshot saved for: ${source.name}`);
      } catch (error) {
        console.error(`Failed to save screenshot for ${source.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Error capturing desktop sources:', error);
  }
}