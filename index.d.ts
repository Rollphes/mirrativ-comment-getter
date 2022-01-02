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
