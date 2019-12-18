const UssdMenu = require('ussd-menu-builder')
const _ = require('lodash')

let menu = new UssdMenu()

const Tenant = require('./Tenant')
const landlord = require('./landlord')

//Menu State Logic
const authenticate = require('./authenticate').authenticate
const identify = require('./validate').identify
const balance = require('./balance').balance
const noticeList = require('./notice').noticeList
const noticeProcess = require('./notice').process
const landstatement = require('./statements').landstate
const collections = require('./collections').landcollections
const changePassword = require('./changepassword').changePassword
const properties = require('./properties').properties
const tenantstatement = require('./tenantstatements').tenantstate


module.exports = (req, res) => {

    //Africastalking requirements
    const sessionId = req.body.sessionId;
    const serviceCode = req.body.serviceCode
    const phoneNumber = req.body.phoneNumber
    const text = req.body.text


console.log(sessionId, phoneNumber, serviceCode, text)

    menu.startState('mainMenu',{
        run: () => {

            menu.con('Welcome to Alfar living. Choose a category: ' +
            '\n1. Landlord' +
            '\n2. Tenant')
        },
        next: {
            '1': 'Landlord',
            '2': 'Tenant'
        },
        defaultNext: 'invalidOption'
    })

    menu.state('invalidOption', {
        run: () => {
              menu.end('Invalid option')
        }
    })

    app.post('/ussd', function(req, res) {
        menu.run(req.body, ussdResult => {
            res.send(ussdResult)
        })
    })

    _.over([landlord, Tenant])(menu)

    return menu
}