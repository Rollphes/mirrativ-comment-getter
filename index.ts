import fs from 'fs'
import request from 'request'

const url =
  'https://www.mirrativ.com/api/live/live?live_id=' +
  process.argv[2].split(/\//)[4]

request({ method: 'GET', url: url }, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(JSON.parse(body))
  }
})
