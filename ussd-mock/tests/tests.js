var assert = require('assert')
describe('String#split', function() {
    it ('should return an array', function() {
        assert(Array.isArray('abc'.split(',')))
    })

    it ('should return the same array', function() {
        assert.equal(['a','b', 'c'].length, 'a,b,c'.split(',').length, 'arrays have equal length')
        for (var i=0; i<['a', 'b', 'c'].length; i++) {
            assert.equal(['a', 'b', 'c'][i], 'a,b,c'.split(',')[i], i + 'element is equal')
        }
    })
})

//some code is repeated, so we can abstract it into beforeEach and before constructions

var assert = require('assert')
var expected, current
before(function(){
    expected = ['a', 'b', 'c']
})
describe('String#split', function() {
    beforeEach(function() {
        current = 'a,b,c'.split(',')
    })
    it('should return an array', function() {
        assert(Array.isArray(current))
    })
    it('should return the same array', function() {
        assert.equal(expected.length, current.length, 'arrays have equal length')
        for (var i=0; i<expected.length; i++) {
            assert.equal(expected[i], current[i], i + 'element is equal')
        }
    })
})

var expect = require('expect.js')
var expected, current
before(function() {
    expected = ['a', 'b', 'c']
})

describe('String#split', function() {
    beforeEach(function(){
        current = 'a,b,c'.split(',')
    })
    it ('should return an array', function() {
        expect(Array.isArray(current)).to.be.true
    })
    it('should return the same array', function() {
        expect(expected.length).to.equal(current.length)
        for (var i=0; i<expected.length; i++) {
            expect(expected[i]).equal(current[i])
        }
    })
})