import React from "react";
import { CoctelManager } from "../../components/managerCoctails";
import { PaqueteManager } from "../../components/managerPaquetes";
import '../../styles/admin.css'; 

export function AdminHome() {
  const [activeTab, setActiveTab] = React.useState("cocktails");

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "cocktails" ? "active" : ""}`}
          onClick={() => setActiveTab("cocktails")}
        >
          Cocteles
        </button>
        <button
          className={`tab-button ${activeTab === "packages" ? "active" : ""}`}
          onClick={() => setActiveTab("packages")}
        >
          Paquetes
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "cocktails" && <CoctelManager />}
        {activeTab === "packages" && <PaqueteManager />}
      </div>
    </div>
  );
}
