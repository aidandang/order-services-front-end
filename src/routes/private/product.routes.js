import ProductList from '../../components/product/product-list.component';
import ProductAdd from '../../components/product/product-add.component';
import ProductEdit from '../../components/product/product-edit.component';
import ProductInfo from '../../components/product/product-info.component';

const routes = [
  { path: "/app/product", name: "Search for Product", Component: ProductList },
  { path: "/app/product/add", name: "Add Product", Component: ProductAdd },
  { path: "/app/product/:productId", name: "Product Details", Component: ProductInfo },
  { path: "/app/product/:productId/edit", name: "Edit Product", Component: ProductEdit }
];

export default routes;