module.exports = function (source) {
    // console.log('query', this.query)
    // let after = source.replace(/今天/g, '明天')
    let after = source.replace(/今天/g, this.query.name)
    return after
}