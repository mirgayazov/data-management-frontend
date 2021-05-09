import './App.css';
import { NavLink, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import TestersContainer from './components/Testers/TestersContainer';
import OrdersContainer from './components/Orders/OrdersContainer';
import DevelopersContainer from './components/Developers/DevelopersContainer';
import CustomersContainer from './components/Customers/CustomersContainer';
import TesterInfoContainer from './components/Testers/TesterInfo/TesterInfoContainer';
import DeveloperInfoContainer from './components/Developers/DeveloperInfo/DeveloperInfoContainer';
import CustomerInfoContainer from './components/Customers/CustomersInfo/CustomerInfoContainer';
import Header from './components/Common/Header/Header';
import OrderInfoContainer from './components/Orders/OrderInfo/OrderInfoContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { getOrders } from './redux/orders-reducer'
import React, { useState } from 'react';
//--
import { authAPI, commonAPI,  } from './api/api'
import { ChangePassword, CreateAdminForm, CreateManagerForm } from './components/Forms/Login/Login';
import { logout } from './redux/auth-reducer';

let Staff = () => {

  let [createAdmin, setCreateAdmin] = useState(false)
  let [createManager, setCreateManager] = useState(false)

  let onSubmit = (schema) => {
    console.log(schema)
    authAPI.createStaff(schema)
      .then(result => {
        setCreateManager(false)
        setCreateAdmin(false)
      })
  }

  return (
    <div>
      <button className='item ' onClick={() => setCreateAdmin(!createAdmin)} >{createAdmin ? 'Отмена' : 'Создать администратора'}</button>
      {createAdmin ? <CreateAdminForm onSubmit={onSubmit}/> : <div></div>}
      <button className='item ' onClick={() => setCreateManager(!createManager)} >{createManager ? 'Отмена' : 'Создать менеджера'}</button>
      {createManager ? <CreateManagerForm onSubmit={onSubmit}/> : <div></div>}
    </div>
  );
};

let Account = () => {

  let [changePassword, setChangePassword] = useState(false)
  let [msg, setMsg] = useState('Чтобы создать надежный пароль используйте специальные символы: $%^&...')

  let onSubmit = (schema) => {
    authAPI.changePassword(schema)
      .then(result => {
        if (result.data.resultCode === -2) {
          setMsg(result.data.msg)
          console.log(result.data)
        }
        if (result.data.resultCode === 0) {
          logout();
          window.location.href = 'http://localhost:3001/'
        }
      })
  }

  return (
    <div>
      <button className='item ' onClick={() => { setChangePassword(!changePassword); setMsg('Чтобы создать надежный пароль используйте специальные символы: $%^&...') }}>{changePassword ? 'Отмена' : 'Сменить пароль'}</button>
      {changePassword ? <ChangePassword onSubmit={onSubmit} msg={msg} /> : <div></div>}
    </div>
  );
};

class Projects extends React.Component {

  state = {
    orders: [],
  }

  componentDidMount() {
    
    commonAPI.getProjects(this.props.position, this.props.email)
      .then(data => {
        this.setState({ orders: data.data.orders });
        getOrders()
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.orders !== this.props.orders) {
      this.setState({ orders: this.props.orders })
    }
  }

  render() {
    return (
      <div>
        {this.state.orders.map(o => {
          return (
            <NavLink key={o.id} className='link' to={`/orders/${o.id}`}>
              <div className='item' >
                {o.name}
              </div>
            </NavLink>
          )
        })}
      </div>
    );
  }
};

function App(props) {

  props.getOrders()
  return (
    < div className='app-wrapper' >
      { props.isAuth ?
        <>
          <Header />
          <Navbar position={props.position} email={props.email} />
          <div className='app-wrapper-content'>
            <Route exact path='/testers' render={() => <TestersContainer />} />
            <Route exact path='/tester/:cryptedEmail/orders' render={() => <Projects position={props.position} email={props.email} name={props.name} />} />
            <Route exact path='/tester/:cryptedEmail/account' render={() => <Account position={props.position} email={props.email} name={props.name} />} />
            <Route exact path='/testers/:pn' render={() => <TesterInfoContainer />} />

            <Route exact path='/developers' render={() => <DevelopersContainer />} />
            <Route exact path='/developers/:pn' render={() => <DeveloperInfoContainer />} />

            <Route exact path='/orders' render={() => <OrdersContainer />} />
            <Route exact path='/orders/:id' render={() => <OrderInfoContainer userPosition={props.position} />} />

            <Route exact path='/customers' render={() => <CustomersContainer />} />
            <Route exact path='/customers/:id' render={() => <CustomerInfoContainer />} />

            <Route exact path='/staff' render={() => <Staff />} />
            <Route exact path='/admin/:cryptedEmail/account' render={() => <Account position={props.position} email={props.email} name={props.name} />} />

            <Route exact path='/manager/:cryptedEmail/account' render={() => <Account position={props.position} email={props.email} name={props.name} />} />
          </div>
        </> :
        <>
          <Route exact path='/' render={() => <Login count={props.count} />} />
        </>}
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    count: state.auth.count,
    position: state.auth.position,
    name: state.auth.name,
    email: state.auth.email,
  }
}

export default connect(mapStateToProps, { getOrders })(App);
