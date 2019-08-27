import React,{Component} from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import Login from './views/login/login'
import Admin from './views/admin/admin'
import './App.css';


export default class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
    
  }
  
  

};
