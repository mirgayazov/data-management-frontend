import classes from './Panel.module.css'

const Panel = (props) => {
  return (
    <footer >
      <button className={classes.panel}>добавить</button>
      <button className={classes.panel}>удалить</button>
      <hr />
    </footer>
  );
};

export default Panel