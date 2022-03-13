/// <reference types="node" />
import EventEmitter from 'events';
export declare class Client extends EventEmitter {
    broadcast_key?: string;
    live_id?: string;
    image_url?: string;
    share_url?: string;
    description?: string;
    title?: string;
    total_viewer_num?: number;
    started_at?: number;
    app?: {
        app_id?: string;
        app_user_detail?: {
            name: string | null;
            url: string | null;
            user_id: string | null;
        };
        app_user_id_label?: string;
        icon_url?: string;
        store_url?: string;
        title?: string;
    };
    owner?: {
        birthday?: string;
        description?: string;
        name: string;
        profile_image_url?: string;
        share_url: string;
        twitter_screen_name?: string;
        user_id: string;
    };
    constructor();
    start(url: string): Promise<void>;
}
export declare interface Client {
    on(event: 'comment', listener: (comment: Comment) => void): this;
    on(event: 'gift', listener: (gift: Gift) => void): this;
    on(event: string, listener: Function): this;
}
interface CommentOld {
    ac?: string;
    cm?: string;
    created_at?: number;
    iurl?: string;
    speech?: string;
    u?: string;
    t: number;
}
interface GiftOld {
    ac?: string;
    gift_title?: string;
    coins?: string;
    count?: string;
    speech?: string;
    iurl?: string;
    u?: string;
    t: number;
}
declare class Comment {
    userName?: string;
    comment?: string;
    createdAt?: number;
    iconUrl?: string;
    speech?: string;
    userId?: string;
    type: number;
    constructor(old: CommentOld);
}
declare class Gift {
    userName?: string;
    giftTitle?: string;
    coins?: string;
    count?: string;
    speech?: string;
    iconUrl?: string;
    userId?: string;
    type: number;
    constructor(old: GiftOld);
}
export {};
