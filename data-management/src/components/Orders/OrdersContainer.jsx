import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getOrders } from '../../redux/orders-reducer'
import Orders from './Orders';

class OrderContainer extends React.Component {
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        return (
            <div>
                {this.props.orders.length === 0 ? null : <Orders orders={this.props.orders} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ordersPage.orders,
        isFetching: state.ordersPage.isFetching,
        developers: state.developersPage.developers,
    }
}

export default compose(connect(mapStateToProps, { getOrders }))(OrderContainer);
