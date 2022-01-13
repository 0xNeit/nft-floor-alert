
/* global describe it */
'use strict'
const assert = require('assert')
const os = require('../lib/opensea')

describe('opensea', function () {
  it('should get all collections from given address', async function () {
    const collections = await os.retriveCollections('0xB38c77467bbd4b13228e236930B2a8740241F7a9')

    assert.strictEqual(Array.isArray(collections), true)
  })

  it('should get collection floor price', async function () {
    const price = await os.getFloorPrice('ens')

    assert.strictEqual(price > 0, true)
  })
})
