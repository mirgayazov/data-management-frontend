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
import React from 'react';
//--
import { commonAPI } from './api/api'

class Projects extends React.Component {

  state = {
    orders: [],
  }

  componentDidMount() {
    commonAPI.getProjects(this.props.position, this.props.email)
      .then(data => {
        this.setState({ orders: data.data.orders });
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
        {/* <button onClick={() => testersAPI.getTesterProjects(this.props.email)}>+12312</button>
        <button onClick={() => console.log(this.props)}>123+</button>
        Мои проекты, я являюсь {this.props.position}
        моя почта - {this.props.email} */}
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
            <Route exact path='/tester/:cryptedEmail/orders' render={() => <Projects position={props.position} email={props.email} name={props.name}/>} />
            <Route exact path='/testers/:pn' render={() => <TesterInfoContainer />} />

            <Route exact path='/developers' render={() => <DevelopersContainer />} />
            <Route exact path='/developers/:pn' render={() => <DeveloperInfoContainer/>} />

            <Route exact path='/orders' render={() => <OrdersContainer />} />
            <Route exact path='/orders/:id' render={() => <OrderInfoContainer  userPosition={props.position} />} />

            <Route exact path='/customers' render={() => <CustomersContainer />} />
            <Route exact path='/customers/:id' render={() => <CustomerInfoContainer />} />
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
