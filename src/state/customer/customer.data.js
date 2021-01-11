// search values
export const queryState = {
  customerNumber: "",
  phone: "",
  nickname: "",
  fullname: "",
  streetAddress1: ""
}

export const addLink = {
  title: '( + ) Add a New Customer'
}

export const searchList = {
  customerNumber: {
    type: 'text-input',
    placeholder: 'Account'
  },
  phone: {
    type: 'text-input',
    placeholder: 'Phone'
  },
  nickname: {
    type: 'text-input',
    placeholder: 'Nickname'
  },
  fullname: {
    type: 'text-input',
    placeholder: 'Fullname'
  },
  streetAddress1: {
    type: 'text-input',
    placeholder: 'Address'
  }
}

export const defaultFilter = 'customerNumber';

export const searchTitle = 'Search for Customers'