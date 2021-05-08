import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

  const crypt = (email) => btoa(email)
  // const decrypt = (cryptedEmail) => atob(cryptedEmail)
  const cryptedEmail = crypt(props.email)

  return (
    <div>
      {props.position === 'admin' ?
        <div>
          <nav className={s.nav}>
            <div className={s.item}>
              <NavLink to='/tester/cryptedEmail/orders' activeClassName={s.activeLink}></NavLink>
            </div>
            <div className={s.item}>
              <NavLink to='/admin/id/account' activeClassName={s.activeLink}>Аккаунт</NavLink>
            </div>
          </nav>
        </div> : null}

      {props.position === 'tester' ?
        <div>
          <nav className={s.nav}>
            <div className={s.item}>
              <NavLink to={`/tester/:${cryptedEmail}/orders`} activeClassName={s.activeLink}>Мои проекты</NavLink>
            </div>
            <div className={s.item}>
              <NavLink to={`/tester/:${cryptedEmail}/account`} activeClassName={s.activeLink}>Аккаунт</NavLink>
            </div>
          </nav>
        </div> : null}

      {props.position === 'developer' ?
        <div>
          <nav className={s.nav}>
            <div className={s.item}>
              <NavLink to='/developer/id/orders' activeClassName={s.activeLink}>Мои проекты</NavLink>
            </div>
            <div className={s.item}>
              <NavLink to='/developer/id/account' activeClassName={s.activeLink}>Аккаунт</NavLink>
            </div>
          </nav>
        </div> : null}

      {props.position === 'manager' ?
        <div>
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
            <div className={s.item}>
              <NavLink to='/manager/id/account' activeClassName={s.activeLink}>Аккаунт</NavLink>
            </div>
          </nav></div> : null}

    </div>


  );
};

export default Navbar;
