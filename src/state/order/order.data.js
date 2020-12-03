// search values
export const queryState = {
  orderRef: "",
  orderNumber: "",
  status: ""
}

export const addLink = {
  title: '( + ) Add a New Order'
}

export const searchList = {
  orderRef: {
    type: 'text-input',
    placeholder: 'Order Reference'
  },
  orderNumber: {
    type: 'text-input',
    placeholder: 'Order Number'
  },
  status: {
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
        text: 'partially-received',
        value: 'partially-received'
      },
      {
        text: 'received',
        value: 'received'
      },
      {
        text: 'partially-shipped',
        value: 'partially-shipped'
      },
      {
        text: 'shipped',
        value: 'shipped'
      },
      {
        text: 'partially-delivered',
        value: 'partially-delivered'
      },
      {
        text: 'delivered',
        value: 'delivered'
      },
      {
        text: 'cancelled',
        value: 'cancelled'
      }
    ]
  },
}

export const defaultFilter = 'orderRef'