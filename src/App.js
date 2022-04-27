import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import ShopPage from "./components/ShopPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="flex p-2 justify-around bg-blue-100 h-16 items-center">
          <Link to="/" className="clickable btn bg-green-300 select-none">
            Home
          </Link>
          <Link to="shop" className="clickable btn bg-green-300 select-none">
            Shop
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
