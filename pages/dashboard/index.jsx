import React from "react";
import Sidenavbar from "./shared/Sidenavbar";
import AdminNavbar from "./shared/AdminNavbar";

const Home = () => {
  return (
    <div className="flex flex-row-reverse">
      <div>
        <AdminNavbar />
        <div className="text-2xl p-3">home</div>
      </div>
      <div className="flex flex-row">
        <div>
          <Sidenavbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
