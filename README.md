# Mirrativ-Comment-Viewer

This is a comment viewer for Mirrativ

```javascript
const { Mirrativ } = require("mirrativ-comment-viewer");
const client = new Mirrativ();
client.on("comment", (msg) => {
  console.log(msg);
});
client.on("gift", (gift) => {
  console.log(gift);
});
client.start("URL");
```

## Types

### Client

```
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
  icon_url: string
  store_url: string
  title?: string
}
owner: {
  birthday: string <-※mmdd
  description: string
  name: string
  profile_image_url?: string
  share_url: string
  twitter_screen_name?: string
  user_id: string
}
```

### Gift

```
userName?: string
giftTitle?: string
coins?: string
count?: string
speech?: string
iconUrl?: string
userId?: string
type: number
```

### Comment

```
userName?: string
comment?: string
createdAt?: number
iconUrl?: string
speech?: string
userId?: string
type: number
```
