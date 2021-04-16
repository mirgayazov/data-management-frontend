import './App.css';
import { Route } from "react-router-dom"
import { Preloader } from './components/common/preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import TestersContainer from './components/Testers/TestersContainer';
import OrdersContainer from './components/Orders/OrdersContainer';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Route exact path="/load" render={() => <Preloader />} />
        <Route exact path="/testers" render={() => <TestersContainer />} />
        <Route exact path="/orders" render={() => <OrdersContainer />} />
        {/* <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/dialogs" render={() => <DialogsContainer />} />
        <Route exact path="/users" render={() => <UsersContainer />} />
        <Route exact path="/news" render={() => <DialogsContainer />} />
        <Route exact path="/music" render={() => <DialogsContainer />} />
        <Route exact path="/settings" render={() => <DialogsContainer />} /> */}
      </div>
    </div>
  );
}

export default App;
