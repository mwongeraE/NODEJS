const _ = require('lodash')
const JSONFile = require('jsonfile')

const db = `./sessions/db.json`

module.exports = menu => {
    menu.state('register', {
        run: () => {
            const {
                val,
                args: { phoneNumber }
            } = menu

            const data = JSONFile.readFileSync(db)

            JSONFile.writeFileSync(db, {
                ...data,
                [`${phoneNumber}`]: {
                    first_name: val
                }
            })

            menu.con(`Enter your last name: `)
        },
        next: {
            '*\\w+': 'register.pin'
        }
    })

    menu.state('register.pin', {
        run: () => {
            const {
                val,
                args: {phoneNumber}
            } = menu

            const data = JSONFile.readFileSync(db)

            JSONFile.writeFileSync(db, {
                ...data,
                [`${phoneNumber}`]: {
                    ...data[`${phoneNumber}`],
                    last_name: val
                }
            })

            const { first_name } = data[`${phoneNumber}`]

            menu.con(`Hi ${first_name}! \Enter your preferred 4-digit PIN: `)
        },
        next: {
            '*\\d{4}': 'register.pin.confirm'
        },
        defaultNext: 'register.pin.invalidPIN'
    })

    menu.state('register.pin.invalidPIN', {
        run: () => {
            menu.con(`Invalid PIN provided. Try again.`)
        },
        next: {
            '*\\d{4}': 'register.pin.confirm'
        },
        defaultNext: 'register.pin.invalidPIN'
    })

    menu.state('register.pin.confirm', {
        run: () => {
            const {
                val,
                args: { phoneNumber }
            } = menu

            const data = JSONFile.readFileSync(db)

            JSONFile.writeFileSync(db, {
                ...data,
                [`${phoneNumber}`]: {
                    ...data[`${phoneNumber}`],
                    pin: val
                }
            })

            const { first_name } = data[`${phoneNumber}`]

            menu.con(`HI ${first_name}! \nEnter your preferred 4-digit PIN again: `)
        },
        next: {
            '*\\d{4}' : 'dashboard'
        },
        defaultNext: 'register.pin.invalidPIN'
    })

}