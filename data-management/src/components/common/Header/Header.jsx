import classes from './Header.module.css'
import { logout } from '../../../redux/auth-reducer'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const logout = () => {
    props.logout()
  }
  let department = ''

  switch (props.position) {
    case 'tester':
      department = 'тестирования'
      break;
    case 'developer':
      department = 'разработки'
      break;
    case 'manager':
      department = 'управления'
      break;
    case 'admin':
      department = 'управления'
      break;
    case 'customer':
      department = 'работы с клиентами'
      break;
    default:
      break;
  }

  return (
    <header className={classes.header}>
      {department !== 'управления' ? props.name.full_name+'.' : null} Добро пожаловать в отдел {department}!
      <NavLink onClick={logout} to='/' className={classes.link} >Выйти из системы </NavLink>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
    position: state.auth.position,
  }
}

export default connect(mapStateToProps, { logout })(Header);
