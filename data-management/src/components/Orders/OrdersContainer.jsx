import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getOrders } from '../../redux/orders-reducer'
import Panel from '../Panel/Panel';
import Orders from './Orders';
const ORDERS = 'ORDERS'

class OrderContainer extends React.Component {
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        return (
            <div>
                <Panel target={ORDERS} />
                {this.props.orders.length === 0 ? null : <Orders orders={this.props.orders} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ordersPage.orders,
        isFetching: state.ordersPage.isFetching,
    }
}

export default compose(connect(mapStateToProps, { getOrders }))(OrderContainer);
