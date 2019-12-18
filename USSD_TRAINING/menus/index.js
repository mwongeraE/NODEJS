const UssdMenu = require ('ussd-menu-builder')
const _ = require ('lodash')
const JSONFile = require('jsonfile')

const login = require('./login')
const register = require('./register')
const dashboard = require('./dashboard/index.js')

let menu = new UssdMenu()

const db = require('../sessions/db.json')

module.exports = () => {
    menu.startState({
        run: () => {
            const { phoneNumber } = menu.args
            const data = JSONFile.readFileSync(db)

            JSONFile.writeFileSync(db, {
                ...data,
                users:
                    _.map(data.users, user => {
                        const { phone } = user

                        if (phone === phoneNumber) {
                            return {
                                ..._.pick(
                                    user,
                                    _.remove(_.keys(user), key => key !== 'authenticated')
                                ),
                                page: 0
                            }
                        }

                        return user;
                    }) || [],
                [`${phoneNumber}`]: {}    
            })

            const registerInstructions = `Welcome to mSACCO \nEnter your first name to register:`

            if (typeof data.users !== 'undefined') {
                const user = _.find(data.users, ({ phone }) => phone === phoneNumber)

                if (typeof data.user !== 'undefined') {
                    menu.con(
                        `Welcome back, ${user.first_name}! \nEnter your 4-digit PIN to continue:` 

                    )
                } else {
                    menu.con(registerInstructions)
                }
            } else {
                menu.con(registerInstructions)
            }
        },
        next: {
            '*\\d{4}': 'dashboard',
            '*\\w+': 'register'
        }
    })

    menu.state('invalidOption', {
        run: () => {
            menu.end(`Invalid option`)
        }
    })

    _.over([login, register, dashboard])(menu)

    return menu
}