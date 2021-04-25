import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCustomers } from '../../redux/customers-reducer'
import { getOrders } from '../../redux/orders-reducer'
import { getDevelopers } from '../../redux/developers-reducer'
import { getTesters } from '../../redux/testers-reducer'
import Panel from '../Panel/Panel';
import Customers from './Customers';
const CUSTOMERS = 'CUSTOMERS'

class CustomersContainer extends React.Component {
    componentDidMount() {
        this.props.getCustomers();
        this.props.getOrders();
        this.props.getDevelopers();
        this.props.getTesters();
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

export default compose(connect(mapStateToProps, { getCustomers, getOrders, getDevelopers, getTesters }))(CustomersContainer);
