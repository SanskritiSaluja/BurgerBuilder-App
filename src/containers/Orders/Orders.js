import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount () {
       this.props.onInitOrders(this.props.token,this.props.userId)
    }

   
    render() {
      let orders =  <Spinner/>
      if(!this.props.loading && this.props.orders)
     orders =  this.props.orders.map((order) => (
        <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
      ))
		return (
			<div>
			   {orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
    
    return {
      loading : state.order.loading,
      orders : state.order.orders,
      token : state.auth.token,
      userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
  return {
    onInitOrders : (token,userId) => dispatch(actionTypes.fetchOrders(token,userId))
  }
} 

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));