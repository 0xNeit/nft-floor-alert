'use strict'
const moemnt = require('moment-timezone')
const sleep = require('sleep-promise')
const ilog = require('ilog')
const config = require('./config')
const os = require('./lib/opensea')
const dc = require('./lib/discord')

const floorPriceMap = {}

const ADDRESS = config.address
const VOLATILITY = config.volatility

async function check () {
  const collections = await os.retriveCollections(ADDRESS)

  ilog.debug({ collections })

  await Promise.all(collections.map(async function (collection) {
    if (config.ignores.includes(collection)) return

    if (!floorPriceMap[collection]) floorPriceMap[collection] = []

    if (floorPriceMap[collection].length > 120) floorPriceMap[collection].shift()

    try {
      const price = await os.getFloorPrice(collection)

      ilog.debug({ collection, price })

      if (typeof price === 'number') floorPriceMap[collection].push({ time: new Date(), price })

      for (const item of floorPriceMap[collection]) {
        const diff =  Math.abs(item.price - price)

        ilog.debug({ diff })

        if (diff >= VOLATILITY) {
          const content = `
            floor alert:
            ${collection}
            ${moemnt(item.time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}: ${item.price} eth
            ${moemnt(new Date()).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}: ${price} eth
          `

          ilog.debug({ content })
          await dc.sendAlert(content)

          floorPriceMap[collection] = []

          break
        }
      }
    } catch (error) {
      ilog.error(error)
    }
  }))
}

async function job () {
  ilog.info('start alterting...')

  while (true) {
    await check()
    await sleep(60000)
  }
}

job().catch(ilog.error)
