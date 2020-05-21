import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import * as  actionTypes from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'

const Logout = props => {
    const {onLogout} =props

    useEffect(() => {
        onLogout();
    },[onLogout])
    
        return ( <Redirect to="/"/> );
    }

const mapDispatchtoProps = dispatch => {
    return {
        onLogout : () => dispatch(actionTypes.authLogout())
    }
}
 
export default connect (null,mapDispatchtoProps)(Logout);