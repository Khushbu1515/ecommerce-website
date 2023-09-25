import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/dashboard/homepage";
import Login from "./components/authen/login";
import Signup from "./components/authen/signup";
import {Cart} from "./components/dashboard/cart";
import Checkout from "./components/dashboard/Checkout";
import Placedorder from "./components/dashboard/placedorder";
import Updateprofile from "./components/authen/updateprofile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/placedorder" element={<Placedorder />}></Route>
    <Route path="/cart/:productId" element={<Cart />}></Route>
    <Route path="/checkout/:product_id" element={<Checkout />}></Route>
    
      
    </Routes>
  );
}
// new comment .
export default App;
