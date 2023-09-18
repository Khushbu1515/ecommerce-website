import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/dashboard/homepage";
import Login from "./components/authen/login";
import Signup from "./components/authen/signup";
import Cart from "./components/dashboard/cart";
import Checkout from "./components/dashboard/Checkout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    <Route path="/cart" element={<Cart />}></Route>
    <Route path="/checkout" element={<Checkout />}></Route>
      
    </Routes>
  );
}
// new comment .
export default App;
