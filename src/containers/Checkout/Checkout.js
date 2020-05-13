import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'



class Checkout extends Component {
    state = { 
        ingredients : null,
        totalPrice : 0
     }

     componentWillMount () {
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
         const price= Number(query.get("price"))

         console.log(ingredients)
        //  for(let param in query
        //  {
        //      ingredients[param[0]] = +param[1];     
        //  }
        //  console.log(ingredients);
         this.setState({
             ingredients : ingredients,
             totalPrice : price
         })
        
     }
     
     checkoutCancelledHandler = () => {
         this.props.history.goBack();

     }

     checkoutContinuedHandler = () => {
          this.props.history.replace('/checkout/contact-data')
     }
    
  
    render() { 
        return ( 
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                    checkoutCancelled = { this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler} />

                    <Route 
                    path = {this.props.match.path + '/contact-data'}
                    render = {(props) => (<ContactData 
                    ingredients= {this.state.ingredients} 
                    totalPrice={this.state.totalPrice} 
                    {...props}/>)}></Route>
            </div>
         );
    }
}
 
export default Checkout;
