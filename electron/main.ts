import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import si from 'systeminformation'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

async function loadEarlySettings() {
  try {
    const settingsPath = path.join(process.env.APP_ROOT, 'settings.json');
    const settingsData = await fs.readFile(settingsPath, 'utf8');
    const settings = JSON.parse(settingsData);
    
    if (settings.hardwareAcceleration === false) {
      app.disableHardwareAcceleration();
      console.log('Hardware acceleration disabled by user settings');
    }
  } catch (error) {
    console.log('No settings file found or error loading settings, using defaults');
  }
}

loadEarlySettings();

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    minHeight: 600,
    minWidth: 800,
    center: true,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })
  win.webContents.on('did-finish-load', async () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
    
    const initialSystemInfo = await getSystemInfo();
    win?.webContents.send('system-info-update', initialSystemInfo)
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

let systemInfoCache = {
  totalMemGB: '0',
  totalStorageGB: '0',
  gpuName: 'N/A',
  storage: '',
  gpu: 'N/A',
  lastFullUpdate: 0
};

async function getSystemInfo() {
  try {
    const currentTime = Date.now();
    const needsFullUpdate = currentTime - systemInfoCache.lastFullUpdate > 60000;
    
    const [cpuData, memData] = await Promise.all([
      si.currentLoad(),
      si.mem()
    ]);
    
    let result = {
      cpu: `${Math.round(cpuData.currentLoad)}%`,
      memory: '',
      gpu: 'N/A',
      storage: ''
    };
    
    const usedMemGB = (memData.used / (1024 * 1024 * 1024)).toFixed(1);
    
    if (needsFullUpdate || systemInfoCache.totalMemGB === '0') {
      const [gpuData, diskData] = await Promise.all([
        si.graphics(),
        si.fsSize()
      ]);
      
      const totalStorage = diskData.reduce((acc, disk) => acc + disk.size, 0);
      const freeStorage = diskData.reduce((acc, disk) => acc + disk.available, 0);
      systemInfoCache.totalStorageGB = (totalStorage / (1024 * 1024 * 1024)).toFixed(1);
      const freeStorageGB = (freeStorage / (1024 * 1024 * 1024)).toFixed(1);
      
      systemInfoCache.totalMemGB = (memData.total / (1024 * 1024 * 1024)).toFixed(1);
      
      systemInfoCache.gpuName = gpuData.controllers.length > 0 
        ? (gpuData.controllers[0].name || 'N/A')
        : 'N/A';
      systemInfoCache.storage = `${freeStorageGB} GB free of ${systemInfoCache.totalStorageGB} GB`;
      
      systemInfoCache.lastFullUpdate = currentTime;
      
      result.gpu = gpuData.controllers.length > 0 
        ? `${Math.round(gpuData.controllers[0].utilizationGpu || 0)}%` 
        : 'N/A';
      systemInfoCache.gpu = result.gpu;
      
      result.storage = systemInfoCache.storage;    } else {
      if (currentTime % 3 === 0) {
        const gpuUsage = await si.graphics().then(data => 
          data.controllers.length > 0 ? Math.round(data.controllers[0].utilizationGpu || 0) : 0
        ).catch(() => 0);
        
        result.gpu = `${gpuUsage}%`;
        systemInfoCache.gpu = result.gpu;
      } else {
        result.gpu = systemInfoCache.gpu || 'N/A';
      }
      
      result.storage = systemInfoCache.storage || `0 GB free of ${systemInfoCache.totalStorageGB} GB`;
    }
    
    result.memory = `${usedMemGB} GB / ${systemInfoCache.totalMemGB} GB`;
    
    return result;
  } catch (error) {
    console.error('Error getting system info:', error);
    return {
      cpu: 'Error',
      memory: 'Error',
      gpu: 'Error',
      storage: 'Error'
    };
  }
}

app.whenReady().then(async () => {
  const initialSystemInfo = await getSystemInfo();
  
  createWindow();
  
  if (win) {
    win.webContents.send('system-info-update', initialSystemInfo);
  }

  let systemInfoInterval: NodeJS.Timeout;

  ipcMain.handle('get-system-info', async () => {
    return await getSystemInfo();
  });

  ipcMain.handle('read-file', async (_, filePath: string) => {
    try {
      const fullPath = path.join(process.env.APP_ROOT || __dirname, filePath);
      const data = await fs.readFile(fullPath, 'utf-8');
      return data;
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  });
  ipcMain.handle('write-file', async (_, filePath: string, data: string) => {
    try {
      const fullPath = path.join(process.env.APP_ROOT || __dirname, filePath);
      await fs.writeFile(fullPath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  });
  ipcMain.handle('restart-app', async () => {
    try {
      console.log('Restart requested...');
      
      if (systemInfoInterval) {
        clearInterval(systemInfoInterval);
      }
      
      if (VITE_DEV_SERVER_URL) {
        console.log('Development mode: reloading window...');
        if (win) {
          win.reload();
        }
        return true;
      }
      
      console.log('Production mode: restarting app...');
      
      BrowserWindow.getAllWindows().forEach(window => {
        window.close();
      });
      
      setTimeout(() => {
        app.relaunch();
        app.exit(0);
      }, 100);
      
      return true;
    } catch (error) {
      console.error('Error during restart:', error);
      throw error;
    }
  });
  ipcMain.handle('hardware-acceleration-changed', async () => {
    return true;
  });

  systemInfoInterval = setInterval(async () => {
    if (win) {
      const systemInfo = await getSystemInfo();
      win.webContents.send('system-info-update', systemInfo);
    } else {
      clearInterval(systemInfoInterval);
    }
  }, 5000);
});
