import styles from "./Orders.module.css";
import React from "react";

let Orders = (props) => {
    return (
        <div className={styles.order}>
            {props.orders.map(o => {
                return (
                    <p className={styles.item} key={o.id}>{o.name} (Цена: {o.cost} р.)</p>
                )
            })}
        </div>
    )
}

export default Orders