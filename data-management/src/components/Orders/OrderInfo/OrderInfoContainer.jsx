import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import OrderInfo from './OrderInfo';
import { withRouter } from 'react-router';


class OrderInfoContainer extends React.Component {
    render() {
        return (
            <OrderInfo testers={this.props.testers} developers={this.props.developers} order={this.props.orders.filter(order => order.id === this.props.match.params.id)[0]} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ordersPage.orders,
        developers: state.developersPage.developers,
        testers: state.testersPage.testers,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(OrderInfoContainer);