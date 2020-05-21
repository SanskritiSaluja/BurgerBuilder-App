import React, { useState } from 'react';
import Button from "../../../components/UI/Button/Button"
import './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner' 
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../../store/actions/index'

const ContactData = props =>  {
	const [orderForm ,setOrderForm] = useState({
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code",
				},
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
                value: "",
                validation: {
                    required: true
                ,
                valid: false,
                touched: false
            }
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail",
				},
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
                value: "fastest",
                validation: {},
                valid: true
			},
        })
    const [formIsValid,setformIsValid]= useState(false)
    
    const checkValidity = (value,rules) =>  {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    const inputChangedHandler = (event,inputId) => {
        const updatedOrderForm = {...orderForm};
        const updatedOrderFormElement = {...updatedOrderForm[inputId]}; // deep copying
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputId] = updatedOrderFormElement;   
        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }     
		setOrderForm( updatedOrderForm)
		setformIsValid (formIsValid);
    }

	const orderHandler = (event) => {
		event.preventDefault();
        const formData = {};
        for (let key in orderForm) {
            formData[key] = orderForm[key].value; 
        }
		const order = {
			ingredients: props.ingredients,
			price: props.totalPrice,
			orderData: formData,
			userId  :props.userId
		};
		props.onOrderBurger(order,props.token)
	
    };
		let formElementsArray = [];
		for (let key in orderForm) {
			formElementsArray.push({
				key: key,
				config: orderForm[key],
			});
		}
		let form = (
			<form onSubmit={orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.key}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementConfig.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event,formElement.key)}
					/>
				))}
				<Button btnType="Success" disabled={!formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (props.loading) {
			form = <Spinner />;
		}
		return (
			<div className="ContactData">
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}

const mapStatetoProps = state => {
    return {
        ingredients :state.burgerBuilder.ingredients,
		totalPrice : state.burgerBuilder.totalPrice,
		loading : state.order.loading,
		token :state.auth.token,
		userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger :  (orderData,token) => dispatch(burgerBuilderActions.purchaseBurger(orderData,token))
	}
}

export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));