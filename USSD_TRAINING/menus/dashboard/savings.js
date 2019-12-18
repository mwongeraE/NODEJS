const _ = require('lodash')
const JSONFile = require('jsonfile')

const db = `./sessions/db.json`

module.exports = menu => {
    menu.state('dashboard.savings', {
        run: () => {
            const {
                val,
                args: { phoneNumber }
            } = menu
            const data = JSONFile.readFileSync(db)

            const user = _.find(data.users, ({ phone }) => phone === phoneNumber) 

            const { deposits } = user

            let totalSavings = 0

            _.forEach(deposits || [], ({ amount }) => {
                totalSavings += parseFloat(amount)
            })

            menu.con(`You have so far saved Ksh ${totalSavings}. \n0. Back`)
        },
        next: {
            '0': 'dashboard'
        },
        defaultNext: 'invalidOption'
    })

    return menu
}