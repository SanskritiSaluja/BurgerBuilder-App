import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route, Switch } from 'react-router-dom'
import './App.css';
import Checkout from '../../my-app/src/containers/Checkout/Checkout'

function App() {
  return (
     <div> 
      <Layout>
        <Switch>
        <Route path = '/checkout' component = {Checkout}/>
        <Route path = '/' component= {BurgerBuilder} />
        
        </Switch>
        </Layout>
    </div>
  );
}

export default App;
