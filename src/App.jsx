import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddProductAdmin from "./Pages/Admin/Add-Product-Admin";
import ViewProduk from "./Pages/User/View-Product";
import TentangKami from "./Pages/User/TentangKami";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Admin/AddProductAdmin" element={<AddProductAdmin />} />
        <Route path="ViewProduct" element={<ViewProduk/>}/>
        <Route path="TentangKami" element={<TentangKami/>}/>
      </Routes>
    </Router>
  );
}

export default App;
