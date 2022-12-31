import React from "react";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home  from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Accessories from "../pages/Accessories";
import Search from "../pages/Search";
import Layout from "../components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/catalog/:slug" element={<Product />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
