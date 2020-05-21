import React, { useState } from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import  './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    
    const [showSideDrawer,setShowSideDrawer] = useState (false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

        return (
            <Aux>
                <Toolbar 
                isAuth = {props.isAuthenticated}
                drawerToggleClicked = {sideDrawerToggleHandler} />
                 <SideDrawer 
                isAuth = {props.isAuthenticated}
                open = {showSideDrawer}
                closed = {sideDrawerClosedHandler}/>
                <main className="Content">
                    {props.children}
                </main>
            </Aux>
        )
    }


const mapStatetoProps = (state) => {
    return {
        isAuthenticated : state.auth.token!==null
    }
}

export default connect(mapStatetoProps)(Layout);