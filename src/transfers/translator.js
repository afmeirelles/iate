const AJV = require('ajv')
const jwt = require('jsonwebtoken')
const interactor = require('./interactor')

const ajv = new AJV()

const translator = {
    transfer: async (req, res) => {
        // extracts senderId from jwt. in a real application, you would verify 
        // the signature against a secret or public key. you should check
        // sender credentials in the translator
        const auth = jwt.decode(req.token)
        // this is the message the application wants and needs
        const transferData = { ...req.body, senderId: auth.senderId }
        // validate data
        const schema = {
            type: 'object',
            required: [ 'senderId', 'beneficiaryId', 'amount' ]
        }
        const valid = ajv.validate(schema, transferData)
        if (!valid) {
            // if payload is incorrect, we return the error reason
            res.status(400)
            return res.json({ message: ajv.errorsText() })
        }
        // here we're gonna catch all errors. in a real application,
        // you could automatically convert application errors into
        // HTTP (or other mechanism) errors
        try {
            await interactor.transfer(transferData)
            res.end()
        } catch (error) {
            console.log(error)
            res.json({ message: error.message })
        }
    }
}


module.exports = translator