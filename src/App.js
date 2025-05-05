import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/home';
import AddPlant from './pages/createPlant';
import Registration from './pages/Registration';
import Login from './pages/Login';


function App() {
 

  return (
    <div className="App">
      <Router>
        <div className='nav-bar'>
          <Link to="/"> Home Page </Link>
          <Link to="/addPlant">Add a plant</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addPlant" element={<AddPlant/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
