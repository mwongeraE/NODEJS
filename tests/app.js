//assert method
//A new object called assert
/*var assert = {
    //method called equal
    equal: function(firstValue, secondValue) {
        if (firstValue != secondValue) {
            throw new Error('Assert failed, ' + firstValue + ' is not equal to ' + secondValue )
        }
    }
}
*/

var assert = require('assert')

function addTwoNumbers(x, y) {
    return x + y
}

function testAddTwoNumbers() {

    //1. Arrange
    var x = 4
    var y = 2
    var sum1 = x + y;

    //2. Act
    var sum2 = addTwoNumbers(x, y)

    console.log('addTwoNumbers() should return the sum of its 2 parameters')
    console.log('Expect ' + sum1 + ' to  equal ' + sum2 + '.')

    //3.Assert
    /*
    if ( sum1 === sum2 )

        return console.log('Passed.');
    
    console.log('Failed')*/
    try {
        assert.equal(sum1, sum2);
        
        console.log('Passed.')
    } catch (error) {
        console.log(error.message)
    }
}

testAddTwoNumbers();

module.exports = addTwoNumbers;
