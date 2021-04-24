import styles from './CustomerInfo.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteCustomer, updateСustomer } from '../../../redux/customers-reducer'
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { UpdateCustomerForm } from '../../Forms/Customers/Customers';

let CustomerInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    const deleteCustomer = () => {
        props.deleteCustomer(props.customer.id)
    }

    const updateСustomer = (customer) => {
        debugger
        props.updateСustomer(customer)
    }

    return (
        <div className={styles.component}>
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td> <NavLink key={'back'} className={styles.link} to={`/customers`} title='назад'>⇦</NavLink></td>
                    </tr>
                </tbody>
            </table>
            {editMode ? <UpdateCustomerForm onSubmit={updateСustomer} customer={props.customer} setEditMode={setEditMode} /> : props.customer ?
                <div>
                    <table className={styles.componentInfo}>
                        <tbody>
                            <tr>
                                <td>ФИО</td><td>{props.customer.full_name}</td>
                            </tr>
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
                        </tbody>
                    </table>
                </div> : <Redirect to='/customers' />}
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td><button onClick={deleteCustomer}>Удалить</button></td>
                        <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default connect(null, { deleteCustomer, updateСustomer })(CustomerInfo);