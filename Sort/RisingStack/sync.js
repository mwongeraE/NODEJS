 /*
functions that can make other functions as arguments are called higher-order functions
 */


 const numbers = [  2, 4, 1, 5, 6]

 function isBiggerThanTwo (num) {
     return num > 2
 }

 numbers.filter(isBiggerThanTwo)

 /*
This is how callbacks were born. If you pass a function to another  function as a 
parameter, You can call it within the function when you are finished. No need to return values,
Only calling another function with the values
 */

 const fs = require('fs')

 console.log(`start reading a file...`)

 fs.readFile('file.md', 'utf-8', function (err, content) {
     if(err) {
         console.log('error happened during reading the file')
         return console.log(err)
     }

     console.log(content)
 })

 console.log('end of the file')


 /*
 Event-driven programming is a programming paradigm in which the flow of the program is determined by events
such as user actions (mouse clicks, key presses), sensor outputs, or messages from other programs/threads
 */