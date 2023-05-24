import React from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";

function TopProducts() {
  return (
    <div className="flex flex-col">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex">
        <div>
          <Sidenavbar />
        </div>
        <div>Top</div>
      </div>
    </div>
  );
}

export default TopProducts;
