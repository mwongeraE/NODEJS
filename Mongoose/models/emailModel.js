let emailModel = require('./email')

let msg = new emailModel({
    email: 'foreverEvans@gmail.com'
})

msg.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })
