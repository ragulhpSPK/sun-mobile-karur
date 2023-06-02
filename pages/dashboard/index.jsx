import React from "react";
import Sidenavbar from "./shared/Sidenavbar";
import AdminNavbar from "./shared/AdminNavbar";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex flex-row">
        <div>
          <Sidenavbar />
        </div>
        <div className="pt-[6vh] pl-2">home</div>
      </div>
    </div>
  );
};

export default Home;
