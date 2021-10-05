import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from "./Components/Home/Home";
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/Login/Login";
import Navbar from './Components/Navbar/Navbar';
import NoMatch from "./Components/NoMatch/NoMatch";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Review from "./Components/Review/Review";
import Shipment from "./Components/Shipment/Shipment";
import Shop from './Components/Shop/Shop';

export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  // console.log(loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>Email: {loggedInUser.email}</h2>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/order-review">
            <Review />
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route path="/product/:key">
            <ProductDetail />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
