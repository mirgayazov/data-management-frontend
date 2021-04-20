import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getCustomers } from '../../redux/customers-reducer'
import Panel from "../Panel/Panel";
import Customers from "./Customers";
const CUSTOMERS = 'CUSTOMERS'

class CustomersContainer extends React.Component {
    componentDidMount() {
        this.props.getCustomers();
    }

    render() {
        return (
            <div>
                <Panel target={CUSTOMERS} />
                {this.props.customers.length === 0 ? <>null</> : <Customers customers={this.props.customers} />}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customersPage.customers,
    }
}

export default compose(connect(mapStateToProps, { getCustomers }))(CustomersContainer);
