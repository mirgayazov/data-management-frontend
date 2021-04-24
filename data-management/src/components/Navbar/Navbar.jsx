import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/customers' activeClassName={s.activeLink}>Клиенты</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/developers' activeClassName={s.activeLink}>Разработчики</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/testers' activeClassName={s.activeLink}>Тестировщики</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/orders' activeClassName={s.activeLink}>Заказы</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
