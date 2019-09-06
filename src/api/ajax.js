//发送异步ajax请求函数模块,封装ajax,
//函数返回值是promise对象
//优化1.统一处理异常
//2.异步得到不是response,而是response.data
import axios from 'axios'
import { message } from "antd";
export default function ajax(url,data={},methods='GET'){
     return new Promise((resolve,reject) => {
          let promise
          //1.执行异步ajax请求
          if(methods === "GET"){
               promise = axios.get(url,{
                    params:data
               })
          }else{
               promise = axios.post(url,data)
          }
          //2.成功调用resolve
          promise.then(response => {
               resolve(response.data)
          //3.失败,不调用reject,提示异常信息
          }).catch(error => {
               message.error("出错了" + error)
          })
          
     })
}
