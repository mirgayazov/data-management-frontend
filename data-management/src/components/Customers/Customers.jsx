import styles from './Customers.module.css';
import React, { useState } from 'react';
import { levenshtein } from '../../utils/levenshtein'
import { NavLink } from 'react-router-dom';

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

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.state.currentMaxPage = 10;
    }

    state = {
        pageSize: 10,
        currentMaxPage: 10,
        customers: this.props.customers.slice(0, 10),
        rollbackCustomers: this.props.customers,
        pageCount: Math.ceil(this.props.customers.length / 10),
    }

    Previous(newPage) {
        this.setState({ customers: this.state.rollbackCustomers.slice(this.state.currentMaxPage - this.state.pageSize * 2, this.state.currentMaxPage - this.state.pageSize), currentMaxPage: this.state.currentMaxPage - this.state.pageSize })
    }

    Next(newPage) {
        this.setState({ customers: this.state.rollbackCustomers.slice(this.state.currentMaxPage, this.state.currentMaxPage + this.state.pageSize), currentMaxPage: this.state.currentMaxPage + this.state.pageSize })
    }

    findCustomer() {
        const target = this.searchInput.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundItems = this.state.rollbackCustomers.filter(customer => customer.id === target)
            this.setState({ customers: foundItems });
        } else {
            let foundItems = this.state.rollbackCustomers.filter(customer => levenshtein(customer.full_name, target) <= 5)
            this.setState({ customers: foundItems });
        }
    }

    rollback() {
        this.searchInput.current.value = '';
        this.setState({ customers: this.state.rollbackCustomers });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.customers !== this.props.customers) {
            this.setState({ customers: this.props.customers.slice(0, this.state.pageSize) })
        }
    }

    render() {
        return (
            <div className={styles.customer}>
                <div className={styles.tools}>
                    <input ref={this.searchInput} placeholder='Введите ФИО клиента'></input>
                    <button onClick={() => this.findCustomer()}>поиск</button>
                    <button onClick={() => this.rollback()}>сброс</button>
                </div>
                {this.state.customers.map(c => {
                    return (
                        <NavLink key={c.id} className={styles.link} to={`/customers/${c.id}`}>
                            <div className={styles.item} >
                                {c.full_name}
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

export default Customers