import styles from "./CustomerInfo.module.css";
import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { deleteCustomer } from '../../../redux/customers-reducer'
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const deletecustomerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>❌</button>
        </form>
    )
}

const DeletecustomerFormRedux = reduxForm({
    form: "deletecustomerForm"
})(deletecustomerForm)

let customerInfo = (props) => {
    const onSubmit = (formData) => {
        props.deleteCustomer(props.customer.id)
    }

    return (
        <div className={styles.customer}>
            {props.customer ?
                <><NavLink key={'back'} className={styles.link} to={`/customers`} title="назад">⇦</NavLink>
                    <h1>{props.customer.full_name}</h1>
                    <table className={styles.customerInfo}>
                        <tr>
                            <td>Адрес</td><td>{props.customer.address}</td>
                        </tr>
                        <tr>
                            <td>Электронная почта</td><td>{props.customer.email}</td>
                        </tr>
                        <tr>
                            <td>Серия паспорта</td><td>{props.customer.passport_details.series}</td>
                        </tr>
                        <tr>
                            <td>Номер паспорта</td><td>{props.customer.passport_details.number}</td>
                        </tr>
                        <tr>
                            <td>Контакты</td><td>{props.customer.telephone_number}</td>
                        </tr>
                        <tr>
                            <td>Примечания</td><td>{props.customer.remarks_to_customer}</td>
                        </tr>
                    </table><table className={styles.customerInfo2}>
                        <tr>
                            <td><DeletecustomerFormRedux onSubmit={onSubmit} /></td>
                        </tr>
                    </table></> : <Redirect to="/customers" />}
        </div>
    )
}

export default connect(null, { deleteCustomer })(customerInfo);