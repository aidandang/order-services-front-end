// search values
export const queryState = {
  tracking: "",
  status: "",
  receivedDate: "",
  processedDate: "",
  returnedDate: ""
}

export const addLink = {
  title: '( + ) Scan New Trackings'
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
  receivedDate: {
    type: 'date-input',
    placeholder: 'Received Date'
  },
  processedDate: {
    type: 'date-input',
    placeholder: 'Processed Date'
  },
  returnedDate: {
    type: 'date-input',
    placeholder: 'Returned Date'
  }
}

export const defaultFilter = 'tracking';

export const searchTitle =  'Search for Tracking Numbers'