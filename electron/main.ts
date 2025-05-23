import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import si from 'systeminformation'

const require = createRequire(import.meta.url)
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
  
  ipcMain.handle('get-system-info', async () => {
    return await getSystemInfo();
  });
    let systemInfoInterval: NodeJS.Timeout;
  
  systemInfoInterval = setInterval(async () => {
    if (win) {
      const systemInfo = await getSystemInfo();
      win.webContents.send('system-info-update', systemInfo);
    } else {
      clearInterval(systemInfoInterval);
    }
  }, 5000);
});
