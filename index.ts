import request from 'request'

const url =
  'https://www.mirrativ.com/api/live/live?live_id=' +
  process.argv[2].split(/\//)[4]

request({ method: 'GET', url: url }, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const mirrativ = JSON.parse(body) as Mirrativ
    console.log(mirrativ.title)
    console.log(mirrativ.owner.name)
    console.log(mirrativ.broadcast_host)
    console.log(mirrativ.broadcast_key)
  }
})

interface Mirrativ {
  avatar_body_image_url: string | null
  streaming_url_hls: string | null
  is_streaming_collab_enabled: number
  is_gift_supported: number
  mirroring: null
  live_id: string
  is_mirrorable: number
  app_title: string
  description: string | null
  total_viewer_num: number
  thumbnail_image_url: string | null
  is_archive: number
  is_singing_karaoke: number
  title: string
  max_online_viewer_num: number
  is_emomo_visible: boolean
  created_at: number
  is_live: number
  started_at: number
  blur_image_url: string
  preview_blur_image_url: string | null
  live_mos: null
  image_url_without_letterbox: string | null
  thumbnail_blur_image_url: string | null
  user_level: any
  is_connected_streaming_collab: number
  diamonds: number
  joined_live_thumbnail_image_url: string
  template_comments: any
  tags: any
  broadcast_host: string
  live_user_key: string | null
  app_user_id_label: string
  bcsvr_key: string
  heartbeated_at: number
  shares: {
    twitter: {
      maxlength: number
      card: any
      text: string | null
      placeholder: string
    }
    others: {
      text: string
    }
    title: string
    description: string
  }
  is_private: number
  collab_supported: number
  sticker_enabled: number
  collab_has_vacancy: number
  streaming_key: string
  stamp_num: number
  linked_live: null | any
  collab_online_user_num: number
  remaining_paid_coins: number
  share_image_url: string
  broadcast_key: string
  gift_ranking_url: string
  collab_mos: null | any
  remaining_coins: number
  archive_url_hls: string | null
  sticker_category_ids: any
  ended_at: number
  online_user_num: number
  announcement_url: string | null
  anniversary_bot_comment: string | null
  is_emomo_wipe_enabled: number
  share_url: string
  status: {
    msg: string | null
    ok: number
    error: string | null
    captcha_url: string | null
    error_code: number
    message: string | null
  }
  orientation: number
  is_app_user_id_hidden: number
  app_id: string
  app_is_category: number
  timeline: [{ app: any; timestamp: number; title: string | null }]
  app_icon_urls: string[]
  enable_clap: number
  remaining_free_coins: number
  is_paid_sticker_supported: number
  announcement_urls: {}
  sticker_num: number
  comment_num: number
  max_collab_user_num: number
  app_short_title: string | null
  owner: {
    share_url: string
    profile_image_url: string
    birthday_from: number
    is_birthday_editable: number
    badges: any
    is_new: number
    is_cheerleader: number
    catalog_label_image_url: string
    birthday: string | null
    birthday_to: number
    name: string
    is_birthday: number
    description: string
    birthday_editable_date: string | null
    properties: any
    is_continuous_streamer: number
    user_id: string
    live_request_num: string
    onlive: null | any
  }
  recommend_sticker_ids: any
  broadcast_port: number
  sticker_display_type: number
  archive_comment_enabled: number
  streaming_url_edge: string
  user_label_image_url: string
  collab_enabled: number
  gift_appeal_popup_image: null | any
  image_url: string
  collab_invitation: null | any
  orientation_v2: string
}
