import styles from './Orders.module.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { levenshtein } from '../../utils/levenshtein'

let Paginator = (props) => {
    let [currentPage, setCurrentPage] = useState(1)

    let next = () => {
        if (currentPage <= props.pageCount - 1) {
            setCurrentPage(++currentPage)
            props.onNext(currentPage)
        }
    }

    let previous = () => {
        if (currentPage >= 2) {
            setCurrentPage(--currentPage)
            props.onPrevious(currentPage)
        }
    }

    return (
        <div>
            <button style={{ marginLeft: "10px" }} onClick={previous}>◀</button>
            <input type="text" value={currentPage} readOnly/>
            <button onClick={next}>▶</button>
        </div >
    )
}

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.state.currentMaxPage = 10;
    }

    state = {
        pageSize: 10,
        currentMaxPage: 10,
        orders: this.props.orders.slice(0, 10),
        rollbackOrders: this.props.orders,
        pageCount: Math.ceil(this.props.orders.length / 10),
    }

    Previous(newPage) {
        this.setState({ orders: this.state.rollbackOrders.slice(this.state.currentMaxPage - this.state.pageSize * 2, this.state.currentMaxPage - this.state.pageSize), currentMaxPage: this.state.currentMaxPage - this.state.pageSize })
    }

    Next(newPage) {
        this.setState({ orders: this.state.rollbackOrders.slice(this.state.currentMaxPage, this.state.currentMaxPage + this.state.pageSize), currentMaxPage: this.state.currentMaxPage + this.state.pageSize })
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
            this.setState({ orders: this.props.orders.slice(0, this.state.pageSize) })
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

                <div className={styles.tools2}>
                    <Paginator pageCount={this.state.pageCount} onNext={this.Next.bind(this)} onPrevious={this.Previous.bind(this)} />
                </div>
            </div>
        )
    }
}

export default Orders