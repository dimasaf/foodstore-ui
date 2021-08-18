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

import 'upkit/dist/style.min.css';


function App() {

  React.useEffect(()=>{
    listen();
    getCart();
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/register/berhasil" component={RegisterSuccess}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
