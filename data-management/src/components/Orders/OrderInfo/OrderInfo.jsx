import styles from './OrderInfo.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteOrder, updateOrder } from '../../../redux/orders-reducer'
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { UpdateOrderForm } from '../../Forms/Orders/Orders';

const OrderInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    const updateOrder = (order) => {
        props.updateOrder(order)
    }

    const deleteOrder = () => {
        props.deleteOrder(props.order.id)
    }

    return (
        <div className={styles.component}>
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td> <NavLink key={'back'} className={styles.link} to={`/orders`} title='назад'>⇦</NavLink></td>
                    </tr>
                </tbody>
            </table>
            {editMode ? <UpdateOrderForm onSubmit={updateOrder} order={props.order} setEditMode={setEditMode} /> :
                props.order ?
                    <div>
                        <table className={styles.componentInfo}>
                            <tbody>
                                <tr>
                                    <td>Название</td><td>{props.order.name}</td>
                                </tr>
                                <tr>
                                    <td>Номер заказчика</td><td>{props.order.customer_id}</td>
                                </tr>
                                <tr>
                                    <td>Цена</td><td>{props.order.cost}₽</td>
                                </tr>
                                <tr>
                                    <td>Техническое задание</td><td><textarea value={props.order.technical_task} /></td>
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
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td><button onClick={() => deleteOrder()}>Удалить</button></td>
                        <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default connect(null, { deleteOrder, updateOrder })(OrderInfo);