const bcrypt = require('bcrypt')
const moment = require('moment')
const db = require('../models')

/*
Authenticates a user
*/

const authenticate = async (menus) => {
    let authenticated = await menus.session.get('authenticated')
    if (authenticated) return 'mainMenu'
    authenticated = false

    let user = await ussdMenu.session.get('user')
    let submittedPassword = await bcrypt.hash(menus.val, user.salt)

    if (user.encryptedPassword === submittedPassword) {
        authenticated = true

        await db.user.update({
            lastSignInAt: (() => {
                return moment().format('YYYY-MM-DD HH:mm:ss')
            })(),
        }, {
            where: {
                id: member.id,
            },
            fields: ['lastSignInAt']
        })
    }

    //Go to authenticate.fail
    if (!authenticated) return 'authenticate.fail'

    //Go to changePassword
    let changePassword = moment(user.createdAt).isSame(user.changepasswordAt, 'seconds')
    if (changePassword) return 'changePassword'

    //Go to mainMenu
    return 'mainMenu'
}

module.exports = {authenticate}