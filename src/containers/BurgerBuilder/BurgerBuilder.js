import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal' 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad : 0.5 ,
    cheese : 0.4,
    meat : 1.3 ,
    bacon :0.7
};

class BurgerBuilder extends Component {
    state = { 
        ingredients : {
        salad :0,
        cheese :0,
        meat : 0,
        bacon:0 
        } ,
        totalPrice : 4,
        purchaseable : false,
        purchasing: false
    
    }
    
    updatePurchaseable (ingredients) {
        const sum = Object.keys(ingredients).map(e => { 
            return ingredients[e];
        }).reduce ((sum , arr) => {
            return sum+arr
        },0)
        this.setState( { purchaseable : sum > 0})
        
    }
    
    addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount =oldCount+1;
       const updatedIngredients = { ...this.state.ingredients };
       updatedIngredients[type] = updatedCount;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const updatedPrice = oldPrice + priceAddition;
       this.setState ({
           ingredients : updatedIngredients,
           totalPrice : updatedPrice
            
       })
       this.updatePurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       if(oldCount<=0) {
           return;
       }
       const updatedCount= oldCount-1;
       const updatedIngredients = {...this.state.ingredients}
       updatedIngredients[type] = updatedCount;
       const priceDeduction = INGREDIENT_PRICES[type];
       const oldPrice =this.state.totalPrice;
       const updatedPrice = oldPrice -priceDeduction;
       this.setState({
           ingredients  : updatedIngredients,
           totalPrice : updatedPrice
       })
         this.updatePurchaseable(updatedIngredients);
    }

    purchaseHandler = ()=>{
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
        alert("You Continue");
    }

    
    render() { 
        let disabledInfo ={ ... this.state.ingredients };
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} cancel = {this.CancelPurchaseHandler} >
                    <OrderSummary ingredients= {this.state.ingredients}
                                  purchaseCancelled= {this.CancelPurchaseHandler}
                                    purchaseContinued = {this.ContinuePurchaseHandler}
                                    totalPrice= {this.state.totalPrice}></OrderSummary>
                </Modal>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled= {disabledInfo} 
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}
                purchaseable = {this.state.purchaseable}/>
            </Aux>
            
        );
    }
}
 
export default BurgerBuilder;