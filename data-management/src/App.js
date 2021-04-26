import './App.css';
import { Route } from 'react-router-dom'
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

function App(props) {
  return (
    < div className='app-wrapper' >
      { props.isAuth ?
        <>
          <Header />
          <Navbar />
          <div className='app-wrapper-content'>
            <Route exact path='/testers' render={() => <TestersContainer />} />
            <Route exact path='/testers/:pn' render={() => <TesterInfoContainer />} />

            <Route exact path='/developers' render={() => <DevelopersContainer />} />
            <Route exact path='/developers/:pn' render={() => <DeveloperInfoContainer />} />

            <Route exact path='/orders' render={() => <OrdersContainer />} />
            <Route exact path='/orders/:id' render={() => <OrderInfoContainer />} />

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
  }
}

export default connect(mapStateToProps, {})(App);
