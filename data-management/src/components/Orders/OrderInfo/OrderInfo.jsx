import styles from "./OrderInfo.module.css";
import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { deleteOrder } from '../../../redux/orders-reducer'
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const deleteOrderForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>❌</button>
        </form>
    )
}

const DeleteOrderFormRedux = reduxForm({
    form: "deleteOrderForm"
})(deleteOrderForm)

let OrderInfo = (props) => {
    const onSubmit = (formData) => {
        props.deleteOrder(props.order.id)
    }

    return (
        <div className={styles.order}>
            {props.order ?
                <> <NavLink key={'back'} className={styles.link} to={`/orders`} title="назад">⇦</NavLink>
                    <h1>{props.order.name}</h1>
                    <table className={styles.orderInfo}>
                        <tr>
                            <td>Номер заказчика</td><td>{props.order.customer_id}</td>
                        </tr>
                        <tr>
                            <td>Цена</td><td>{props.order.cost}₽</td>
                        </tr>
                        <tr>
                            <td>Техническое задание</td><td>{props.order.technical_task}</td>
                        </tr>
                        <tr>
                            <td>Отзыв клиента</td><td>{props.order.customer_feedback}</td>
                        </tr>
                        <tr>
                            <td>Тип заказа</td><td>{props.order.order_type}</td>
                        </tr>
                    </table><table className={styles.orderInfo2}>
                        <tr>
                            <td><DeleteOrderFormRedux onSubmit={onSubmit} /></td>
                        </tr>
                    </table></> : <Redirect to="/orders" />}
        </div>
    )
}

export default connect(null, { deleteOrder })(OrderInfo);