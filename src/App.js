import{Routes,Route} from "react-router-dom"
import './App.css';
import Homepage from "./components/dashboard/homepage"
function App() {
  return (
   
     <Routes>
     <Route  path="/" element={<Homepage/>}></Route>
     
     </Routes>
   
  );
}

export default App;
