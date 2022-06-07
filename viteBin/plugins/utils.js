async function readBody(stream) {
    console.log('read')
    return new Promise((resolve, rejecy) => {
        let res = ''
        stream.on('data', data => {
            res += data
        })
        stream.on('end', () => {
            resolve(res)
        })
    })
}
exports.readBody = readBody