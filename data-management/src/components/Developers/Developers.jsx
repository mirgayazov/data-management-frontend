import styles from "./Developers.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

let Developers = (props) => {
    return (
        <div className={styles.developer}>
            {props.developers.map(d => {
                return (
                    <NavLink key={d.personnel_number} className={styles.link} to={`/developers/${d.personnel_number}`}>
                        <div className={styles.item} >
                            {d.full_name}
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default Developers