var expect = require('chai').expect;
var addTwoNumbers = require('../app')

describe('addTwoNumbers()', function () {
    it('should add two numbers', function () {
        //Arrange 
        var x = 5;
        var y = 1;
        var sum1 = x + y 

        //Act
        var sum2 = addTwoNumbers(x, y);

        //assert
        expect(sum2).to.be.equal(sum1)
    })
})