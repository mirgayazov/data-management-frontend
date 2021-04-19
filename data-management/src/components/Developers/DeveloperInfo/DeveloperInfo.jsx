import styles from "./DeveloperInfo.module.css";
import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { deleteDeveloper } from '../../../redux/developers-reducer'
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const deleteDeveloperForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>❌</button>
        </form>
    )
}

const DeleteDeveloperFormRedux = reduxForm({
    form: "deleteDeveloperForm"
})(deleteDeveloperForm)

let DeveloperInfo = (props) => {
    const onSubmit = (formData) => {
        props.deleteDeveloper(props.developer.personnel_number)
    }

    return (
        <div className={styles.developer}>
            {props.developer ?
                <><NavLink key={'back'} className={styles.link} to={`/developers`} title="назад">⇦</NavLink>
                    <h1>{props.developer.full_name}</h1>
                    <table className={styles.developerInfo}>
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
                    </table><table className={styles.developerInfo2}>
                        <tr>
                            <td><DeleteDeveloperFormRedux onSubmit={onSubmit} /></td>
                        </tr>
                    </table></> : <Redirect to="/developers" />}
        </div>
    )
}

export default connect(null, { deleteDeveloper })(DeveloperInfo);