// search values
export const queryState = {
  orderNumber: "",
  purchasingNumber: "",
  orderStatus: ""
}

export const addLink = {
  title: '( + ) Add a New Order'
}

export const searchList = {
  orderNumber: {
    type: 'text-input',
    placeholder: 'Order Number'
  },
  purchasingNumber: {
    type: 'text-input',
    placeholder: 'Purchasing Number'
  },
  orderStatus: {
    type: 'select-input',
    placeholder: 'Status',
    items: [
      {
        text: 'created',
        value: 'created'
      },
      {
        text: 'ordered',
        value: 'ordered'
      },
      {
        text: 'received',
        value: 'received'
      },
      {
        text: 'shipped',
        value: 'shipped'
      },
      {
        text: 'delivered',
        value: 'delivered'
      },
      {
        text: 'returned',
        value: 'returned'
      },
      {
        text: 'cancelled',
        value: 'cancelled'
      }
    ]
  },
}

export const defaultFilter = 'orderNumber';

export const searchTitle = 'Search for Orders'