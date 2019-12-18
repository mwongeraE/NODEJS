/*

e5dabf6703699bbaa5e83d46cae42b85092b67ae21de1174066a353a2a0f5011
*/

const express = require('express')
const bodyParser = require('body-parser')
//const DB = require('./path_to_js_file') //getPhoneNumbers function get's numbers from DB

const app = express()
const credentials = {
    apiKey: 'e5dabf6703699bbaa5e83d46cae42b85092b67ae21de1174066a353a2a0f5011',
    username: 'sandbox'
}

const AT = require('africastalking')(credentials)

//initialize AT's SMS service
const sms = AT.SMS

//configure body-parser to accept json and form-data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/send_alert', (req, res) => {
    //get message information from post data
    const message = req.body.message

    //get user's number from DB, should return an array of phone numbers
    //const phoneNumbers = DB.getPhoneNumbers()

    //Create const options with fields to and message
    const options = {
        to: ['+254714017200'],
        message: "I've to a new offer for you G, hit me up",
        from: 'MWONGERA',
        enque: true        
    }

    //Thats it. AT will then send t=your SMSs to your simulators
    sms.send(options).then(info =>  {
        //return information from Africa's Talking
        res.json(info)
    }).catch (err => {
        console.log(err)
    })
})

app.listen(process.env.PORT || 8844, () => {
    console.log('Server running on port 8844')
})