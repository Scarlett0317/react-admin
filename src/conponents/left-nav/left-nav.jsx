import React from 'react';
import './left-nav.less';
import { Menu, Icon } from 'antd';
import logo from '../../assets/img/logo.png';
import { Link , withRouter } from "react-router-dom";
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
class Nav extends React.Component {
    getMenuNodes_map(menuList){
        return menuList.map(item => {
            if(!item.children){
                return (
                <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                </Menu.Item>
                )    
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes_map(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    };
    getMenuNodes_reduce(menuList){
        const path = this.props.location.pathname
        return menuList.reduce((pre,item) => {
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                    </Menu.Item>
                ))
            }else{
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes_reduce(item.children)
                        }
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    componentWillMount(){
        this.menuNodes = this.getMenuNodes_reduce(menuList)
    }
    render() {
        const path = this.props.location.pathname
        const openKey = this.openKey;
        return (<div className='nav'>
            <Link to='/' className='nav_header'> 
                <img src={logo} alt="" />
                <h1>妙品商城</h1>
            </Link>
            <div>
                <Menu
                    defaultSelectedKeys={[path === "/"?"/home":path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    className='menu_container'
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        </div>)
    }
}
//withRouter高阶组件
//包装非路由组件,返回一个新的组件,新的组件向非路由组件传递三个属性:history/match/location
export default withRouter(Nav)