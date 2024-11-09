import React from "react";
import Sidebar from "./_component/Sidebar";
import Header from "./_component/Header";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 fixed ">
        <Sidebar />
      </div>
      <div className="md:ml-64 ">
        <Header />
        {children}
      </div>
    </div>
  );
}
