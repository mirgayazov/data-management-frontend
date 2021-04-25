import styles from './OrderInfo.module.css';
import modal from './Modal.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteOrder, updateOrder, appointDeveloper, removeDeveloperFromOrder, appointTester, removeTesterFromOrder } from '../../../redux/orders-reducer'
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { UpdateOrderForm } from '../../Forms/Orders/Orders';

const OrderInfo = (props) => {
    const array = []
    for (let i = 0; i < props.developers.length; i++) {
        let color = {
            id: props.developers[i].personnel_number,
            value: ''
        }
        array.push(color)
    }

    const arrayTesters = []
    for (let i = 0; i < props.testers.length; i++) {
        let color = {
            id: props.testers[i].personnel_number,
            value: ''
        }
        arrayTesters.push(color)
    }

    const [editMode, setEditMode] = useState(false);

    const [isModal, setModal] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(array);
    const [selectedDevs, setSelectedDevs] = React.useState([]);

    const [isModalTesters, setModalTesters] = React.useState(false);
    const [selectedColorTesters, setSelectedColorTesters] = React.useState(arrayTesters);
    const [selectedTesters, setSelectedTesters] = React.useState([]);


    const updateOrder = (order) => {
        props.updateOrder(order)
    }

    const onClose = () => {
        setModal(false)
        setSelectedDevs([])
        setSelectedColor(array)
    }

    const onCloseTesters = () => {
        setModalTesters(false)
        setSelectedTesters([])
        setSelectedColorTesters(arrayTesters)
    }

    const deleteOrder = () => {
        props.deleteOrder(props.order.id)
    }

    const appointDeveloper = () => {
        let schema = {
            orderId: props.order.id,
            designatedDevelopers: selectedDevs
        }
        props.appointDeveloper(schema)
        onClose()
    }

    const removeDeveloperFromOrder = (developerId) => {
        let schema = {
            orderId: props.order.id,
            developerId
        }
        props.removeDeveloperFromOrder(schema)
        setModal(false)
    }

    const appointTester = () => {
        let schema = {
            orderId: props.order.id,
            designatedTesters: selectedTesters
        }
        props.appointTester(schema)
        onCloseTesters()
    }

    const removeTesterFromOrder = (testerId) => {
        let schema = {
            orderId: props.order.id,
            testerId
        }
        props.removeTesterFromOrder(schema)
        setModalTesters(false)
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
                                    <td>Техническое задание</td><td><textarea readOnly value={props.order.technical_task} /></td>
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
            <table className={styles.componentInfo} style={{ width: "300px" }}>
                <tbody>
                    <tr>
                        <td colSpan='2'>Программисты<button onClick={() => setModal(!isModal)}>➕</button></td>
                    </tr>
                    {props.order.developers.map((d, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <NavLink key={d.id} className={styles.link} to={`/developers/${d.id}`}>
                                        <div className={styles.item} >
                                            {d.name}
                                        </div>
                                    </NavLink>
                                    <button onClick={() => removeDeveloperFromOrder(d.id)}>❌</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table className={styles.componentInfo} style={{ width: "300px" }}>
                <tbody>
                    <tr>
                        <td colSpan='2'>Тестировщики<button onClick={() => setModalTesters(!isModalTesters)}>➕</button></td>
                    </tr>
                    {props.order.testers.map((t, index) => {
                        return (
                            <tr key={t.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <NavLink key={t.id} className={styles.link} to={`/testers/${t.id}`}>
                                        <div className={styles.item} >
                                            {t.name}
                                        </div>
                                    </NavLink>
                                    <button onClick={() => removeTesterFromOrder(t.id)}>❌</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={() => alert(selectedDevs)}>check</button>
            <Modal
                visible={isModal}
                title="Выберите разработчиков, назначаемых на заказ"
                content={
                    <table>
                        <tbody>
                            {props.developers.map((d, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1})</td>
                                        <td>
                                            <p style={{ backgroundColor: selectedColor[index].value, cursor: "cell" }} key={'d' + d.personnel_number} onClick={() => { let c = selectedColor.findIndex(sc => sc.id === d.personnel_number); selectedColor[c].value = 'green'; setSelectedColor([...selectedColor]); setSelectedDevs([...selectedDevs, d.personnel_number]) }} onDoubleClick={() => { let c = selectedColor.findIndex(sc => sc.id === d.personnel_number); selectedColor[c].value = ''; setSelectedColor([...selectedColor]); setSelectedDevs(selectedDevs.filter(seld => seld !== d.personnel_number)) }} >{d.full_name}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
                footer={<div><button onClick={appointDeveloper}>Назначить</button><button onClick={onClose}>Закрыть</button></div>}
                onClose={onClose}
            />
            <Modal
                visible={isModalTesters}
                title="Выберите тестировщиков, назначаемых на заказ"
                content={
                    <table>
                        <tbody>
                            {props.testers.map((t, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1})</td>
                                        <td><p style={{ backgroundColor: selectedColorTesters[index].value, cursor: "cell" }} key={'d' + t.personnel_number} onClick={() => { let c = selectedColorTesters.findIndex(sc => sc.id === t.personnel_number); selectedColorTesters[c].value = 'green'; setSelectedColorTesters([...selectedColorTesters]); setSelectedTesters([...selectedTesters, t.personnel_number]) }} onDoubleClick={() => { let c = selectedColorTesters.findIndex(sc => sc.id === t.personnel_number); selectedColorTesters[c].value = ''; setSelectedColorTesters([...selectedColorTesters]); setSelectedTesters(selectedTesters.filter(seld => seld !== t.personnel_number)) }} >{t.full_name}</p></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
                footer={<div><button onClick={appointTester}>Назначить</button><button onClick={onCloseTesters}>Закрыть</button></div>}
                onClose={onCloseTesters}
            />
        </div>
    )
}

const Modal = ({
    visible = false,
    title = '',
    content = '',
    footer = '',
    onClose, }) => {

    // если компонент невидим, то не отображаем его
    if (!visible) return null;

    // или возвращаем верстку модального окна
    return <div className={modal.modal} onClick={onClose}>
        <div className={modal.modalDialog} onClick={e => e.stopPropagation()}>
            <div className={modal.modalHeader}>
                <h3 className={modal.modalTitle}>{title}</h3>
                <span className={modal.modalClose} onClick={onClose}>
                    &times;
            </span>
            </div>
            <div className={modal.modalBody}>
                <div className={modal.modalContent}>{content}</div>
            </div>
            {footer && <div className={modal.modalFooter}>{footer}</div>}
        </div>
    </div>
}

export default connect(null, { deleteOrder, updateOrder, appointDeveloper, removeDeveloperFromOrder, appointTester, removeTesterFromOrder })(OrderInfo);