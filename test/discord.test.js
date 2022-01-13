/* global describe it */
'use strict'
const dc = require('../lib/discord')

describe.skip('discord', function () {
  it('sendMessage', async function () {
    await dc.sendAlert('GM')
  })
})
