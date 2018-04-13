import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import Admin from './Pages/Admin/Admin';

class App extends Component {


  render() {
    return (
      
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/products' component={Products} />
          <Route path='/supersecretadmin' component={Admin} />
        </Switch>
      </div>

    );
  }
}

export default App;


