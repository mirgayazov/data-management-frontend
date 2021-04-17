import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getCustomers } from '../../redux/customers-reducer'
import { Preloader } from "../Common/preloader/Preloader";
import Customers from "./Customers";

class CustomersContainer extends React.Component {
    componentDidMount() {
        this.props.getCustomers();
    }

    render() {
        debugger
        return (
            <>
                { this.props.isFetching ? <Preloader /> : <Customers customers={this.props.customers} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customersPage.customers,
        isFetching: state.customersPage.isFetching,
    }
}

export default compose(connect(mapStateToProps, { getCustomers }))(CustomersContainer);
