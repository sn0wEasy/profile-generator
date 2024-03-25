import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import ViewProfile from "./pages/ViewProfile";
import useDarkMode from "./hooks/useDarkMode";

const App: React.FC = () => {
  useDarkMode();

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateProfile />} />
            <Route path="/profile/:id" element={<ViewProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
