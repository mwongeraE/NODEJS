const assert = require('assert')

var calculateSavings = (income, expenditure) => {
    return income - expenditure
}

describe('Savings suite', () => {
    var income, expenditure, monthlySaving, totalSaving

    before(() => {
        //set all values to 0 and set Income to 1000
        income = 1000
        expenditure = 0
        monthlySaving = 0
        totalSaving = 0 
    
    })

    beforeEach(() => {
        //Randomly generate an expenditure before each test
        expenditure = Math.floor((Math.random() * 500) + 1)
    })

    after(() => {
        //Reset all values to O after all tests are run
        income = 0
        expenditure = 0
        monthlySaving = 0
        totalSaving = 0
    })

    afterEach(() => {
        //Add monthlySaving to totalSaving after each test
        totalSaving = totalSaving + monthlySaving
    })

    it ('should test saving of Month 1', () => {
        monthlySaving = calculateSavings(income, expenditure)
        assert.equal(monthlySaving, income - expenditure)
    })
    it('should compare savings of Month 2 to totalSavings', () => {
        monthlySaving = calculateSavings(income, expenditure);
        assert.notEqual(monthlySaving, totalSaving);
});
})