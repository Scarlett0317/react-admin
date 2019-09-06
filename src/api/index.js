//包含应用中所有接口请求函数的模块
//优化:1.统一处理请求异常
import ajax from './ajax.js'
//登陆


//const BASE = ' http://localhost:27017'

export const reqLogin = (username,password) => ajax( '/login',{username,password},'POST')

//添加用户
export const reqAdduser = (username,password) => ajax('/mange/user/add',{username,password},'POST')


//获取一级分类/二级分类
export const reqCategorys = (parentId) => ajax('/category/list',{parentId},'GET')

//增加一级分类
export const reqAddCate = ({cateName,parentId}) => ajax('/categoryName/add',{cateName,parentId},'POST')

//更新分类
export const reqUpdataCategory = ({categoryId,categoryName}) => ajax('/categoryName/add',{categoryId,categoryName},'POST')

//获取二级分类
export const reqSubCategorys = (parentId) => ajax('/category/sublist',{parentId},'GET')