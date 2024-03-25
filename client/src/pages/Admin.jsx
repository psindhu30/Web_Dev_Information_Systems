import React from "react";
import AdminMain from "../components/AdminMain";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function Admin({ column }) {
  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <AdminMain column={column} />
      </div>
    </>
  );
}

export default Admin;
