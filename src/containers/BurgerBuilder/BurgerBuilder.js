import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal' 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad : 0.5 ,
    cheese : 0.4,
    meat : 1.3 ,
    bacon :0.7
};

class BurgerBuilder extends Component {
    state = { 
        ingredients : null,
        totalPrice : 4,
        purchaseable : false,
        purchasing: false,
        loading :false,
        error : false
    
    }
    
    componentDidMount () {
        console.log(this.props)
        axios.get("https://my-app-c4914.firebaseio.com/ingredients.json").then(
            response =>  {
                this.setState ({
                    ingredients : response.data
                })
            }
        ).catch(this.setState({
            error : true
        }))
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
        // this.setState({
        //     loading : true
        // })
        // const order = {
        //     ingredients  : this.state.ingredients,
        //     totalPrice : this.state.totalPrice,
        //     customer : {
        //         name : 'Sanskriti Saluja',
        //         address : {
        //             street : 'Test',
        //             zipCode : '123',
        //             country : 'India'
        //         },
        //         email : 'test@test.com'
        //     },
        //     deliveryMethod : 'fastest'
        // }
        // axios.post("/orders.json",order).then(response => {
        //     this.setState({
        //         loading :false ,
        //         purchasing : false

        //     })
        // }).catch(error => {
        //     this.setState({
        //         loading :false ,
        //         purchasing : false
        //      })
        // })

        const queryParams = [];
        for(let i in this.state.ingredients) {
           queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));

        } 
        const queryString =queryParams.join('&');
        this.props.history.push( {
           pathname :  '/checkout' ,
           search :  '?'+queryString });
    }

    
    render() { 
        let disabledInfo ={ ... this.state.ingredients };
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
          let orderSummary = null;
          let burger = this.state.error ? <p>Ingredients not found</p> : <Spinner/>
          
          if(this.state.ingredients){
           burger =   
          <Aux>
           <Burger ingredients= {this.state.ingredients}/>
          <BuildControls 
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled= {disabledInfo} 
          price = {this.state.totalPrice}
          ordered = {this.purchaseHandler}
          purchaseable = {this.state.purchaseable}/>
          </Aux>
          orderSummary =  <OrderSummary ingredients= {this.state.ingredients}
          purchaseCancelled= {this.CancelPurchaseHandler}
            purchaseContinued = {this.ContinuePurchaseHandler}
            totalPrice= {this.state.totalPrice}></OrderSummary >
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
 
export default withErrorHandler(BurgerBuilder ,axios);