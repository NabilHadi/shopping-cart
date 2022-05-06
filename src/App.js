import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import ShopPage from "./components/ShopPage";
import getProducts from "./products";

function App() {
  return (
    <BrowserRouter>
      <div className="App flex justify-center bg-slate-100 min-h-screen">
        <div className=" max-w-5xl flex-1">
          <header className="font-monotes text-8xl text-center p-4 bg-white">
            ICONS
          </header>
          <nav className="flex justify-center h-17 px-3 items-center bg-white border-t border-neutral-300">
            <ul className="p-4">
              <Link
                to="/"
                className="clickable btn font-semibold select-none mr-4"
              >
                Home
              </Link>
              <Link
                to="shop"
                className="clickable btn font-semibold select-none"
              >
                Shop
              </Link>
            </ul>
          </nav>
          <div className="h-6"></div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/shop"
              element={<ShopPage products={getProducts()} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
