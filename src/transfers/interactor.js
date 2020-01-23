const entity = require('./entity')

/**
 * What do we have to do to make a successful transfer?
 * First, we need to check if sender has funds
 * Second, debit the amount from sender account
 * Third, credit the amount in the beneficiary account
 */

const interactor = {
    transfer: async ({ senderId, beneficiaryId, amount }) => {
        // check if sender has enough funds. the details will be implemented
        // in the entity because "enough funds" may differ from customer
        // to customer
        const hasFunds = await entity.hasFunds(senderId, amount)
        if (!hasFunds) throw Error('Not enough funds')
        // debits sender. if something odd occurs, the error will be
        // caught in the translator
        await entity.debit(senderId, amount)
        // credits beneficiary. in a real world app, an error here
        // show revert the debit above by making a credit to the
        // sender's account
        await entity.credit(beneficiaryId, amount)
    }
}

module.exports = interactor