import styles from './OrderInfo.module.css';
import modal from './Modal.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveStage } from '../../../redux/testers-reducer'
import { deleteOrder, updateOrder, appointDeveloper, removeDeveloperFromOrder, appointTester, removeTesterFromOrder } from '../../../redux/orders-reducer'
import { NavLink, useHistory } from 'react-router-dom';
import { UpdateOrderForm } from '../../Forms/Orders/Orders';
import { CreateStage } from '../../Forms/Testers/Testers';
import { ChangeCommentForm } from '../../Forms/Customers/Customers';
import { ordersAPI } from '../../../api/api';

const OrderInfo = (props) => {
    debugger
    const history = useHistory();

    let [sortedDevs, setSortedDevs] = useState(props.developers)
    let [sortedTesters, setSortedTesters] = useState(props.testers)

    const array = []
    for (let i = 0; i < sortedDevs.length; i++) {
        let color = {
            id: sortedDevs[i].personnel_number,
            value: ''
        }
        array.push(color)
    }

    const arrayTesters = []
    for (let i = 0; i < sortedTesters.length; i++) {
        let color = {
            id: sortedTesters[i].personnel_number,
            value: ''
        }
        arrayTesters.push(color)
    }

    const [stages, setStages] = useState(props.order.stages)
    const [editMode, setEditMode] = useState(false);
    const [stageMode, setStageMode] = useState(false);
    const [commentMode, setCommentMode] = useState(false);
    // const searchInput = React.createRef();

    const [isModal, setModal] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(array);
    const [selectedDevs, setSelectedDevs] = React.useState([]);

    const [isModalTesters, setModalTesters] = React.useState(false);
    const [selectedColorTesters, setSelectedColorTesters] = React.useState(arrayTesters);
    const [selectedTesters, setSelectedTesters] = React.useState([]);

    const resetStages = (id) => {
        ordersAPI.getStages(id).then(data => {
            debugger
            setStages(data.data.stages)
        })
    }

    const sendStage = (schema) => {
        props.saveStage(schema, resetStages)
    }

    const changeComment = (schema) => {
        props.updateOrder({ ...props.order, customerFeedback: schema.comment, customerId: props.order.customer_id, technicalTask: props.order.technical_task, orderType: props.order.order_type })
    }

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

    // const deleteOrder = () => {
    //     history.goBack()
    //     props.deleteOrder(props.order.id)
    // }

    const goBack = () => {
        history.goBack();
    }

    const appointDeveloper = () => {
        let schema = {
            orderId: props.order.id,
            designatedDevelopers: selectedDevs
        }

        if (props.order.developers.filter(d => d.position === 'cпециалист отдела разработки').length === 0) {
            let devsIds = sortedDevs.filter(d => d.position === 'cпециалист отдела разработки').map(d => d.personnel_number)
            let isTouched = false
            for (const selDev of selectedDevs) {
                if (devsIds.includes(selDev)) {
                    isTouched = true
                    props.appointDeveloper(schema, setSortedDevs)
                    onClose()
                    break
                }
            }
            if (isTouched === false) {
                alert('Выберите хотя бы одного cпециалиста отдела разработки')

            }
        } else {
            props.appointDeveloper(schema, setSortedDevs)
            onClose()
        }
    }

    const removeDeveloperFromOrder = (developerId) => {
        let schema = {
            orderId: props.order.id,
            developerId
        }
        props.removeDeveloperFromOrder(schema, setSortedDevs)
        setModal(false)
    }

    const appointTester = () => {
        let schema = {
            orderId: props.order.id,
            designatedTesters: selectedTesters
        }

        if (props.order.testers.filter(t => t.position === 'cпециалист отдела тестирования').length === 0) {
            let tesIds = sortedTesters.filter(t => t.position === 'cпециалист отдела тестирования').map(d => d.personnel_number)
            let isTouched = false
            for (const selTes of selectedTesters) {
                if (tesIds.includes(selTes)) {
                    isTouched = true
                    console.log('yes')
                    props.appointTester(schema, setSortedTesters)
                    onCloseTesters()
                    break
                }
            }
            if (isTouched === false) {
                alert('Выберите хотя бы одного cпециалиста отдела тестирования')
            }
        } else {
            props.appointTester(schema, setSortedTesters)
            onCloseTesters()
        }
    }

    const removeTesterFromOrder = (testerId) => {
        let schema = {
            orderId: props.order.id,
            testerId
        }
        props.removeTesterFromOrder(schema, setSortedDevs)
        setModalTesters(false)
    }
    return (
        <div className={styles.component}>
            {props.userPosition === 'developer' ?
                <div>
                    <table className={styles.componentInfo}>
                        <tbody>
                            <tr>
                                <td>Название</td><td>{props.order.name}</td>
                            </tr>
                            <tr>
                                <td>Номер заказчика</td><td>{props.order.customer_id}</td>
                            </tr>
                            {/* <tr>
                                    <td>Цена</td><td>{props.order.cost}₽</td>
                                </tr> */}
                            <tr>
                                <td>Техническое задание</td><td><textarea readOnly value={props.order.technical_task} /></td>
                            </tr>
                            {/* <tr>
                                    <td>Отзыв клиента</td><td>{props.order.customer_feedback}</td>
                                </tr> */}
                            <tr>
                                <td>Тип заказа</td><td>{props.order.order_type}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr className={styles.itemHr} />
                    <table className={styles.componentInfo} style={{ textAlign: 'center' }}>
                        <tbody>
                            <tr >
                                <td colSpan='5' >Журнал разработки</td>
                            </tr>
                            <tr >
                                <td rowSpan='2'>№</td>
                                <td rowSpan='2'>Ответсвенный за этап</td>
                                <td rowSpan='2'>Комментарий</td>
                                <td colSpan='2' >Этап</td>
                            </tr>
                            <tr>
                                <td>открыт</td>
                                <td>закрыт</td>
                            </tr>
                            {stages.map((stage, index) => <tr key={stage.adoption_date.time + stage.closing_date.time}>
                                <td>{index + 1}</td>
                                <td>{stage.curator}</td>
                                <td><textarea defaultValue={stage.report}></textarea></td>
                                <td>{stage.adoption_date.date} <br /> в {stage.adoption_date.time}</td>
                                <td>{stage.closing_date.date}  <br /> в {stage.closing_date.time}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div> : props.userPosition === 'customer' ?
                    <div>
                        <table className={styles.componentInfo}>
                            <tbody>
                                <tr>
                                    <td>Название</td><td>{props.order.name}</td>
                                </tr>

                                <tr>
                                    <td>Цена</td><td>{props.order.cost}₽</td>
                                </tr>
                                <tr>
                                    <td>Техническое задание</td><td><textarea readOnly value={props.order.technical_task} /></td>
                                </tr>
                                <tr>
                                    <td>Ваш отзыв</td><td>{props.order.customer_feedback}</td>
                                </tr>
                                <tr>
                                    <td>Тип заказа</td><td>{props.order.order_type}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.componentInfo2}>
                            <tbody>
                                <tr>
                                    <td><button onClick={() => setCommentMode(!commentMode)}>{commentMode ? 'Скрыть' : 'Изменить отзыв'}</button></td>
                                </tr>
                            </tbody>
                        </table>
                        {commentMode ? <ChangeCommentForm onSubmit={changeComment} /> : null}
                        {/* <hr className={styles.itemHr} /> */}
                    </div> :

                    props.userPosition === 'tester' ?
                        <div>
                            <div>
                                <table className={styles.componentInfo}>
                                    <tbody>
                                        <tr>
                                            <td>Название</td><td>{props.order.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Номер заказчика</td><td>{props.order.customer_id}</td>
                                        </tr>
                                        {/* <tr>
                                    <td>Цена</td><td>{props.order.cost}₽</td>
                                </tr> */}
                                        <tr>
                                            <td>Техническое задание</td><td><textarea readOnly value={props.order.technical_task} /></td>
                                        </tr>
                                        {/* <tr>
                                    <td>Отзыв клиента</td><td>{props.order.customer_feedback}</td>
                                </tr> */}
                                        <tr>
                                            <td>Тип заказа</td><td>{props.order.order_type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr className={styles.itemHr} />
                                <table className={styles.componentInfo} style={{ textAlign: 'center' }}>
                                    <tbody>
                                        <tr >
                                            <td colSpan='5' >Журнал разработки</td>
                                        </tr>
                                        <tr >
                                            <td rowSpan='2'>№</td>
                                            <td rowSpan='2'>Ответсвенный за этап</td>
                                            <td rowSpan='2'>Комментарий</td>
                                            <td colSpan='2' >Этап</td>
                                        </tr>
                                        <tr>
                                            <td>открыт</td>
                                            <td>закрыт</td>
                                        </tr>
                                        {stages.map((stage, index) => <tr key={stage.adoption_date.time + stage.closing_date.time}>
                                            <td>{index + 1}</td>
                                            <td>{stage.curator}</td>
                                            <td><textarea defaultValue={stage.report}></textarea></td>
                                            <td>{stage.adoption_date.date} <br /> в {stage.adoption_date.time}</td>
                                            <td>{stage.closing_date.date}  <br /> в {stage.closing_date.time}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                                <table className={styles.componentInfo2}>
                                    <tbody>
                                        <tr>
                                            <td><button onClick={() => setStageMode(!stageMode)}>{stageMode ? 'Скрыть' : 'Добавить точку тестирования'}</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {stageMode ? <CreateStage orderId={props.order.id} onSubmit={sendStage} /> : null}
                            </div>
                        </div>
                        : <div>
                            {props.order ? <div>
                                <table className={styles.componentInfo2}>
                                    <tbody>
                                        <tr>
                                            <td><button key={'back'} onClick={goBack}>⇦</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr className={styles.itemHr} />
                                {editMode ? <UpdateOrderForm onSubmit={updateOrder} order={props.order} setEditMode={setEditMode} /> :
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

                                    </div>
                                }
                                <table className={styles.componentInfo2}>
                                    <tbody>
                                        <tr>
                                            {/* <td><button onClick={() => deleteOrder()}>Удалить</button></td> */}
                                            <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr className={styles.itemHr} />
                                <table className={styles.componentInfo} style={{ textAlign: 'center' }}>
                                    <tr >
                                        <td colSpan='4' >Журнал разработки</td>
                                    </tr>
                                    <tr >
                                        <td rowSpan='2'>Ответсвенный за этап</td>
                                        <td rowSpan='2'>Комментарий</td>
                                        <td colSpan='2' >Этап</td>
                                    </tr>
                                    <tr>
                                        <td>открыт</td>
                                        <td>закрыт</td>
                                    </tr>
                                    <tbody>
                                        {stages.map(stage => <tr key={stage.adoption_date.time + stage.closing_date.time + '2'}>
                                            <td>{stage.curator}</td>
                                            <td><textarea value={stage.report}></textarea></td>
                                            <td>{stage.adoption_date.date} <br /> в {stage.adoption_date.time}</td>
                                            <td>{stage.closing_date.date}  <br /> в {stage.closing_date.time}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                                <hr className={styles.itemHr} />
                                <table className={styles.componentInfo} style={{ width: "300px" }}>
                                    <tbody>
                                        <tr>
                                            <td colSpan='2'>Программисты</td>
                                            <td><button onClick={() => setModal(!isModal)}>➕</button></td>
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
                                                    </td>
                                                    <td>
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
                                            <td colSpan='2'>Тестировщики</td>
                                            <td><button onClick={() => setModalTesters(!isModalTesters)}>➕</button></td>
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
                                                    </td>
                                                    <td>
                                                        <button onClick={() => removeTesterFromOrder(t.id)}>❌</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <Modal
                                    visible={isModal}
                                    title="Выберите разработчиков, назначаемых на заказ"
                                    content={
                                        <table >
                                            <tbody>
                                                {sortedDevs.map((d, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1})</td>
                                                            {d.projectsCount <= 2 ? <td>
                                                                <p style={{ border: '1px solid gray', backgroundColor: selectedColor[index].value, cursor: "cell", borderRadius: "10px", padding: "10px" }} key={'d' + d.personnel_number} onClick={() => { let c = selectedColor.findIndex(sc => sc.id === d.personnel_number); selectedColor[c].value = '#6FE66F'; setSelectedColor([...selectedColor]); setSelectedDevs([...selectedDevs, d.personnel_number]) }} onDoubleClick={() => { let c = selectedColor.findIndex(sc => sc.id === d.personnel_number); selectedColor[c].value = ''; setSelectedColor([...selectedColor]); setSelectedDevs(selectedDevs.filter(seld => seld !== d.personnel_number)) }} >{d.full_name} – {d.position}</p>
                                                            </td> :
                                                                <td>
                                                                    <p disabled title='Данный специалист уже занят' style={{ backgroundColor: "#f2b852", borderRadius: "10px", padding: "10px", cursor: "help" }} key={'d' + d.personnel_number}  >{d.full_name} – {d.position}</p>
                                                                </td>}

                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                    footer={<div><button style={{ margin: '5px' }} onClick={appointDeveloper}>Назначить</button><button onClick={onClose}>Закрыть</button></div>}
                                    onClose={onClose}
                                />
                                <Modal
                                    visible={isModalTesters}
                                    title={<div>
                                        <p>Выберите тестировщиков, назначаемых на заказ</p>
                                        {/* <div className={styles.tools}>
                        <input ref={searchInput} placeholder='Введите ФИО'></input>
                        <button onClick={() => window.find(searchInput.current.value)}>поиск</button>
                        <button onClick={() => this.rollback(searchInput.current.value = '')}>сброс</button>
                    </div> */}
                                    </div>}
                                    content={
                                        <table>
                                            <tbody>
                                                {sortedTesters.map((t, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1})</td>
                                                            {t.projectsCount <= 2 ?
                                                                <td>
                                                                    <p style={{ border: '1px solid gray', borderRadius: "10px", padding: "10px", backgroundColor: selectedColorTesters[index].value, cursor: "cell" }} key={'d' + t.personnel_number} onClick={() => { let c = selectedColorTesters.findIndex(sc => sc.id === t.personnel_number); selectedColorTesters[c].value = '#6FE66F'; setSelectedColorTesters([...selectedColorTesters]); setSelectedTesters([...selectedTesters, t.personnel_number]) }} onDoubleClick={() => { let c = selectedColorTesters.findIndex(sc => sc.id === t.personnel_number); selectedColorTesters[c].value = ''; setSelectedColorTesters([...selectedColorTesters]); setSelectedTesters(selectedTesters.filter(seld => seld !== t.personnel_number)) }} >{t.full_name}  – {t.position}
                                                                    </p>
                                                                </td>
                                                                :
                                                                <td>
                                                                    <p disabled title='Данный специалист уже занят' style={{ backgroundColor: "#f2b852", borderRadius: "10px", padding: "10px", cursor: "help" }} >{t.full_name} – {t.position}
                                                                    </p>
                                                                </td>
                                                            }
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                    footer={<div><button style={{ margin: '5px' }} onClick={appointTester}>Назначить</button><button onClick={onCloseTesters}>Закрыть</button></div>}
                                    onClose={onCloseTesters}
                                /></div> : <></>}
                        </div>}
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

export default connect(null, { deleteOrder, updateOrder, appointDeveloper, removeDeveloperFromOrder, appointTester, removeTesterFromOrder, saveStage })(OrderInfo);