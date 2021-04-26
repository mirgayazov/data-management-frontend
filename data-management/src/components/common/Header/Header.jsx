import classes from './Header.module.css'
import { logout } from '../../../redux/auth-reducer'
import { connect } from 'react-redux';

const Header = (props) => {
  const logout = () => {
    props.logout(props.setIsAuth)
  }

  return (
    <header className={classes.header}>
      <button onClick={logout}>Выйти из системы</button>
    </header>
  );
};

export default connect(null, { logout })(Header);
