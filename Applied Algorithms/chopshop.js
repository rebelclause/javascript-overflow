let cutList = [
    { qty: 36, feet: 28, inch: 3 },
    { qty: 6, feet: 27, inch: 8 },
    { qty: 12, feet: 27, inch: 3 },
    { qty: 6, feet: 25, inch: 8 },
    { qty: 16, feet: 25, inch: 3 },
    { qty: 22, feet: 22, inch: 8 },
    { qty: 12, feet: 12, inch: 3 },
]
// add id field to cutlist retaining this in the array for check against final manifest entries, if necessary
// forEach doesn't return an array, you know...
cutList.filter((item) => item.qty !== 0).forEach((item, idx) => {item.id = idx + 1})

// could expand objects in number of qty to this or new array, keeping original array entries
// Or, decrement the item.qty as each new replica is made with item.subId as an identifier
let pooledCutList = []
let qtyTotal = 0

// console.log(cutList)
// expand cutlist entries by qty to new array, adding subId to each entry
let cutArray = cutList.map((item, idx) => {
    qtyTotal += item.qty
  for (let i = 0; i < item.qty; i++) {
    let o = Object.create(null)
    o = Object.assign(o, item)
    o.subId = i
    o.id - i
    // console.log(o)
    pooledCutList.push(o)
}})

let valid
if (qtyTotal === pooledCutList.length) {
    valid = true
} else {
    valid = false
}
    
// console.log(cutArray)
// console.log(pooledCutList)
console.log(`qty total: ${qtyTotal}. The manifest data is ${valid ? 'ready.' : 'not ready for use.' }`)

try {
    let batchsize = input('Enter a batch size: ')
    if (batchsize === "" || batchsize >= 100 || batchsize <= 0 || (!isInteger(batchsize))){
        throw new Error('A number between 1 and 100...')
    } 
} catch(e) {

}
console.log(`Producing manifest...`)

// slice the array 
function produceManifest(start, end, batchsize) {
    for (i = 0; i <= pooledCutList.length -1; i++ ) {
        let x = []
        mod %= batchsize
        console.log(batchsize, ': ', i)
        if (mod === 0) {
            x.push(pooledCutList[i])
            arrayedCutList.push(x)
            end = (batchsize) + i
            produceManifest(i, end)
        }
        x.push(pooledCutList[i])
        arrayedCutList = pooledCutList.slice(start, end)
    }
}

// the list manifest will be chunked from
console.log(pooledCutList)
// manifest is an array containing batches of the number requested
let arrayedCutList = []
let batchsize = 10
let start = 0
let end = batchsize
let mod = 0
produceManifest(start, end, batchsize)

console.log(arrayedCutList);
console.log('debug')
