export function isNumber(input) {
  return input

  const regex = /\b([1-9]|[1-9][0-9]|100)\b/
  return regex.test(input)
}

//* CHECK: TRUE TEST
console.log(isNumber(1))
console.log(isNumber(23))
console.log(isNumber('23'))
console.log(isNumber('3'))
console.log(isNumber(50))
console.log(isNumber(15))
console.log(isNumber(100))

//! CHECK: FALSE TEST
console.log(isNumber(-13))
console.log(isNumber(1 - 0))
console.log(isNumber(1 + 1))
console.log(isNumber(1 * 5))
console.log(isNumber(1 / 5))

console.log(isNumber(0))
console.log(isNumber(101))
console.log(isNumber('foo'))
console.log(isNumber(10 / 0))
console.log(isNumber('t1est0'))
console.log(isNumber(-9999999999))
console.log(isNumber({ hola: 123 }))
console.log(isNumber(99999999999999999))
