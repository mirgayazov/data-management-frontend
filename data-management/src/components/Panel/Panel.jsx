import { AddNewTesterFormRedux } from '../Forms/Testers/Testers'
import { createNewTester } from '../../redux/testers-reducer'
import { createNewDeveloper } from '../../redux/developers-reducer'
import { createNewCustomer } from '../../redux/customers-reducer'
import { createNewOrder } from '../../redux/orders-reducer'
import { connect } from 'react-redux';
import styles from './Panel.module.css'
import React from 'react';
import { AddNewDeveloperFormRedux } from '../Forms/Developers/Developers';
import { AddNewCustomerFormRedux } from '../Forms/Customers/Customers';
import { AddNewOrderFormRedux } from '../Forms/Orders/Orders';

class Panel extends React.Component {
  state = {
    closeBtndisplay: "none",
    addBtndisplay: "block",
  }

  activateEditMode = () => {
    this.setState({
      closeBtndisplay: "block",
      addBtndisplay: "none",
    })
  }

  deactivateEditMode = () => {
    this.setState({
      closeBtndisplay: "none",
      addBtndisplay: "block",
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
            {this.props.target === 'TESTERS' ? <AddNewTesterFormRedux onSubmit={this.addNewTester} /> : <></>}
            {this.props.target === 'DEVELOPERS' ? <AddNewDeveloperFormRedux onSubmit={this.addNewDeveloper} /> : <></>}
            {this.props.target === 'CUSTOMERS' ? <AddNewCustomerFormRedux onSubmit={this.addNewCustomer} /> : <></>}
            {this.props.target === 'ORDERS' ? <AddNewOrderFormRedux onSubmit={this.addNewOrder} /> : <></>}
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, { createNewTester, createNewDeveloper, createNewCustomer, createNewOrder })(Panel);