import { WebSocketServer } from 'ws';
import GamesManager from './GamesManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GamesManager();
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on("disconnect",()=>gameManager.removeUser(ws))
});