import './App.css';
import { Route } from "react-router-dom"
import { Preloader } from './components/common/preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import TestersContainer from './components/Testers/TestersContainer';
import OrdersContainer from './components/Orders/OrdersContainer';
import DevelopersContainer from './components/Developers/DevelopersContainer';
import CustomersContainer from './components/Customers/CustomersContainer';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Route exact path="/load" render={() => <Preloader />} />
        <Route exact path="/testers" render={() => <TestersContainer />} />
        <Route exact path="/orders" render={() => <OrdersContainer />} />
        <Route exact path="/developers" render={() => <DevelopersContainer />} />
        <Route exact path="/customers" render={() => <CustomersContainer />} />
      </div>
    </div>
  );
}

export default App;
