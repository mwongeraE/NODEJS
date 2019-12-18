var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function() {
    var id
    it ('post object', function (done) {
        superagent.post('http://localhost:3000/collections/test')
            .send({name: 'John',
            email: 'john@rpjs.co'
        })
        .end(function(e, res) {
            expect(e).to.eql(null) //error object should be null
            expect(res.body.length).to.eql(1) //the response body array should have one item
            expect(res.body[0]._id.length).to.eql(24) //the first response body item should have the _id property, which is 24 characters long
            id = res.body[0]._id
            done()
        })
    })

    it('retrieves an object', function (done) {
        superagent.get('http://localhost:3000/collections/test/'+id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                done() //allows you to test async code. Without it, mocha test case ends abrubtly, long before the slow server has time to respond
            })
    })

    it('retrieves a collection', function(done) {
        superagent.get('http://localhost:3000/collections/test')
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body.length).to.be.above(0)
                expect(res.body.map(function (item) { //use the map function to return an array of IDs
                    return item._id
                })).to.contain(id)
                done()
            })
    })

    it ('updates an object', function(done) {
        superagent.put('http://localhost:3000/collections/test/'+id)
            .send({name: 'Peter',
            email: 'peter@yahoo.com'})
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })

    it ('checks an updated object', function(done) {
        superagent.get('http://localhost:3000/collections/test/'+id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                expect(res.body.name).to.eql('Peter')
                done()
            })
    })

    it('removes an object', function(done) {
        superagent.del('http://localhost:3000/collections/test/'+id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })
})

