// search values
export const queryState = {
  tracking: "",
  status: "",
  recvDate: ""
}

export const addLink = {
  title: '( + ) Scan Tracking Numbers'
}

export const searchList = {
  tracking: {
    type: 'text-input',
    placeholder: 'Tracking Number'
  },
  status: {
    type: 'select-input',
    placeholder: 'Status',
    items: [
      {
        text: 'received',
        value: 'received'
      },
      {
        text: 'processed',
        value: 'processed'
      }
    ]
  },
  recvDate: {
    type: 'date-input',
    placeholder: 'Received Date'
  },
  procDate: {
    type: 'date-input',
    placeholder: 'Processed Date'
  }
}

export const defaultFilter = 'tracking';

export const searchTitle =  'Search for Tracking Numbers'