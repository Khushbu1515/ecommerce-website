import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/authen/Login";
import Signup from "./components/authen/Signup";
import {Cart} from "./components/dashboard/Cart";
import Checkout from "./components/dashboard/Checkout";

import Updateprofile from "./components/authen/updateprofile";

import Homepage from "./components/dashboard/Homepage";
import Notfound from "./components/dashboard/Notfound";
import Orderhistory from "./components/dashboard/Orderhistory";
import Orderplaced from "./components/dashboard/Orderplaced";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/orderhistory" element={<Orderhistory />}></Route>
      <Route path="/orderplaced/:uuids" element={<Orderplaced/>}></Route>
    <Route path="/cart/:product_id/:c_id" element={<Cart />}></Route>
    <Route path="/checkout" element={<Checkout />}></Route>
    <Route path="/update/:user_id" element={<Updateprofile />}></Route>
    <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
// new comment .
export default App;
