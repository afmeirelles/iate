const express = require('express')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

/**
 * *******************************
 * TRANSLATORS
 * *******************************
*/
const transfers = require('./transfers/translator')

// Server configs
const server = express()
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(bearerToken())

/**
 * *******************************
 * ROUTES
 * *******************************
 */

// Series
server.post('/transfer', transfers.transfer)


/** SERVER START */

const port = 3003

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

