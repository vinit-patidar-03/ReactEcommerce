import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Orders from './pages/Orders'
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [orders,setOrders] = useState([]);
  return (
    <>
    <Router>
    <Navbar orders={orders}/>
       <Routes>
        <Route exact path='/' element={<Home setOrders={setOrders} orders={orders}/>}/>
        <Route exact path='/orders' element={<Orders orders={orders} setOrders={setOrders}/>}/>
       </Routes>
    </Router>
    </>
  );
}

export default App;
