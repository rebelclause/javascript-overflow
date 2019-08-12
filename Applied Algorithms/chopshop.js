let cutList = [
    { qty: 36, feet: 28, inch: 3 },
    { qty: 6, feet: 27, inch: 8 },
    { qty: 12, feet: 27, inch: 3 },
    { qty: 6, feet: 25, inch: 8 },
    { qty: 16, feet: 25, inch: 3 },
    { qty: 22, feet: 22, inch: 8 },
    { qty: 12, feet: 12, inch: 3 },
]
// add id field to cutlist retaining this in the array for check against final manifest entries
cutList.filter((item) => item.qty !== 0).forEach((item, idx) => {item.id = idx + 1})

// could expand objects in number of qty to this or new array, keeping original array entries
// Or, decrement the item.qty as each new replica is made with item.subId as an identifier

let qtyTotal = 0
let pooled = []
// console.log(cutList)
// expand cutlist entries by qty to new array, pooled, adding subId to each entry
let arrays = cutList.map((item, idx) => {
    // forEach works here
    // aggregate entry qty for a total as each entry(item) is parsed
    qtyTotal += item.qty
    for (let i = 0; i < item.qty; i++) {
        let o = {}
        o = Object.assign(o, item)
        o.subId = i
        o.id - i
        // console.log(o) // console.dir(o) would be better
        pooled.push(o)
    }
    return pooled
})

// the list manifest will be chunked from
console.dir(pooled)
console.log('arrays.length: ', arrays.length)

// make sure the sum of qty matches the number
let valid
if (qtyTotal === pooled.length) {
    valid = true
} else {
    valid = false
}
console.log(`qty total: ${qtyTotal} pooled total: ${pooled.length}
The manifest data is ${valid ? 'ready.' : 'not ready for use.' }`)

// no exit, program continues
console.log("Producing manifest...")

// chunk pool by batchsize
let chunkedList = []
function produceManifest(start, batchsize) {
    let i = start
    let k = 0
   do {
        let qty, feet, inch, id, subId
        let x = []
        let j = 0
        do { 
            // assign objects from the pool into batchsized arrays
            // console.dir(pooled[i]);
            // if (typeof pooled[i] === undefined) break;
            try {
                ({qty, feet, inch, id, subId} = pooled[i])
                i ++
            } catch(e) {
                // console.error(e)
                // break
            }
            x[j] = {qty, feet, inch, id, subId}
            // console.log(x[j])
            j ++
            if (i >= pooled.length) break;
            // console.log("getting j: " + j)
        } while (j <= batchsize - 1) // index in reference array starts at 0
        chunkedList[k] = [...x]
        // chunkedList.push[x]
        // console.dir(chunkedList)
        k ++
    } while (i <= pooled.length - 1)
    // console.dir(chunkedList)
    return chunkedList
}

// manifest is an array containing batches of the number requested
// do the job
let start = 0
let batchsize = 40
let printable = produceManifest(start, batchsize)

console.dir(printable)

console.log('debug')
