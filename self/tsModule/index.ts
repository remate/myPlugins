interface Person{
    readonly x:string
    readonly y:string
}
let a:Person = {
  x:'1',
  y:'2'
}
a.x='33'
console.log(a)