console.log(22)
let crop = {}
crop.list = []
crop.on = function (fn) {
  this.list.push(fn)
}
crop.emit = function () {
  this.list.forEach(cb => {
    cb.apply(this, arguments)
  })
}


