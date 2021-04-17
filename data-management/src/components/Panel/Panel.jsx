import { AddNewTesterFormRedux } from '../Forms/Testers/Testers'
import classes from './Panel.module.css'

const Panel = (props) => {
  let addNewTester = (values) => {
    alert(values.testerFullName)
    // props.sendMessage(values.newMessageBody)
  }

  return (
    <footer >
      <button className={classes.panel}>добавить</button>
      <AddNewTesterFormRedux onSubmit={addNewTester} />
      <hr />
    </footer>
  );
};

export default Panel