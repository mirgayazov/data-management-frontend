import { AddNewTesterFormRedux } from '../Forms/Testers/Testers'
import { createNewTester } from '../../redux/testers-reducer'
import { connect } from 'react-redux';
import styles from './Panel.module.css'
import React from 'react';

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

  render() {
    return (
      <div>
        <div className={styles.tools}>
          <button className={styles.button} onClick={this.activateEditMode} style={{ display: this.state.addBtndisplay }}>Добавить сотрудника</button>
          <button className={styles.button} onClick={this.deactivateEditMode} style={{ display: this.state.closeBtndisplay }}>Закрыть</button>
          <div style={{ display: this.state.closeBtndisplay }}>
            <hr />
            <p></p>
            <AddNewTesterFormRedux onSubmit={this.addNewTester} />
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, { createNewTester })(Panel);