import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import store from './app/store';
import { listen } from './app/listener';
import { getCart } from './api/cart';

import Home from './pages/Home';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import UserAddressAdd from './pages/UserAddressAdd';
import UserAddress from './pages/UserAddress';
import Checkout from './pages/Checkout';
import Invoice from './pages/Invoice';
import UserAccount from './pages/UserAccount'
import UserOrders from './pages/UserOrders'
import Logout from './pages/Logout';

import 'upkit/dist/style.min.css';

import {GuardRoute} from './component/GuardRoute';
import GuestOnlyRoute from './component/GuestOnlyRoute';

function App() {
  React.useEffect(()=>{
    listen();
    getCart();
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <GuestOnlyRoute path="/register/berhasil">
            <RegisterSuccess/>
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/register" >
            <Register/>
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/login">
            <Login/>
          </GuestOnlyRoute>
          <GuardRoute path="/logout">
            <Logout/>
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman/tambah" >
            <UserAddressAdd/>
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman">
            <UserAddress/>
          </GuardRoute>
          <GuardRoute path="/pesanan">
              <UserOrders/>
          </GuardRoute>
          <GuardRoute path="/account" >
              <UserAccount/>
          </GuardRoute>
          <GuardRoute path="/checkout">
              <Checkout/>
          </GuardRoute>
          <GuardRoute path="/invoice/:order_id">
              <Invoice/>
          </GuardRoute>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
