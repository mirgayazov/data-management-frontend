import './App.css';
import { Route } from "react-router-dom"
import { Preloader } from './components/Common/preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import TestersContainer from './components/Testers/TestersContainer';
import OrdersContainer from './components/Orders/OrdersContainer';
import DevelopersContainer from './components/Developers/DevelopersContainer';
import CustomersContainer from './components/Customers/CustomersContainer';
import TesterInfoContainer from './components/Testers/TesterInfo/TesterInfoContainer';
import DeveloperInfoContainer from './components/Developers/DeveloperInfo/DeveloperInfoContainer';
// import Panel from './components/Panel/Panel';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Route exact path="/load" render={() => <Preloader />} />

        <Route exact path="/testers" render={() => <TestersContainer />} />
        <Route exact path="/testers/:pn" render={() => <TesterInfoContainer />} />

        <Route exact path="/developers" render={() => <DevelopersContainer />} />
        <Route exact path="/developers/:pn" render={() => <DeveloperInfoContainer />} />

        <Route exact path="/orders" render={() => <OrdersContainer />} />

        <Route exact path="/customers" render={() => <CustomersContainer />} />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
