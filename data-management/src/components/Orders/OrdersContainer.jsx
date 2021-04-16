import React from "react";
import { connect } from "react-redux";
import { setOrders, toggleIsFetching } from '../../redux/orders-reducer'
import axios from 'axios'
import { Preloader } from "../common/preloader/Preloader";
import Orders from "./Orders";

class OrderContainer extends React.Component {
    componentDidMount() {
        if (this.props.orders.length === 0) {
            this.props.toggleIsFetching(true);
            axios.get('http://localhost:3003/orders')
                .then(response => {
                    debugger
                    this.props.toggleIsFetching(false);
                    this.props.setOrders(response.data.orders);
                })
        }
    }

    render() {
        debugger
        return (
            <>
                {this.props.isFetching ? <Preloader /> : <Orders orders={this.props.orders} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ordersPage.orders,
        isFetching: state.ordersPage.isFetching,
    }
}



export default connect(mapStateToProps, { setOrders, toggleIsFetching })(OrderContainer)