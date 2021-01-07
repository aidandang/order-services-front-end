import React, { useState } from 'react'

// dependencies
import { useParams } from 'react-router-dom'
// components
import { Card, Ul, Li, SelectInput } from '../tag/tag.component'
import ProductColorAdd from './product-color-add.component'
import ProductColorEdit from './product-color-edit.component'
import ProductColorRemove from './product-color-remove.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectProductData } from '../../state/product/product.selectors'
import { selectOrderData } from '../../state/order/order.selectors'
import { selectProductToOrderItem } from '../../state/order/order.actions'

const ProductColor = ({
  data,
  orderData,
  selectProductToOrderItem
}) => {

  const params = useParams()

  const colors = data.byId.colors
  const { byId } = data
  const { orderId } = params

  const initialState = {
    _id: '',
    color: '',
    url: '',
    image: '',
    createdAt: ''
  }

  const [color, setColor] = useState(initialState)
  const [action, setAction] = useState('')

  const onInputChange = e => {
    e.preventDefault()

    const id = e.target.value

    const selectedColor = colors.find(item => item._id === id)

    if (selectedColor) {
      setColor(prevState => ({ ...prevState, ...selectedColor }))
    } else {
      setColor(prevState => ({ ...prevState, ...initialState }))
    }
  }

  const colorTemp = colors.find(item => item._id === color._id)

  const handleSelectProductToOrderItem = () => {
    if (orderId && orderData.byId && orderId === orderData.byId._id) {
      selectProductToOrderItem({ 
        product: byId,
        color: colorTemp
      })
    }
  }

  return <>
    <Card width="col" title="Product Colors">
      <Ul>
      {
        action === 'add'
        ?
        <ProductColorAdd data={data} setAction={setAction} />
        :
        <>
          <Li>
            <SelectInput
              label="Color List"
              name="color"
              size="col-12"
              smallText="Select a color to edit."
              defaultValue=""
              defaultText="..."
              value={color._id}
              onChange={onInputChange}
              data={colors ? colors : []}
              valueKey={'_id'}
              textKey={'color'}
            />
          </Li>
          {
            colorTemp &&  
              <Li>
                <div className="row">
                  <div className="col">
                    <img 
                      className={
                        `product-img my-2 ${orderId && orderData.byId && orderId === orderData.byId._id && 'span-link-cs'}`
                      } 
                      src={colorTemp.image} 
                      alt={colorTemp.name}
                      onClick={e => {
                        e.preventDefault()
                        handleSelectProductToOrderItem()
                      }} 
                    />
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col">
                    {colorTemp.color}
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col">
                    <a href="/" className="a-link-cs" onClick={e => {
                      e.preventDefault()
                      setAction('edit')
                    }}>Edit</a>
                    <span>{' | '}</span>
                    <a href="/" className="a-link-cs" onClick={e => {
                      e.preventDefault()
                      setAction('remove')
                    }}>Remove</a>
                  </div>
                </div>
              </Li>
            }
            {
              action === 'edit' &&
              <ProductColorEdit data={data} colorTemp={colorTemp} setAction={setAction} />
            }
            {
              action === 'remove' &&
              <ProductColorRemove data={data} colorTemp={colorTemp} setAction={setAction} />
            }
            <Li>
              <div className="row">
                <div className="col">
                  <a 
                    href="/"
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault()
                      setAction('add')
                    }}
                  >
                    ( + ) Add a New Color
                  </a>
                </div>  
              </div>
            </Li>  
        </>
      }
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData,
  orderData: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  selectProductToOrderItem: payload => dispatch(selectProductToOrderItem(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColor)