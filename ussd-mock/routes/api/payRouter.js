const AfricasTalking = reqire('africastalking')

const africasTalking = new AfricasTalking({
    username: 'sandbox',
    apiKey: 'YOUR-API-KEY-HERE'
})

const payments = africasTalking.PAYMENTS

router.get('/', (req,res) => {
    res.render('cart')
})


router.post('/pay', (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const productName = 'YOUR-PRODUCT-NAME-HERE'

    const paymentOptions = {
        produtName: productName,
        phoneNumber: phoneNumber,
        currencyCode: 'KES',
        amount: 1500,
        narration: 'Online store payment',
        metadata: {
            customerEmail: 'jmdo@raw.com'
        }
    }

    payments.mobileCheckout(paymentOptions)
        .then((response) => {
            console.log(JSON.stringify(response, 0, 4))
        })
        .catch((error) => {
            console.log(error)
        })
    res.redirect('/processing')
})

//receive payment notification here ...

router.get('/processing', (req, res) => {
    res.render('processing')
})

router.post('/paymentNotification', (req, res) => {
    console.log(JSON.stringify(req.body, 0, 4))
    
    //SMS confirmation code here ...
    const sms = africasTalking.SMS

    res.sendStatus(200)
})

module.exports = router