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
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
    state = { 
        purchasing: false
    }
    componentDidMount() {
       this.props.onInitIngredients();
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
       if(this.props.isAuthenticated)
        this.setState( {purchasing: true})
        else {
            this.props.onSetRedirectPath("/checkout")
            this.props.history.push("/auth")
        }
    }
                
                

    CancelPurchaseHandler = () => {
        this.setState({
            purchasing:false
        })
    }

    ContinuePurchaseHandler = () => {
          this.props.onInitPurchase();
          this.props.history.push('/checkout')
    }

    
    render() { 
        let disabledInfo ={ ...this.props.ingredients };
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
          let orderSummary = null;
          let burger = this.props.error ? <p>Ingredients not found</p> : <Spinner/>
          
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
          purchaseable = {this.updatePurchaseable(this.props.ingredients)}
          isAuth = {this.props.isAuthenticated}/>
          </Aux>
          orderSummary =  <OrderSummary ingredients= {this.props.ingredients}
          purchaseCancelled= {this.CancelPurchaseHandler}
            purchaseContinued = {this.ContinuePurchaseHandler}
            totalPrice= {this.props.totalPrice}></OrderSummary >
          }
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