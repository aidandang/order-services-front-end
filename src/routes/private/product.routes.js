import ProductList from '../../components/product/product-list.component'
import ProductAdd from '../../components/product/product-add.component'

const routes = [
  { path: "/app/product", name: "Search for Product", Component: ProductList },
  { path: "/app/product/add", name: "Add Product", Component: ProductAdd }
]

export default routes