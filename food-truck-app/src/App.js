import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OwnerDashboardHome from "./components/OwnerDashboardHome";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import OrderHistory from "./components/OrderHistory";
import TruckInfo from "./components/TruckInfo";

function App() {
  return (
    <Router>
      <div className='App'>
        {/* Navbar here */}
        <Routes>
          <Route path="/" element={<OwnerDashboardHome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/truck-info" element={<TruckInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
