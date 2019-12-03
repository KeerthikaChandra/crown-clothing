import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import HomePage from './page/homepage/homepage.component';

const HatPage = (props) => {
  console.log(props)
 return (<div>
    <button onClick={() => props.history.push('/')}>Home Page</button>
    <h1>Hat Page</h1> 
  </div>)
}
 
  


function App() {
  return (
    <div>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop/hats' component={HatPage} />
      </Switch> 
    </div>
  );
}

export default App;
