import React from 'react';
import { Switch,Route,Redirect } from "react-router-dom";
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

class Product extends React.Component {
    
    render() {
        return <div className='' style={{backgroundColor:'white',height:'100%'}}>
            <Switch>
                <Route path="/product" component={ProductHome} exact={true}></Route>
                <Route path="/product/addUpdate" component={ProductAddUpdate} ></Route>
                <Route path="/product/detail" component={ProductDetail} ></Route>
                <Redirect to='/product'></Redirect>
            </Switch>
        </div>;
    }
}

export default Product