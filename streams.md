const fs = require('fs')
```js
// reads file
const readStream = fs.createReadStream('./docs/blog.txt', { encoding: 'utf-8' })

// makes file
const writeStream = fs.createWriteStream('./docs/blog4.txt')
```
```js
readStream.on('data', (chunk) => {
    console.log('-----------------------')
    console.log(chunk)
    writeStream.write('\nNew Chunk\n')
    writeStream.write(chunk)
})
```
- a concise alternitive to ^ but must be from a readable stream to a writeable
```js
// piping 
readStream.pipe(writeStream)
```