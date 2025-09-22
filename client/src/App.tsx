import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { CompressPage } from "./pages/compress";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-purple-800 to-red-500">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compress" element={<CompressPage />} />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h2 className="text-4xl font-bold">404 - Not Found</h2>
                <p className="text-2xl">
                  The page you are looking for does not exist.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
