import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        
        var token =localStorage.getItem('token');
        if(token){
            var isAuthenticated = true;
        }
        else{
             isAuthenticated = false;
        }
        
        return isAuthenticated ? (
            <Component {...this.props}/>
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;