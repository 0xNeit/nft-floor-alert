/* global describe it */
'use strict'
const dc = require('../lib/discord')

describe('discord', function () {
  it('sendMessage', async function () {
    await dc.sendAlert('GM')
  })
})
