import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'antd/dist/antd.min.css'
import * as serviceWorker from './serviceWorker';


//读取local中保存user,保存到内存中
import memoryUtils from "./utils/memoryUtils.js";
import storageUtils from "./utils/storageUtils";
const user = storageUtils.getUser()
memoryUtils.user = user;



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, yo u can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
