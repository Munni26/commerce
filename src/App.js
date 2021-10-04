import React from "react";
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
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Review from "./Components/Review/Review";
import Shipment from "./Components/Shipment/Shipment";
import Shop from './Components/Shop/Shop';
function App() {
  return (
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
        <Route path="/inventory">
          <Inventory />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/shipment">
          <Shipment />
        </Route>
        <Route path="/product/:key">
          <ProductDetail />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
