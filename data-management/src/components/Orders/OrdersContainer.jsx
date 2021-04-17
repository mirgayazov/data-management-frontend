import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getOrders } from '../../redux/orders-reducer'
import { Preloader } from "../Common/preloader/Preloader";
import Orders from "./Orders";

class OrderContainer extends React.Component {
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader /> : <Orders orders={this.props.orders} />}
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
