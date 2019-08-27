import React from 'react';
import memoryUtils from "../../utils/memoryUtils.js";
import { Redirect } from 'react-router-dom'
class Admin extends React.Component {
    render() {
        const user = memoryUtils.user
        if(!user || !user.id){
            return <Redirect to="/login"></Redirect>
        }
        return <div className=''>
            hello  {user.username}
        </div>;
    }
}

export default Admin