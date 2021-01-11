import React, { useState } from 'react'

// components
import withProductData from './withProductData'
import { Card, Ul, Li, CloseTask } from '../tag/tag.comp'
import ProductColor from './product-color.comp'
import ProductForm from './product-form.comp'
import Brand from '../brand/brand.comp'

const ProductInfo = ({ 
  data
}) => {

  const { byId } = data

  const [isProductForm, setIsProductForm] = useState(false)

  const setCloseTask = () => {
    setIsProductForm(false)
  }

  return <> 
    <div className="row">
      <div className="col-xl-8">
        <Card width="col" title="Product Style">
          {
            isProductForm
            ? 
            <div className="row mt-2 mx-1">
              <div className="col">
                <CloseTask setCloseTask={setCloseTask} />
                <ProductForm 
                  productTemp={{ ...byId,
                    brand: byId.brand._id
                  }} 
                  setIsProductForm={setIsProductForm}
                />
              </div>
            </div>
            :
            <Ul>
              <Li>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Product Name:</span></div>
                  <div className="col-8">{byId.name}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Brand:</span></div>
                  <div className="col-8">{byId.brand.preferredName}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Style Code:</span></div>
                  <div className="col-8">{byId.styleCode}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Website:</span></div>
                  <div className="col-8"><a href={byId.url} className="a-link-cs">{byId.url}</a></div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Description:</span></div>
                  <div className="col-8">{byId.desc}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 mt-1">
                    <span className="font-weight-bold">Sample Image:</span>
                  </div>
                  <div className="col-8">
                    <img 
                      className="product-img my-2" 
                      src={byId.styleImage} alt={byId.name} 
                    />
                  </div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col">
                    <a
                      href={'/'}
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault()
                        setIsProductForm(true)
                      }}
                    >
                      Edit Product Style
                    </a>
                  </div>
                </div>
              </Li>
            </Ul>
          }
        </Card>
      </div>
      <div className="col-xl-4">
        <ProductColor />
        <Brand />
      </div>
    </div>
  </>
}

export default withProductData(ProductInfo)