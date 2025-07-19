import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddProductAdmin from "./Pages/Admin/Add-Product-Admin";
import ViewProduk from "./Pages/User/View-Product";
import TentangKami from "./Pages/User/TentangKami";
import Cart from "./Pages/User/Cart";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register-User";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="AddProductAdmin" element={<AddProductAdmin />} />
        <Route path="ViewProduct" element={<ViewProduk />} />
        <Route path="TentangKami" element={<TentangKami />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
