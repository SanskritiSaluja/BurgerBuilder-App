import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import {connect} from 'react-redux'



const Checkout = props =>  {
     
    const checkoutCancelledHandler = () => {
         props.history.goBack();

     }

    const checkoutContinuedHandler = () => {
          props.history.replace('/checkout/contact-data')
     }
    
  
    let summary = <Redirect to="/" />

    if(props.ingredients)
        {
            const purchasedRedirect = props.purchased ? <Redirect to= "/" /> : null
        summary = ( <div>
            {purchasedRedirect}
        <CheckoutSummary ingredients = {props.ingredients}
            checkoutCancelled = { checkoutCancelledHandler}
            checkoutContinued = {checkoutContinuedHandler} />

            <Route 
            path = {props.match.path + '/contact-data'}
            component = {ContactData}/>
        </div>)
        }
        

        return summary;
    }

const mapStatetoProps = state => {
    return {
        ingredients :state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}


 
export default connect(mapStatetoProps)(Checkout);
