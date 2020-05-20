import React, { Component, useState, useEffect } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal' 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

  const BurgerBuilder = props => {
    const [purchasing,setPurchasing] = useState(false)
    
    useEffect(() => {
       props.onInitIngredients();
    } , [])

    const updatePurchaseable = (ingredients)  => {
        const sum = Object.keys(ingredients).map(e => { 
            return ingredients[e];
        }).reduce ((sum , arr) => {
            return sum+arr
        },0)
          return sum > 0
        
    }

    const purchaseHandler = () => {
       if(props.isAuthenticated)
        setPurchasing(true)
        else {
            props.onSetRedirectPath("/checkout")
            props.history.push("/auth")
        }
    }
                
                

    const CancelPurchaseHandler = () => {
    setPurchasing(false)
    }

    const ContinuePurchaseHandler = () => {
          props.onInitPurchase();
          props.history.push('/checkout')
    }

    
        let disabledInfo ={ ...props.ingredients };
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
          let orderSummary = null;
          let burger = props.error ? <p>Ingredients not found</p> : <Spinner/>
          
          if(props.ingredients){
           burger =   
          <Aux>
           <Burger ingredients= {props.ingredients}/>
          <BuildControls 
          ingredientAdded = {props.onIngredientAdded}
          ingredientRemoved = {props.onIngredientRemoved}
          disabled= {disabledInfo} 
          price = {props.totalPrice}
          ordered = {purchaseHandler}
          purchaseable = {updatePurchaseable(props.ingredients)}
          isAuth = {props.isAuthenticated}/>
          </Aux>
          orderSummary =  <OrderSummary ingredients= {props.ingredients}
          purchaseCancelled= {CancelPurchaseHandler}
            purchaseContinued = {ContinuePurchaseHandler}
            totalPrice= {props.totalPrice}></OrderSummary >
          }
        return (
            
            <Aux>
                <Modal show = {purchasing} cancel = {CancelPurchaseHandler} >
                   {orderSummary}
                </Modal>
                {burger}
             
            </Aux>
            
        );
    }


const mapStateToProps = state => {
    return {
      ingredients : state.burgerBuilder.ingredients,
      totalPrice : state.burgerBuilder.totalPrice,
      error : state.burgerBuilder.error,
      isAuthenticated  :state.auth.token !==null
    }
}


const mapDispatchToProps = dispatch => {
    return {
    onIngredientAdded : (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved : (igName) => dispatch(actions.removeIngredient(igName)),
    onInitIngredients : () => dispatch(actions.initIngredients()),
    onInitPurchase : () => dispatch(actions.purchaseInit()),
    onSetRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
 
export default  connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder ,axios));