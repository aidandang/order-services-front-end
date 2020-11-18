export const acctToString = (number) => {
  let str = '';
  
  if (!Number.isInteger(number)) return '-';

  str = number.toString()

  let length = str.length;
  let integerStr = '';
  let decimalStr = '';

  if (length < 2) {
    integerStr = '';
    decimalStr = '0' + str;
  } else {
    integerStr = str.substring(0, length - 2);
    decimalStr = str.substring(length - 2);
  }

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

  str = integerStr + '.' + decimalStr
  return str
}