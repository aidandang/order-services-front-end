export const strToAcct = (...items) => {
  let sum = 0;
  
  for (let i = 0; i < items.length; i++) {
    sum = sum + convertStrToNum(items[i]);
  }

  return sum
}

const convertStrToNum = str => {  

  let number = 0;
  
  if (str === undefined || !typeof stringValue || str === '') return number;

  str = String(str);

  if (str.length < 3) return number;
  if (str.length === 3) {
    if (!str.match(/^[.]{1}[0-9]{2}$/)) return number
  }    
  if (str.length === 4) {
    if (!str.match(/^[0-9]{1}[.]{1}[0-9]{2}$/)) return number
  }
  if (str.length > 4) {
    if (!str.match(/^[1-9]{1}[0-9,]+[.]{1}[0-9]{2}$/)) return number
  }

  str = str.split(',').join('');
  str = str.split('.').join('');

  number = Number(str);

  return number
}