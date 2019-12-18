const  _ = require('lodash')
const jsonfile = require('jsonfile')

const deposit = require('./deposit')
const savings = require('./savings')
const statements = require('./statements')

const db = './sessions/db.json'

const dashboardInstructions = `Choose a service to proceed: \n1. Deposit money \n2. Check savings \n3. View statement`

module.exports = menu => {
    menu.state('dashboard', {
        run: () => {
            const {
                val,
                args: { phoneNumber }
            } = menu

            const data = jsonfile.readFileSync(db)
            let user = data[`${phoneNumber}`]

            jsonfile.writeFileSync(db, {
                ...data,
                users: _.map(data.users, user => {
                    const { phone } = user;

                    if (phone === phoneNumber) {
                        return { ...user, page: 0}
                    }

                    return user
                })
            })

            if (_.isEqual(user, {})) {
                user = _.find(data.users, ({ phone }) => phone === phoneNumber)
                const {authenticated, lastState} = user

                if (typeof authenticated !== 'undefined') {
                    menu.con(dashboardInstructions)
                } else if (`${user.pin}` === `${val}`) {
                    jsonfile.writeFileSync(db, {
                        ...data,
                        user: _.map(data.users, user => {
                            const{ phone } = user;

                            if (phone === phoneNumber) {
                                return { ...user, authenticated: true}
                            }

                            return user
                        })
                    })

                    menu.con(dashboardInstructions)
                } else {
                    menu.go('login.invalidPIN')
                }
             } else {
                 if (`${user.pin}` === `${val}`) {
                     jsonfile.writeFileSync(db, {
                         ...data,
                         users: _.concat(data.users, [{...user, phone: phoneNumber}]),
                         [`${phoneNumber}`]: {} 
                     })

                     menu.con(dashboardInstructions)
                 } else {
                     menu.end(`PINs dont match`)
                 }
             }
        },
        next: {
            '1': 'dashboard.deposit',
            '2': 'dashboard.savings',
            '3': 'dashboard.statements'
        }
    });

    _.over([deposit, savings, statements])(menu)
    
    return menu
}

