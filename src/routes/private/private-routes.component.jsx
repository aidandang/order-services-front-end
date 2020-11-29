import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Navbar from '../../components/navbar/navbar.component';
import Footer from '../../components/footer/footer.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import DashboardPage from '../../pages/dashboard-page/dashboard-page.component';
import ProductPage from '../../pages/product-page/product-page.component';
import OrderPage from '../../pages/order-page/order-page.component';
import CustomerPage from '../../pages/customer-page/customer-page.component';
import ReceivingPage from '../../pages/receiving-page/receiving-page.component';
import InventoryPage from '../../pages/inventory-page/inventory-page.component';

// ui settings
import './private-routes.styles.css';

const PrivateRoutes = () => {
  const currentRoute = 'private';

  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 justify-content-end">
        <Sidebar />
        <div className="col-md-9 col-xl-10 p-0 m-0">
          <div className="private-main-wrapper">
            <header>
              <Navbar currentRoute={currentRoute} />
            </header>
            <main>
              <div className="row p-0 m-0 px-2 py-4">
                <div className="col">
                  <Switch>
                    <Route path="/app/product" render={() => <ProductPage />} />
                    <Route path="/app/order" render={() => <OrderPage />} />
                    <Route path="/app/customer" render={() => <CustomerPage />} />
                    <Route exact path="/app" render={() => <DashboardPage />} />
                    <Route path="/app/receiving" render={() => <ReceivingPage />} />
                    <Route path="/app/inventory" render={() => <InventoryPage />} />
                  </Switch>
                </div>
              </div>
            </main>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default PrivateRoutes;