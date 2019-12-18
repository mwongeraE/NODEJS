var db = require ('../db.js')

//landlord property route
router.get('api.alfar.co/api/ussdlistproperties', (req, res) => {
    var phone = req.params.phoneNumber
    
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })

    res.send(phone)
})

//landlord current collection route
router.get('api.alfar.co/api/ussdcurrentcollection', (req, res) => {
    var phone = req.params.phoneNumber

    let sql ="SELECT * FROM currentcollection";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })

    res.send(phone)
})

//landlord access advance
router.get('api.alfar.co/api/ussdlqadvance', (req, res) => {
    var phone = req.params.phoneNumber

    res.send(phone)
})

//enter ussd pin
app.route('/ussdPin')
    .get((res,req) => {
        res.send('This should lead to ussd pin')
    })

    .post((res, req) => {
        res.send('This is used in processing the form')
    })

//update pin 
router.post('api.alfar.co/api/ussdupdatepin', (req,res) => {
    var phone = req.body.phoneNumber

    res.send(phone)
})

//change pin
router.post('api.alfar.co/api/ussdchangepin', (req, res) => {
    var phone = req.body.phoneNumber
    res.send(phone)
})

//landlord ministatement
router.get('api.alfar.co/api/ussdlstatement', (req, res) => {
    var phone = req.params.phoneNumber
    res.send(phone)
})

//landlord apply advance
router.post('api.alfar.co/api/ussdlqadvance', (req, res) => {
    var phone = req.body.phoneNumber

    res.send(phone)
})

//Landlord complete 
router.get('api.alfar.co/api/ussdladvance', (req, res) => {
    var phone = req.params.phoneNumber

    res.send(phone)
})
