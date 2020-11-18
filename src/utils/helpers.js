export const currencyMask = (value, limit) => {
  let str = value;
  // remove (,) and (.) from the string
  str = str.split(',').join('');
  str = str.split('.').join('');

  if (str.length === 1) {
    if (str.match(/^[1-9]{1}$/)) {
      return `.0${str}`;
    } else if (str === '0') {
      return ''
    }
  }

  if (str.length === 2) {
    if (str.match(/^[0-9]{2}$/)) {
      return `.${str}`
    }
  }

  if (str.length > 2 && str.length < limit) {
    let length = str.length;

    if (str.match(/^[0-9]{3,}$/)) {
      if (str[0] === '0') {
        str = str.substring(1);
        length = str.length;
      }

      let integerStr = str.substring(0, length - 2);
      let decimalStr = str.substring(length - 2);
      
      if (integerStr.length > 3) {
        let arrStr = integerStr.split('');
        const remain = arrStr.length%3;
        let newStr = "";
        for (let i = 0; i < arrStr.length; i++) {
          newStr = newStr + arrStr[i];
          if ((((i+1)%3) === remain) && (i < arrStr.length - 1)) {
            newStr = newStr + ','
          }
        }

        integerStr = newStr;
      }

      return integerStr + '.' + decimalStr
    }
  }

  return undefined;
}

export const integerMask = (value, limit) => {
  let str = value;
  // remove (,) from the string
  str = str.split(',').join('');

  // prevent user type 0 first, only 1 to 9 allowed
  if (str.length === 1) {
    if (str.match(/^[1-9]{1}$/)) return str;
  }

  // string from 2 to set limited numbers
  if (str.length > 1 && str.length < limit) {
    let length = str.length;

    if (str.match(/^[0-9]{2,}$/)) {
      // add (,) at thounsands to the number
      if (length > 3) {
        // split the string to array of numbers ex: [3, 5, 4, 3]
        let arrStr = str.split('');
        // join the array back to string by adding (,)
        const remain = arrStr.length%3;
        let newStr = "";
        for (let i = 0; i < arrStr.length; i++) {
          newStr = newStr + arrStr[i];
          if ((((i+1)%3) === remain) && (i < arrStr.length - 1)) {
            newStr = newStr + ','
          }
        }
        return newStr;
      }
      // if the number less than thousands return the original string
      return str;
    }
  }
  // if all other conditions then return null to prevent any action events.
  return undefined;
}

