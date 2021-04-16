import React from "react";
import { connect } from "react-redux";
import { setCustomers, toggleIsFetching } from '../../redux/customers-reducer'
import axios from 'axios'
import { Preloader } from "../common/preloader/Preloader";
import Customers from "./Customers";

class CustomersContainer extends React.Component {
    componentDidMount() {
        debugger
        if (this.props.customers.length === 0) {
            this.props.toggleIsFetching(true);
            axios.get('http://localhost:3001/customers')
                .then(response => {
                    debugger
                    this.props.toggleIsFetching(false);
                    this.props.setCustomers(response.data.customers);
                })
        }
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



export default connect(mapStateToProps, { setCustomers, toggleIsFetching })(CustomersContainer)