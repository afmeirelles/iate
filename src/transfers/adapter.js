const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const dbPath = path.join(__dirname, '..', 'db/db.json')

/**
 * Here we use a file as database, but it could be whatever you want
 * Notice how easy it would be to simply write another adapter
 * for a database or an HTTP service
 */

const adapter = {
    getBalance: async customerId => {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
        const lastRecord = _.findLast(db, { customerId })
        if (_.isNil(lastRecord)) return 0
        return lastRecord.balance
    },
    register: async (customerId, amount, balance) => {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
        db.push({ customerId, amount, balance })
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
    }
}

module.exports = adapter