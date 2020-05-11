import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'


class Checkout extends Component {
    state = { 
        ingredients : {
            salad :1,
            meat : 1,
            cheese :2,
            bacon:1
        }
     }

     componentDidMount () {
         const query = new URLSearchParams(this.props.location.search)
         console.log(this.props.location.search)
         console.log(query.get("salad"));
         console.log(query);
         const ingredients = {
             bacon : Number(query.get("bacon")),
             cheese : Number(query.get("cheese")),
             meat :   Number(query.get("meat")),
             salad : Number(query.get("salad"))  
         }
         console.log(ingredients)
        //  for(let param in query
        //  {
        //      ingredients[param[0]] = +param[1];     
        //  }
        //  console.log(ingredients);
         this.setState({
             ingredients : ingredients
         })
        
     }
     
     checkoutCancelledHandler = () => {
         this.props.history.goBack();

     }

     checkoutContinuedHandler = () => {
          this.props.history.replace('/')
     }

    render() { 
        return ( 
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                    checkoutCancelled = { this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler} />

                    <Route 
                    path ={this.props.match.path + '/contact-data'}
                    component = {ContactData}></Route>
            </div>
         );
    }
}
 
export default Checkout;