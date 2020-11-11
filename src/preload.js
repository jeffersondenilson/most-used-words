/*
Usar ipc sem nodeIntegration: true
referência: https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
*/
import { ipcRenderer } from 'electron';
window.ipcRenderer = ipcRenderer;