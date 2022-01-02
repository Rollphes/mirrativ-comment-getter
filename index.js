"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const request_1 = __importDefault(require("request"));
const websocket_1 = require("websocket");
const socket = new websocket_1.client();
class Mirrativ extends events_1.default {
    constructor(url) {
        super();
    }
    start(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield rqt('https://www.mirrativ.com/api/live/live?live_id=' + url.split(/[\/|?]/)[4]);
            const mirrativ = JSON.parse(body);
            this.app = mirrativ.app;
            this.owner = mirrativ.owner;
            this.broadcast_key = mirrativ.broadcast_key;
            this.live_id = mirrativ.live_id;
            this.image_url = mirrativ.image_url;
            this.share_url = mirrativ.share_url;
            this.description = mirrativ.description;
            this.title = mirrativ.title;
            this.total_viewer_num = mirrativ.total_viewer_num;
            this.started_at = mirrativ.started_at;
            const this0 = this;
            socket.on('connectFailed', function (error) {
                throw new Error('Connect Error: ' + error.toString());
            });
            socket.on('connect', function (connection) {
                connection.on('message', function (msg) {
                    if (msg.type === 'utf8') {
                        if (msg.utf8Data === 'ACK  ')
                            return;
                        const msgJson = /{.*?$/.exec(msg.utf8Data);
                        if (!msgJson)
                            return;
                        const message = JSON.parse(msgJson[0]);
                        if (message.t === 1) {
                            this0.emit('comment', new Comment(message));
                        }
                        if (message.t === 35) {
                            this0.emit('gift', message);
                        }
                    }
                });
                setInterval(() => connection.sendUTF('PING'), 60000);
                connection.sendUTF('SUB	' + mirrativ.broadcast_key);
            });
            socket.connect('wss://online.mirrativ.com/');
        });
    }
}
exports.default = Mirrativ;
class Comment {
    constructor(old) {
        this.userName = old.ac;
        this.comment = old.cm;
        this.createdAt = old.created_at;
        this.iconUrl = old.iurl;
        this.speech = old.speech;
        this.userId = old.u;
        this.type = old.t;
    }
}
class Gift {
    constructor(old) {
        this.userName = old.ac;
        this.giftTitle = old.gift_title;
        this.coins = old.coins;
        this.count = old.count;
        this.iconUrl = old.iurl;
        this.speech = old.speech;
        this.userId = old.u;
        this.type = old.t;
    }
}
function rqt(url) {
    return new Promise((resolve) => {
        (0, request_1.default)({ method: 'GET', url: url }, (error, response, body) => {
            resolve(body);
        });
    });
}
