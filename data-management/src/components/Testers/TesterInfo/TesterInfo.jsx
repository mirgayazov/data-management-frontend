import styles from './TesterInfo.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteTester, updateTester } from '../../../redux/testers-reducer'
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { UpdateTesterForm } from '../../Forms/Testers/Testers';

let TesterInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    const updateTester = (tester) => {
        props.updateTester(tester)
    }

    const deleteTester = () => {
        props.deleteTester(props.tester.personnel_number)
    }

    return (
        <div className={styles.component}>
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td><NavLink key={'back'} className={styles.link} to={`/testers`} title='назад'>⇦</NavLink></td>
                    </tr>
                </tbody>
            </table>
            {editMode ? <UpdateTesterForm tester={props.tester} onSubmit={updateTester} setEditMode={setEditMode} /> :
                props.tester ?
                    <div>
                        <table className={styles.componentInfo}>
                            <tbody>
                                <tr>
                                    <td>ФИО</td><td>{props.tester.full_name}</td>
                                </tr>
                                <tr>
                                    <td>Должность</td><td>{props.tester.position}</td>
                                </tr>
                                <tr>
                                    <td>Специализация</td><td>{props.tester.test_method}</td>
                                </tr>
                                <tr>
                                    <td>Серия паспорта</td><td>{props.tester.passport_details.series}</td>
                                </tr>
                                <tr>
                                    <td>Номер паспорта</td><td>{props.tester.passport_details.number}</td>
                                </tr>
                                <tr>
                                    <td>Зарплата</td><td>{props.tester.salary}₽</td>
                                </tr>
                                <tr>
                                    <td>Контакты</td><td>{props.tester.telephone_number}</td>
                                </tr>
                                <tr>
                                    <td>Трудовой стаж</td><td>{props.tester.work_experience}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div> : <Redirect to='/testers' />
            }
            <table className={styles.componentInfo2}>
                <tbody>
                    <tr>
                        <td><button onClick={() => deleteTester()}>Удалить</button></td>
                        <td><button onClick={() => setEditMode(!editMode)}>{editMode ? 'Отмена' : 'Редактировать'}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default connect(null, { deleteTester, updateTester })(TesterInfo);