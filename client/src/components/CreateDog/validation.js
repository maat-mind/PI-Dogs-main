// number between 1 and 99
export function isValidNum(input) {
  if (!input) return true

  const regex = /^([1-9][0-9]{0,1})$/
  return regex.test(input)
}

/* //* CHECK: TRUE TEST
console.log(isValidNum(1))
console.log(isValidNum('3'))
console.log(isValidNum(99))

//! CHECK: FALSE TEST
console.log(isValidNum(0))
console.log(isValidNum(-13))
console.log(isValidNum(100))
console.log(isValidNum('foo')) */

// text only between 2 and 30 characters
export function isValidStr(input) {
  if (!input) return true

  const regex = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{2,30}$/
  return regex.test(input)
}

/* //* CHECK: TRUE TEST
console.log(isValidStr('Al'))
console.log(isValidStr('Xoloitzcuintlíñ'))
console.log(isValidStr('Alabama Blue-Blood Bulldog'))

//! CHECK: FALSE TEST
console.log(isValidStr(0))
console.log(isValidStr('12345464'))
console.log(isValidStr('123Xoloitzcuintlíñ'))
console.log(isValidStr('123Xoloitzcuintlíñ123123'))
console.log(isValidStr('Alabama Blue-Blood Bulldogaaaaaa')) */

// url with links to images only
export function isValidUrl(input) {
  if (!input) return true

  const regex = /^https?:\/\/.*\/.*\.??.*$/gim

  return regex.test(input)
}

/* //* CHECK: TRUE TEST
console.log(isValidUrl('https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg'))
console.log(isValidUrl('https://cdn2.thedogapi.com/images/BFRYBufpm.jpg'))
console.log(
  isValidUrl(
    'https://yt3.ggpht.com/a/AATXAJwuzltoF6_Fjov-Hx7jaPiZgO2rrzA2Ksr-1A=s900-c-k-c0xffffffff-no-rj-mo'
  )
)

//! CHECK: FALSE TEST
console.log(isValidNum(-13))
console.log(isValidStr('123Xoloitzcuintlíñ123123'))
console.log(isValidStr('httpasdasddasdasd'))
console.log(isValidStr('wwwpasdasddasdasd')) */
