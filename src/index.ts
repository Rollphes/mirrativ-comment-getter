import EventEmitter from 'events'
import request from 'request'
import { client } from 'websocket'
const socket = new client()

export class Client extends EventEmitter {
  broadcast_key?: string
  live_id?: string
  image_url?: string
  share_url?: string
  description?: string
  title?: string
  total_viewer_num?: number
  started_at?: number
  app?: {
    app_id?: string
    app_user_detail?: {
      name: string | null
      url: string | null
      user_id: string | null
    }
    app_user_id_label?: string
    icon_url?: string
    store_url?: string
    title?: string
  }
  owner?: {
    birthday?: string
    description?: string
    name: string
    profile_image_url?: string
    share_url: string
    twitter_screen_name?: string
    user_id: string
  }
  constructor() {
    super()
  }
  async start(url: string) {
    const body = await rqt(
      'https://www.mirrativ.com/api/live/live?live_id=' + url.split(/[\/|?]/)[4]
    )
    const mirrativ = JSON.parse(body) as MirrativTypes
    this.app = mirrativ.app
    this.owner = mirrativ.owner
    this.broadcast_key = mirrativ.broadcast_key
    this.live_id = mirrativ.live_id
    this.image_url = mirrativ.image_url
    this.share_url = mirrativ.share_url
    this.description = mirrativ.description
    this.title = mirrativ.title
    this.total_viewer_num = mirrativ.total_viewer_num
    this.started_at = mirrativ.started_at
    const this0 = this
    socket.on('connectFailed', function (error) {
      throw new Error('Connect Error: ' + error.toString())
    })
    socket.on('connect', function (connection) {
      connection.on('message', function (msg) {
        if (msg.type === 'utf8') {
          if (msg.utf8Data === 'ACK  ') return
          const msgJson = /{.*?$/.exec(msg.utf8Data)
          if (!msgJson) return
          const message = JSON.parse(msgJson[0]) as CommentOld | GiftOld
          if (message.t === 1) {
            this0.emit('comment', new Comment(message))
          }
          if (message.t === 35) {
            this0.emit('gift', new Gift(message))
          }
        }
      })
      setInterval(() => connection.sendUTF('PING'), 60000)
      connection.sendUTF('SUB	' + mirrativ.broadcast_key)
    })
    socket.connect('wss://online.mirrativ.com/')
  }
}

export declare interface Client {
  on(event: 'comment', listener: (comment: Comment) => void): this
  on(event: 'gift', listener: (gift: Gift) => void): this
  on(event: string, listener: Function): this
}

interface MirrativTypes {
  broadcast_key: string
  live_id: string
  image_url?: string
  share_url: string
  description?: string
  title: string
  total_viewer_num: number
  started_at: number
  app: {
    app_id?: string
    app_user_detail?: {
      name: string | null
      url: string | null
      user_id: string | null
    }
    app_user_id_label?: string
    icon_url?: string
    store_url?: string
    title?: string
  }
  owner: {
    birthday?: string
    description?: string
    name: string
    profile_image_url?: string
    share_url: string
    twitter_screen_name?: string
    user_id: string
  }
}

interface CommentOld {
  ac?: string
  cm?: string
  created_at?: number
  iurl?: string
  speech?: string
  u?: string
  t: number
}

interface GiftOld {
  ac?: string
  gift_title?: string
  coins?: string
  count?: string
  speech?: string
  iurl?: string
  u?: string
  t: number
}

class Comment {
  userName?: string
  comment?: string
  createdAt?: number
  iconUrl?: string
  speech?: string
  userId?: string
  type: number
  constructor(old: CommentOld) {
    this.userName = old.ac
    this.comment = old.cm
    this.createdAt = old.created_at
    this.iconUrl = old.iurl
    this.speech = old.speech
    this.userId = old.u
    this.type = old.t
  }
}
class Gift {
  userName?: string
  giftTitle?: string
  coins?: string
  count?: string
  speech?: string
  iconUrl?: string
  userId?: string
  type: number
  constructor(old: GiftOld) {
    this.userName = old.ac
    this.giftTitle = old.gift_title
    this.coins = old.coins
    this.count = old.count
    this.iconUrl = old.iurl
    this.speech = old.speech
    this.userId = old.u
    this.type = old.t
  }
}

function rqt(url: string): Promise<string> {
  return new Promise<string>((resolve) => {
    request({ method: 'GET', url: url }, (error, response, body) => {
      resolve(body as string)
    })
  })
}
