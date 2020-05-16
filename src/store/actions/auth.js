import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
} 

export const authSuccess = (authData) => {
    console.log(authData);
    
    return {
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
    }
}

export const authFail = (error) => {
    return {
        type :actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authLogout = () => {
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
                  dispatch(authLogout())
        },expirationTime*1000)
    }
}

export const auth = (email, password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password  :password ,
            returnSecureToken :true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkxIcmb1BMgJp-6inHu2frukZFEMK_XDg"
        if(!isSignup)
        url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkxIcmb1BMgJp-6inHu2frukZFEMK_XDg"
        axios.post(url,authData)
        .then(response=> {
            console.log(response);
            dispatch(authSuccess(response.data))
            dispatch(checkAuthTimeout(response.data.expiresIn))
            
        } )
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
    }
}