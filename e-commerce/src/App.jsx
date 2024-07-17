import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgotpasword from "./pages/forgotpasword";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Blog from "./pages/blog";
import "./App.css";
import ShopContext from "./components/shopcontext";
import Details from "./pages/details";
import useFetchConfig from "./useFetch";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { appConfig, playerConfig, stale } = useFetchConfig();

  return (
    <>
      {stale && (
        <div className="stale">
          <p>No Mapping / Project Found (Rendering Default Site)</p>
        </div>
      )}
      <ShopContext>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="shop"
                element={
                  <Shop appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="blog"
                element={
                  <Blog appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="about"
                element={
                  <About appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="contact"
                element={
                  <Contact appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="login"
                element={
                  <Login appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="signup"
                element={
                  <Signup appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="forgotpasword"
                element={
                  <Forgotpasword
                    appConfig={appConfig}
                    playerConfig={playerConfig}
                  />
                }
              />
              <Route
                path="cart"
                element={
                  <Cart appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="checkout"
                element={
                  <Checkout appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
              <Route
                path="details"
                element={
                  <Details appConfig={appConfig} playerConfig={playerConfig} />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShopContext>
    </>
  );
}

export default App;
