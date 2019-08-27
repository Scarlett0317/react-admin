import React from 'react';
import './login.less';
import logo from './img/logo.png';
import {reqLogin }from '../../api/index.js'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { message } from 'antd'
import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from 'react-router-dom'
//import Form from './form.js'
//登录路由组件
class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err,values)=>{
           if(!err){
               const {username,password} = values;
               const result = await reqLogin(username,password)
               if(result.status == 0){
                   message.success("登录成功")
                   //跳转到管理界面(不需要回退用replace,需要回退push)
                   const user = result.data;
                   memoryUtils.user = user;
                   storageUtils.saveUser(user)
                   this.props.history.replace('/')
                   console.log( user.username)
               }else(
                    message.error('登录失败')
               )
           }else {
               console.log('校验失败')
           }
       })
    }
    render() {
        //判断用户是否登录,
        const user = memoryUtils.user
        if( !user || !user.id){
            return <Redirect to='/' />
        }
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return <div className='login'>
            <header className='header'>
                <img src={logo} alt="" />
                <h1>妙品电商后台管理系统</h1>
            </header>
            <section>
                <h3>用户登录</h3>
                <div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ 
                                    required: true, 
                                    min:4,
                                    message: '名字最少输入四位' 
                                },{ 
                                    required: true, 
                                    max:20,
                                    message: '最多20位' 
                                },
                                { 
                                    required: true, 
                                    pattern:/^[a-zA-Z0-9_]+$/,
                                    whitespace:false,
                                    message: '用户名必须是英文数字下划线' 
                                }
                            ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ 
                                    required: true, 
                                    min:4,
                                    message: '密码最少输入四位' 
                                },{ 
                                    required: true, 
                                    max:20,
                                    message: '密码最多20位' 
                                },
                                { 
                                    required: true, 
                                    whitespace:false,
                                    message: '输入内容不能为空' 
                                },
                            ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
          </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </div>;
    }

}
const WrappedNormalLoginForm = Form.create({ name: 'Login' })(Login);
export default WrappedNormalLoginForm

// 1.写页面
// 2.前台表单验证(后台表单验证)  rules
// 3.收集数据  handleSubmit