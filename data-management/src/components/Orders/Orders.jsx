import styles from './Orders.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { levenshtein } from '../../utils/levenshtein'

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }

    state = {
        orders: this.props.orders,
        rollbackOrders: this.props.orders,
    }

    findOrder() {
        const target = this.searchInput.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundItems = this.state.rollbackOrders.filter(order => order.id === target)
            this.setState({ orders: foundItems });
        } else {
            let foundItems = this.state.rollbackOrders.filter(order => levenshtein(order.name, target) <= 5)
            this.setState({ orders: foundItems });
        }
    }

    rollback() {
        this.searchInput.current.value = '';
        this.setState({ orders: this.state.rollbackOrders });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.orders !== this.props.orders) {
            this.setState({ orders: this.props.orders })
        }
    }

    render() {
        return (
            <div className={styles.order}>
                <div className={styles.tools}>
                    <input ref={this.searchInput} placeholder='Введите название заказа'></input>
                    <button onClick={() => this.findOrder()}>поиск</button>
                    <button onClick={() => this.rollback()}>сброс</button>
                </div>
                {this.state.orders.map(o => {
                    return (
                        <NavLink key={o.id} className={styles.link} to={`/orders/${o.id}`}>
                            <div className={styles.item} >
                                {o.name}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        )
    }
}

export default Orders