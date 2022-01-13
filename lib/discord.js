'use strict'
const urllib= require('urllib')
const config = require('../config')

async function sendAlert (message) {
  await urllib.request(config.discordHook, {
    data: { content: message },
    method: 'POST',
    contentType:'json',
    dataType: 'json'
  })
}

module.exports = {
  sendAlert
}

