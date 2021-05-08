import classes from './Header.module.css'
import { logout } from '../../../redux/auth-reducer'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const logout = () => {
    props.logout()
  }

  return (
    <header className={classes.header}>
      Добро пожаловать {props.name.full_name}!
      <NavLink onClick={logout} to='/' className={classes.link} >Выйти из системы</NavLink>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
  }
}

export default connect(mapStateToProps, { logout })(Header);
