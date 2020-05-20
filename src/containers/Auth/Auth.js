import React, { Component, useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import * as action from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'


const Auth = props =>  {
  const [controls , setControls] =  useState({
            email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Mail Address",
				},
                value: "",
                validation: {
                    required: true,
                    isEmail : true
                },
                valid: false,
                touched: false
            },
            password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
                value: "",
                validation: {
                    required: true,
                    minLength : 6
                },
                valid: false,
                touched: false
            }
           
        })
       const [isSignup,setIsSignup] = useState(true)
    
     const checkValidity = (value,rules) => {
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
       
   const inputChangedHandler = (event,controlName) => {
       const updatedControls = {
            ...controls,
            [controlName] : {
                ...controls[controlName],
                value : event.target.value,
                valid : checkValidity(event.target.value,controls[controlName].validation),
                touched : true
            }
        };
        setControls(updatedControls)
      }

     
   const  submitHandler =(event) => {
        event.preventDefault();
        props.OnAuth(controls.email.value,controls.password.value,isSignup)
    }
 
    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    useEffect(() => {
        if(!props.burgerBuilding && props.authRedirectPath !=="/")
             props.onSetRedirectPath()
       } , [])

           
        let formElementsArray = [];
		for (let key in controls) {
			formElementsArray.push({
				key: key,
				config: controls[key],
			});
        }
        let form = formElementsArray.map(formElement => (
              <Input 
                   key = {formElement.key}  
                   elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementConfig.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event,formElement.key)}/>
        ))
         if(props.loading)
          form = <Spinner/>

          let errorMessage = null ;
          if(props.error)
          {
          errorMessage = <p>{props.error.message}</p>
          }
         
          let authRedirect = null
          if(props.isAuthenticated) 
            authRedirect = <Redirect to = {props.authRedirectPath} />

        return (
            <div className = "Auth">
                {errorMessage}
                {authRedirect}
                <form onSubmit= {submitHandler}>
                  {form}
                  <Button btnType = "Success">SUBMIT</Button>
                </form>
               < Button btnType="Danger" clicked={switchAuthModeHandler}> Switch To {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }


const mapStateToProps = state => {
    return {
        loading  : state.auth.loading,
        error  : state.auth.error,
        isAuthenticated : state.auth.token !==null,
        burgerBuilding : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnAuth : (email,password,isSignup) => (dispatch(action.auth(email,password,isSignup))),
        onSetRedirectPath : () => (dispatch(action.setAuthRedirectPath("/")))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Auth);