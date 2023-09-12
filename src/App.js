import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/dashboard/homepage";
import Login from "./components/authen/login";
import Signup from "./components/authen/signup";
import Productlisting from "./components/authen/productlisting";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/productlisting" element={<Productlisting />}></Route>
    </Routes>
  );
}
// new comment .
export default App;
