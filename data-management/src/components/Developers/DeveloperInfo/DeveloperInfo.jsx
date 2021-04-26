import styles from './DeveloperInfo.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteDeveloper, updateDeveloper } from '../../../redux/developers-reducer'
import { useHistory } from 'react-router-dom';
import { UpdateDeveloperForm } from '../../Forms/Developers/Developers';

let DeveloperInfo = (props) => {
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();
    const updateDeveloper = (developer) => {
        props.updateDeveloper(developer)
    }

    const deleteDeveloper = () => {
        props.deleteDeveloper(props.developer.personnel_number)
        history.goBack()
    }

    return (
        <div className={styles.component}>
            { props.developer ? <div>
                <table className={styles.componentInfo2}>
                    <tbody>
                        <tr>
                            <td key={'back'} style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
                                ⇦
                             </td>
                        </tr>
                    </tbody>
                </table>
                {editMode ? <UpdateDeveloperForm onSubmit={updateDeveloper} developer={props.developer} setEditMode={setEditMode} /> :
                    <div>
                        <table className={styles.componentInfo}>
                            <tbody>
                                <tr>
                                    <td>ФИО</td><td>{props.developer.full_name}</td>
                                </tr>
                                <tr>
                                    <td>Должность</td><td>{props.developer.position}</td>
                                </tr>
                                <tr>
                                    <td>Серия паспорта</td><td>{props.developer.passport_details.series}</td>
                                </tr>
                                <tr>
                                    <td>Номер паспорта</td><td>{props.developer.passport_details.number}</td>
                                </tr>
                                <tr>
                                    <td>Зарплата</td><td>{props.developer.salary}₽</td>
                                </tr>
                                <tr>
                                    <td>Контакты</td><td>{props.developer.telephone_number}</td>
                                </tr>
                                <tr>
                                    <td>Трудовой стаж</td><td>{props.developer.work_experience}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            }
            <table className={styles.componentInfo2}>
                    <tbody>
                        <tr>
                            <td><button onClick={() => deleteDeveloper()}>Удалить</button></td>
                            <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                        </tr>
                    </tbody>
                </table>
                </div> : <></>}
        </div>
    )
}

export default connect(null, { deleteDeveloper, updateDeveloper })(DeveloperInfo);