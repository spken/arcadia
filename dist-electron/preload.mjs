"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  getSystemInfo() {
    return electron.ipcRenderer.invoke("get-system-info");
  }
});
electron.contextBridge.exposeInMainWorld("electron", {
  readFile: (path) => electron.ipcRenderer.invoke("read-file", path),
  writeFile: (path, data) => electron.ipcRenderer.invoke("write-file", path, data)
});
