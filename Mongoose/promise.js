new Promise((resolve, reject) => {
    console.log('Initial')

    resolve()
})
.then(() => {
    throw new Error('Something failed')

    console.log('Do this')
})
.then(() => {
    console.log('Do that')
})
.then(() => {
    console.log('Do this, no matter what happened before')
})


/**OUTPUT
 * Initial
 * Do that
 * Do this, no matter what happened before
 * 
 * NOTE: The text "Do this" is not displayed because the "SOmething failed" error
 * caused a rejection
 */

 //ERROR PROPAGATION
 doSomething()
 .then(result => doSomethingElse(result))
 .then(newResult => doThirdThing(newResult))
 .then(finalResult => console.log(`Got the final result: ${finalResult}`))
 .catch(failureCallback)