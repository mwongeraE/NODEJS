//Initialize express router
let router = require('express').Router()

//Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API its Working',
        message: 'Welcome to FastNode crafted with love!',
        by: 'Mwongera The Great'
    })
})

//Import controller
var controller = require('./controller')

//Contact routes
router.route('/contacts')
    .get(controller.index)
    .post(controller.new)

router.route('/contacts/:contact_id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete)

//Export API routes
module.exports = router