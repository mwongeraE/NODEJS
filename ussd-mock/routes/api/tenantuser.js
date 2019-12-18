//Set app credentials
const credentials = {
    apiKEy : '',
    username: ''
}

//Initialize the sdk
const AfricasTalking = require('africastalking')(credentials)

//Get he payments service
const payments = AfricasTalking.PAYMENTS

//Tenant pay rent
router.put('api.alfar.co/api/ussdpayrent', (req, res) => {
    var firstname = req.body.phoneNumber

    let sql = "UPDATE tenantuser SET firstname='"+ req.body.phonenumber+"', rent_amount='"+ req.body.rent_amount+"' WHERE rent_id="+req.params;
    res.send(firstname)
})

//Tenant pay rent paybill
//Mpesa checkout
router.get('api.alfar.co/api/ussdpayrentpaybill', (req, res) => {
    var phone = req.params.phoneNumber
    

    res.send(phone)
})

//Tenant pay rent checkout
router.get('api.alfar.co/api/ussdpayrentcheckout', (req, res) => {
    var phone = req.params.phoneNumber

    res.send(phone)
})

async function initiateMobileCheckout() {
    const options = {
        //Set the name of your Africa's talking payment product
        productName: 'Alfar Living',
        // Set the phone number you want to send to in international format
        phoneNumber: '+254790xxxxxx',
        //Set the 3-letter ISO currency code and checkount amount
        currencyCode: 'KES',
        ammount: 'Amount to be sent by customer',
        //Set any metadata that you would like to send along with this request
        //This metadata will be included when we send back the final payment notification
        metadata: {
            foo: 'bar',
            key: 'value'
        }
    }

    //Thats it hit send and AT will take care of the rest
    try {
        const result = await payments.mobileCheckout(options)
        console.logo(result)
    } catch (err) {
        console.log(err)
    }
}

initiateMobileCheckout()

//Tenant pay rent Bank
router.get('api.alfar.co/api/ussdpayrentbank', (req, res) => {
    var phone = req.params.phoneNumber
    res.send(phone)
})

//Tenant check balance
router.get('api.alfar.co/api/ussdtbalance', (req, res) => {
    var phone = req.params.phoneNumber
    res.send(phone)
})

//Tenant statement
router.get('api.alfar.co/api/ussdtstatement', (req, res) => {
    var phone = req.params.phoneNumber
    res.send(phone)
})

//Tenant issue notice
router.post('api.alfar.co/api/ussdnotice', (req,res) => {
    var phone = req.body.phoneNumber

    phone.save(function(err) {
        if(err)
            res.send(err)
        
        res.json({ message: 'Notice Issued'})
    })
    res.send(phone)
})

//Tenant notice confirmed
router.get('api.alfar.co/api/ussdnoticeconfirm', (req, res) => {
    var phone = req.body.phoneNumber
    phone.find(function(err, phone) {
        if (err)
            res.send(err)
        
        res.json(phone)
    })
    res.send(phone)
})


