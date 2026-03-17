import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./AppLayout.css";

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AppLayout;
