import ProductList from '../../components/product/product-list.comp'
import ProductAdd from '../../components/product/product-add.comp'

const routes = [
  { path: "/app/product", name: "Search for Product", Component: ProductList },
  { path: "/app/product/add", name: "Add Product", Component: ProductAdd }
]

export default routes