const _ = require('lodash')
const JSONFile = require('jsonfile')

const db = `./sessions/db.json`

module.exports = menu => {
    menu.state('login.invalidPIN', {
        run: () => {
            menu.con(`invalid PIN provided. Try Again.`)
        },
        next: {
            '*\\d{4}': 'dashboard'
        },
        defaultNext: 'login.invalidPIN'
    })

} 
