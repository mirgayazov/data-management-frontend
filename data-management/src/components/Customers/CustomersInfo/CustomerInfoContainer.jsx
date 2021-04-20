import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import CustomerInfo from "./CustomerInfo";


class CustomerInfoContainer extends React.Component {
    render() {
        return (
            <CustomerInfo customer={this.props.customers.filter(customer => customer.id === this.props.match.params.id)[0]} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customersPage.customers,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(CustomerInfoContainer);