//包含应用中所有接口请求函数的模块
//优化:1.统一处理请求异常
import ajax from './ajax.js'
//登陆


//const BASE = ' http://localhost:27017'

export const reqLogin = (username,password) => ajax( '/login',{username,password},'POST')

//添加用户
export const reqAdduser = (username,password) => ajax('/mange/user/add',{username,password},'POST')