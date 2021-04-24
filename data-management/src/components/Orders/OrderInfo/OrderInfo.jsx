import styles from './OrderInfo.module.css';
import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { deleteOrder } from '../../../redux/orders-reducer'
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Input, Textarea } from '../../Common/FormControls/FormControls';
import { required } from '../../../utils/validators/validators';
import { UpdateOrderForm } from '../../Forms/Orders/Orders';

const deleteOrderForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>❌</button>
        </form>
    )
}

const DeleteOrderFormRedux = reduxForm({
    form: 'deleteOrderForm'
})(deleteOrderForm)

const AddNewOrderForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <table className={styles.orderInfo}>
                <tr>
                    <td>Номер заказчика</td><td><Field className={styles.item} component={Input} validate={[required]} placeholder='Номер заказчика' name={'customerId'} myValue={props.order.customer_id} /></td>
                </tr>
                <tr>
                    <td>Цена</td><td>  <Field className={styles.item} component={Input} validate={[required]} placeholder='Цена в рублях' name={'cost'} myValue={props.order.cost} /></td>
                </tr>
                <tr>
                    <td>Техническое задание</td><td> <Field className={styles.item} component={Textarea} validate={[required]} placeholder='Техническое задание' name={'technicalTask'} myValue={props.order.technical_task} /></td>
                </tr>
                <tr>
                    <td>Отзыв клиента</td><td><Field className={styles.item} component={Input} validate={[required]} placeholder='Отзыв клиента о продукте' name={'customerFeedback'} myValue={props.order.customer_feedback} /></td>
                </tr>
                <tr>
                    <td>Тип заказа</td><td>   <Field className={styles.item} component={Input} validate={[required,]} placeholder='Тип заказа' name={'orderType'} myValue={props.order.order_type} /></td>
                </tr>
            </table>
            {/* <Field className={styles.item} component={Input} validate={[required]} placeholder={props.order.name} name={'name'} myValue={props.order.name}/> */}
            <hr />
            <button className={styles.sbmt}>Сохранить изменения</button>
        </form>
    );
};

export const AddNewOrderFormRedux = reduxForm({ form: 'AddNewOrderForm' })(AddNewOrderForm);

const OrderInfo = (props) => {
    const onSubmit = (formData) => {
        props.deleteOrder(props.order.id)
    }

    const [editMode, setEditMode] = useState(false);

    const updateOrder = (tester) => {
        props.updateTester(tester)
    }

    return (
        <div className={styles.order}>
            <NavLink key={'back'} className={styles.link} to={`/orders`} title='назад'>⇦</NavLink>
            {editMode ? <UpdateOrderForm onSubmit={updateOrder} order={props.order} /> :
                props.order ?
                    <div>
                        <h1>{props.order.name}</h1>
                        <table className={styles.orderInfo}>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div> : <Redirect to='/orders' />
            }
            <table className={styles.orderInfo2}>
                <tbody>
                    <tr>
                        <td><DeleteOrderFormRedux onSubmit={() => onSubmit()} /></td>
                        <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default connect(null, { deleteOrder })(OrderInfo);