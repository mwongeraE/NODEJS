const db = require('../models')
const _ = require('lodash')

//Identifies a user via phoneNumber

const identify = async (UssdMenu) => {
    let exists = false
    let user = await db.phoneNumber.find({
        where: {
            phoneNumber: UssdMenu.args.phoneNumber,
        },
        attributes: ['id'],
        include: [{
            model: db.member,
            attributes: [
                'id',
                'firstName',
                'balance',
                'salt',
                'encryptedPassword',
                'createdAt',
            ]
        }]
    })

    if (_.isEmpty(user)) {
        await db.user.upsert({
            phoneNumber: UssdMenu.args.phoneNumber,
        })
    } else {
        exists = true
    }
    if (exists) {
        await UssdMenu.session.set('user', user.toJSON().user)
        let response = 'Welcome to Alfar Living. Please enter your pin'

        return {
            con: true,
            response: response,
        }
    }

    let response = `Welcome to Alfar. ` +
    `Your phone number ${UssdMenu.args.phoneNumber} ` +
    `is NOT registered.`

    return {
        con: false,
        response: response
    }
}

module.exports = {identify}