import styles from "./TesterInfo.module.css";
import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { deleteTester } from '../../../redux/testers-reducer'
import { Redirect } from "react-router";

const deleteTesterForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>❌</button>
        </form>
    )
}

const DeleteTesterFormRedux = reduxForm({
    form: "deleteTesterForm"
})(deleteTesterForm)

let TesterInfo = (props) => {
    const onSubmit = (formData) => {
        props.deleteTester(props.tester.personnel_number)
    }

    return (
        <div className={styles.tester}>
            {props.tester ?
                <>
                    <h1>{props.tester.full_name}</h1>
                    <table className={styles.testerInfo}>
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
                            <td>Зарплата</td><td>{props.tester.salary}</td>
                        </tr>
                        <tr>
                            <td>Контакты</td><td>{props.tester.telephone_number}</td>
                        </tr>
                    </table><table className={styles.testerInfo2}>
                        <tr>
                            <td><DeleteTesterFormRedux onSubmit={onSubmit} /></td>
                        </tr>
                    </table></> : <Redirect to="/testers" />}
        </div>
    )
}

export default connect(null, { deleteTester })(TesterInfo);