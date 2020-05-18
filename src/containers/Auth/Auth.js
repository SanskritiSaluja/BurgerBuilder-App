import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import * as action from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'


class Auth extends Component {
    state = { 
        controls : {
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
           
        },
        isSignup:true

     }
    
     checkValidity(value,rules) {
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
       
    inputChangedHandler = (event,controlName) => {
       
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched : true
            }
        };
        this.setState({
            controls :updatedControls
        })

    }

     
    submitHandler =(event) => {
        event.preventDefault();
        this.props.OnAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }
 
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignup : !prevState.isSignup}
        })
    }

    componentDidMount () {
        if(!this.props.burgerBuilding && this.props.authRedirectPath !=="/")
             this.props.onSetRedirectPath()
        
    }

           
    render() { 
        let formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				key: key,
				config: this.state.controls[key],
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
                        changed={(event) => this.inputChangedHandler(event,formElement.key)}/>
        ))
         if(this.props.loading)
          form = <Spinner/>

          let errorMessage = null ;
          if(this.props.error)
          {
          errorMessage = <p>{this.props.error.message}</p>
          }
         
          let authRedirect = null
          if(this.props.isAuthenticated) 
            authRedirect = <Redirect to = {this.props.authRedirectPath} />

        return (
            <div className = "Auth">
                {errorMessage}
                {authRedirect}
                <form onSubmit= {this.submitHandler}>
                  {form}
                  <Button btnType = "Success">SUBMIT</Button>
                </form>
               < Button btnType="Danger" clicked={this.switchAuthModeHandler}> Switch To {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
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