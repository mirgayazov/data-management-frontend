import styles from './DeveloperInfo.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteDeveloper, updateDeveloper } from '../../../redux/developers-reducer'
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { UpdateDeveloperForm } from '../../Forms/Developers/Developers';

let DeveloperInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    const updateDeveloper = (developer) => {
        props.updateDeveloper(developer)
    }

    const deleteDeveloper = () => {
        props.deleteDeveloper(props.developer.personnel_number)
    }

    return (
        <div className={styles.component}>
             <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td><NavLink key={'back'} className={styles.link} to={`/developers`} title='назад'>⇦</NavLink></td>
                    </tr>
                </tbody>
            </table>
            {editMode ? <UpdateDeveloperForm onSubmit={updateDeveloper} developer={props.developer} setEditMode={setEditMode} /> : props.developer ?
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
                </div> : <Redirect to='/developers' />
            }
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td><button onClick={() => deleteDeveloper()}>Удалить</button></td>
                        <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default connect(null, { deleteDeveloper, updateDeveloper })(DeveloperInfo);