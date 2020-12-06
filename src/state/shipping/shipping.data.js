// search values
export const queryState = {
  shptNumber: "",
  status: "",
  shptDate: ""
}

export const addLink = {
  title: '( + ) Create a New Shipment'
}

export const searchList = {
  shptNumber: {
    type: 'text-input',
    placeholder: 'Shipment Number'
  },
  status: {
    type: 'select-input',
    placeholder: 'Status',
    items: [
      {
        text: 'shipped',
        value: 'shipped'
      },
      {
        text: 'delivered',
        value: 'delivered'
      }
    ]
  },
  shptDate: {
    type: 'date-input',
    placeholder: 'Shipped Date'
  }
}

export const defaultFilter = 'shptNumber';

export const searchTitle = 'Search for Shipments';