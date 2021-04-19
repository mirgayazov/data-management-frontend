import { AddNewTesterFormRedux } from '../Forms/Testers/Testers'
import { createNewTester } from '../../redux/testers-reducer'
import { createNewDeveloper } from '../../redux/developers-reducer'
import { connect } from 'react-redux';
import styles from './Panel.module.css'
import React from 'react';
import { AddNewDeveloperFormRedux } from '../Forms/Developers/Developers';

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
  render() {
    return (
      <div>
        <div className={styles.tools}>
          <button className={styles.button} onClick={this.activateEditMode} style={{ display: this.state.addBtndisplay }}>Добавить сотрудника</button>
          <button className={styles.button} onClick={this.deactivateEditMode} style={{ display: this.state.closeBtndisplay }}>Закрыть</button>
          <div style={{ display: this.state.closeBtndisplay }}>
            <hr />
            <p></p>
            {this.props.target === 'TESTERS' ? <AddNewTesterFormRedux onSubmit={this.addNewTester} /> : <></>}
            {this.props.target === 'DEVELOPERS' ? <AddNewDeveloperFormRedux onSubmit={this.addNewDeveloper} /> : <></>}
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, { createNewTester, createNewDeveloper })(Panel);