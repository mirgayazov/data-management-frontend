import styles from "./Customers.module.css";
import React from "react";

let Customers = (props) => {
    return (
        <div className={styles.customer}>
            {props.customers.map(c => {
                return (
                    <p className={styles.item} key={c.id}>{c.full_name} (История: {c.remarks_to_customer})</p>
                )
            })}
        </div>
    )
}

export default Customers