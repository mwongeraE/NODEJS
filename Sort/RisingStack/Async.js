import { promises } from "fs";

//The following snippet maps through 3 files for stats on them
async.parallelLimit(['file1', 'file2', 'file3'], fs.stat,
function (err, results) {
    //results is now an array of stats for each file
})


//Promises
/*
The promise object is used for deferred and aynchronous computation.
A promise represents an operation that hasn't completed yet but its expected in future
*/

//previous example could be written as

function stats (file) {
    return new promises((resolve, reject) => {
        fs.stat(file, (err, data) => {
            if (err) {
                return reject (err)
            }
            resolve(data)
        })
    })
}

Promise.all([
    stats('file1'),
    stats('file2'),
    stats('file3')
])

.then((data) => console.log(data))
.catch((err) => console.log(err))
