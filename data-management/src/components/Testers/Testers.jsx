import styles from "./Testers.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

let Testers = (props) => {
    return (
        <div className={styles.tester}>
            {props.testers.map(t => {
                return (
                    <NavLink className={styles.link} to={`/testers/${t.personnel_number}`}>
                        <div className={styles.item} key={t.personnel_number}>
                            {t.full_name}
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default Testers