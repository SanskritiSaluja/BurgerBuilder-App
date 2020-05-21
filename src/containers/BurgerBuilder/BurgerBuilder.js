import React, { useState, useEffect ,useCallback} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal' 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {useDispatch,useSelector} from 'react-redux';
import * as actions from '../../store/actions/index'

const BurgerBuilder = props => {
   const [purchasing,setPurchasing] = useState(false)

   const ingredients = useSelector(state => state.burgerBuilder.ingredients)
   const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
   const  error  = useSelector(state => state.burgerBuilder.error)
   const isAuthenticated  = useSelector(state => state.auth.token !==null)
   const dispatch = useDispatch();

   const onIngredientAdded  = (igName) => dispatch(actions.addIngredient(igName))
   const onIngredientRemoved = (igName) => dispatch(actions.removeIngredient(igName))
   const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])
   const onInitPurchase = () => dispatch(actions.purchaseInit())
   const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    
    useEffect(() => {
       onInitIngredients();
    } , [onInitIngredients])

    const updatePurchaseable = (ingredients)  => {
        const sum = Object.keys(ingredients).map(e => { 
            return ingredients[e];
        }).reduceprototype ((sum , arr) => {
            return sum+arr
        },0)
          return sum > 0
        
    }

    const purchaseHandler = () => {
       if(isAuthenticated)
        setPurchasing(true)
        else {
            onSetRedirectPath("/checkout")
            props.history.push("/auth")
        }
    }
                
                

    const CancelPurchaseHandler = () => {
    setPurchasing(false)
    }

    const ContinuePurchaseHandler = () => {
          onInitPurchase();
          props.history.push('/checkout')
    }

    
        let disabledInfo ={ ...ingredients };
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
          let orderSummary = null;
          let burger = error ? <p>Ingredients not found</p> : <Spinner/>
          
          if(ingredients){
           burger =   
          <Aux>
           <Burger ingredients= {ingredients}/>
          <BuildControls 
          ingredientAdded = {onIngredientAdded}
          ingredientRemoved = {onIngredientRemoved}
          disabled= {disabledInfo} 
          price = {totalPrice}
          ordered = {purchaseHandler}
          purchaseable = {updatePurchaseable(ingredients)}
          isAuth = {isAuthenticated}/>
          </Aux>
          orderSummary =  <OrderSummary ingredients= {ingredients}
          purchaseCancelled= {CancelPurchaseHandler}
            purchaseContinued = {ContinuePurchaseHandler}
            totalPrice= {totalPrice}></OrderSummary >
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

 
export default withErrorHandler(BurgerBuilder ,axios);