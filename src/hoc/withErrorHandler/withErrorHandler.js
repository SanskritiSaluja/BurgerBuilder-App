import React, { useState,useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent,axios) => {

    return props => {
		const [error, setError] = useState(null);

		const requestInterceptors = axios.interceptors.request.use((request) => {
			setError(null);
			return request;
		});

		const responseInterceptors = axios.interceptors.response.use(
			(response) =>  response,
			(err) => {				
				setError(err);
			}
		);
		
			
		useEffect(() => {
			axios.interceptors.request.eject(requestInterceptors);
			axios.interceptors.response.eject(responseInterceptors);
		}, [requestInterceptors,responseInterceptors]);
		
		
		const errorConfirmedHandler = () => {
			setError(null);
		};

		
		return (
			
			<Aux>
				<Modal
					show={error}
					modalClosed={errorConfirmedHandler}
				>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
        );
 }
}

export default withErrorHandler;