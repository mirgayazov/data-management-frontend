import styles from "./Orders.module.css";
import React from "react";

let Orders = (props) => {
    debugger
    return (
        <div className={styles.order}>
            {props.orders.map(o => {
                debugger
                return (
                    <p className={styles.item} key={o.id}>{o.name}</p>
                )
            })}
        </div>
    )
}

export default Orders