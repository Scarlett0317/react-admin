import React from 'react';
import './header.less';
import { withRouter ,} from 'react-router-dom'
import { Modal,Button } from 'antd';

import memoryList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";

import storageUtils from "../../utils/storageUtils";

class Header extends React.Component {
    state = {
        currentTime: new Date().toLocaleDateString() + new Date().toLocaleTimeString()
    }
    getDateTime() {
        this.timer = setInterval(() => {
            const currentTime = new Date().toLocaleDateString() + new Date().toLocaleTimeString()
            this.setState({ currentTime })
        }, 1000)
    }
    componentDidMount() {
        this.getDateTime()
    }
    getTitle() {
        let title = null;
        const path = this.props.location.pathname
        memoryList.forEach(item => {
            if (item.key === path) {
                title = item.title
            }else if(item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title;
    }
    //推出登录
    
    logout=()=>{
        //显示确认框
        const { confirm } = Modal;
        confirm({
            title: '确认想要退出吗?',
            onOk:()=> {
                //删除数据,并跳转到login页面
              memoryUtils.user = {}
              storageUtils.removeUser()
              this.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
        })
        
    }
    render() {
        clearInterval(this.timer)
        const { currentTime, } = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className="header_top">
                    <span>欢迎:{username}</span>
                    <Button type="link" block onClick={this.logout}>
                        退出
                    </Button>
                </div>
                <div className="header_bottom">
                    <div className="header_btm_left">
                        {title}
                    </div>
                    <div className="header_btm_right">
                        <span className='btm_left'>{currentTime}</span>
                        <img src="http://img95.699pic.com/photo/40144/7929.gif_wh300.gif" alt="" />
                        <span className='btm_right'>晴</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Header)