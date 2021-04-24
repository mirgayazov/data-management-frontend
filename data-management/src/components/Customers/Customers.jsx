import styles from './Customers.module.css';
import React from 'react';
import { levenshtein } from '../../utils/levenshtein'
import { NavLink } from 'react-router-dom';

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }

    state = {
        customers: this.props.customers,
        rollbackCustomers: this.props.customers,
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
            this.setState({ customers: this.props.customers })
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
            </div>
        )
    }

}

export default Customers