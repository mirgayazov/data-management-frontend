import styles from "./Testers.module.css";
import React from "react";

let Testers = (props) => {
    debugger
    return (
        <div className={styles.tester}>
            {props.testers.map(t => {
                debugger
                return (
                    <p className={styles.item} key={t.personnel_number}>{t.full_name} (Метод: {t.test_method}) </p>
                )
            })}
        </div>
    )
}

export default Testers