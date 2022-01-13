'use strict'
const urllib= require('urllib')
const config = require('../config')

async function sendAlert (message) {
  await urllib.request(config.discordHook, {
    data: { content: message },
    method: 'POST',
    contentType:'json',
    dataType: 'json',
    timeout: 45 * 1000
  })
}

module.exports = {
  sendAlert
}

