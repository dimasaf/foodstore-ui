import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import store from './app/store';

import { listen } from './app/listener';

import Home from './pages/Home';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';


import 'upkit/dist/style.min.css';

function App() {

  React.useEffect(()=>{
    listen();
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/register/berhasil" component={RegisterSuccess}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
