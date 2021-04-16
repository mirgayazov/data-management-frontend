import styles from "./Developers.module.css";
import React from "react";

let Developers = (props) => {
    debugger
    return (
        <div className={styles.developer}>
            {props.developers.map(d => {
                debugger
                return (
                    <p className={styles.item} key={d.personnel_number}>{d.full_name} (Позиция: {d.position})</p>
                )
            })}
        </div>
    )
}

export default Developers