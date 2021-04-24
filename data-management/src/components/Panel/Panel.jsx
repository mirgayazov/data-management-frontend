import { CreateTesterForm } from '../Forms/Testers/Testers'
import { createNewTester } from '../../redux/testers-reducer'
import { createNewDeveloper } from '../../redux/developers-reducer'
import { createNewCustomer } from '../../redux/customers-reducer'
import { createNewOrder } from '../../redux/orders-reducer'
import { CreateCustomerForm } from '../Forms/Customers/Customers';
import { CreateOrderForm } from '../Forms/Orders/Orders';
import { CreateDeveloperForm } from '../Forms/Developers/Developers'
import { connect } from 'react-redux';
import styles from './Panel.module.css'
import React from 'react';

class Panel extends React.Component {
  state = {
    closeBtndisplay: 'none',
    addBtndisplay: 'block',
  }

  activateEditMode = () => {
    this.setState({
      closeBtndisplay: 'block',
      addBtndisplay: 'none',
    })
  }

  deactivateEditMode = () => {
    this.setState({
      closeBtndisplay: 'none',
      addBtndisplay: 'block',
    })
  }

  addNewTester = (tester) => {
    this.props.createNewTester(tester)
  }

  addNewDeveloper = (developer) => {
    this.props.createNewDeveloper(developer)
  }

  addNewCustomer = (customer) => {
    this.props.createNewCustomer(customer)
  }

  addNewOrder = (order) => {
    this.props.createNewOrder(order)
  }

  render() {
    let name = '';
    if ((this.props.target === 'TESTERS') || (this.props.target === 'DEVELOPERS')) {
      name = 'сотрудника';
    } else if (this.props.target === 'CUSTOMERS') {
      name = 'клиента';
    } else {
      name = 'заказ';
    }
    return (
      <div>
        <div className={styles.tools}>
          <button className={styles.button} onClick={this.activateEditMode} style={{ display: this.state.addBtndisplay }}>Добавить {name}</button>
          <button className={styles.button} onClick={this.deactivateEditMode} style={{ display: this.state.closeBtndisplay }}>Закрыть</button>
          <div style={{ display: this.state.closeBtndisplay }}>
            <hr />
            <p></p>
            {this.props.target === 'TESTERS' ? <CreateTesterForm onSubmit={this.addNewTester} /> : null}
            {this.props.target === 'DEVELOPERS' ? <CreateDeveloperForm onSubmit={this.addNewDeveloper} /> : null}
            {this.props.target === 'CUSTOMERS' ? <CreateCustomerForm onSubmit={this.addNewCustomer} /> : null}
            {this.props.target === 'ORDERS' ? <CreateOrderForm onSubmit={this.addNewOrder} /> : null}
          </div>
        </div>
      </div>
    );
  }
};



export default connect(null, { createNewTester, createNewDeveloper, createNewCustomer, createNewOrder })(Panel);