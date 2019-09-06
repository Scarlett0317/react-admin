import React from 'react';
import memoryUtils from "../../utils/memoryUtils.js";
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../../conponents/header/header';
import Nav from "../../conponents/left-nav/left-nav";

import Home from '../home/home'
import Category from '../category/category';
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'

import './admin.less'
const { Footer, Sider, Content } = Layout;

class Admin extends React.Component {
    
    render() {
        const user = memoryUtils.user
        if (!user || !user.id) {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <Nav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content 
                        style={{backgroundColor:'gray',padding:'20px'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Redirect to='/home' ></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>杭州颐信电子商务有限公司</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin


