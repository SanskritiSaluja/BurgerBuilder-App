import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal' 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
    state = { 
    
        purchasing: false,
        loading :false,
        error : false
    
    }

    updatePurchaseable (ingredients) {
        const sum = Object.keys(ingredients).map(e => { 
            return ingredients[e];
        }).reduce ((sum , arr) => {
            return sum+arr
        },0)
          return sum > 0
        
    }

    purchaseHandler = () => {
        this.setState( {
            purchasing: true
        })

    }
                
                

    CancelPurchaseHandler = () => {
        this.setState({
            purchasing:false
        })
    }

    ContinuePurchaseHandler = () => {
          this.props.history.push('/checkout')
    }

    
    render() { 
        let disabledInfo ={ ...this.props.ingredients };
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
          let orderSummary = null;
          let burger = this.state.error ? <p>Ingredients not found</p> : <Spinner/>
          
          if(this.props.ingredients){
           burger =   
          <Aux>
           <Burger ingredients= {this.props.ingredients}/>
          <BuildControls 
          ingredientAdded = {this.props.onIngredientAdded}
          ingredientRemoved = {this.props.onIngredientRemoved}
          disabled= {disabledInfo} 
          price = {this.props.totalPrice}
          ordered = {this.purchaseHandler}
          purchaseable = {this.updatePurchaseable(this.props.ingredients)}/>
          </Aux>
          orderSummary =  <OrderSummary ingredients= {this.props.ingredients}
          purchaseCancelled= {this.CancelPurchaseHandler}
            purchaseContinued = {this.ContinuePurchaseHandler}
            totalPrice= {this.props.totalPrice}></OrderSummary >
          }
          if(this.state.loading)
          orderSummary = <Spinner/>
        return (
            
            <Aux>
                <Modal show = {this.state.purchasing} cancel = {this.CancelPurchaseHandler} >
                   {orderSummary}
                </Modal>
                {burger}
             
            </Aux>
            
        );
    }
}


const mapStateToProps = state => {
    return {
      ingredients : state.ingredients,
      totalPrice : state.totalPrice
    }
}


const mapDispatchToProps = dispatch => {
    return {
    onIngredientAdded : (igName) => dispatch({type: actionTypes.ADD_INGREDIENT , ingredientName : igName}),
    onIngredientRemoved : (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT ,ingredientName :igName})
    }
}
 
export default  connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder ,axios));