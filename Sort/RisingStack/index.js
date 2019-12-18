const calc = require('./add')

const numbersToAdd = [
    3,
    5,
    10,
    2
]

const result = calc.sum(numbersToAdd)
console.log(`The result is: ${result}`)