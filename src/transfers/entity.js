const adapter = require('./adapter')

/**
 * This is where the business rules are implemented, that is,
 * whatever steps the interactor needs will be detailed here.
 * Entity doesn't know what kind of database or service the
 * information it need is coming from. In this case is a file
 * in the OS, but notice how anyone reading the functions wouldn't
 * have a clue on where the data is being stored
 */

const entity = {
    hasFunds: async (customerId, amount) => {
        const balance = await adapter.getBalance(customerId)
        // this is the default behaviour, but a special 
        // customer could be allowed to have negative 
        // funds for a while, or until reach a fixed value.
        // those are business rules, and should be placed here
        return balance >= amount
    },
    debit: async (customerId, amount) => {
        // we ask the balance to outside world
        const balance = await adapter.getBalance(customerId)
        // and we register the operation with the new balance
        // (we're not in the 'update records' busines)
        await adapter.register(customerId, amount * -1, balance - amount)
    },
    credit: async (customerId, amount) => {
        // we ask the balance to outside world
        const balance = await adapter.getBalance(customerId)
        // and we register the operation with the new balance
        await adapter.register(customerId, amount, balance + amount)
    }
}

module.exports = entity