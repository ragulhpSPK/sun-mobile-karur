import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";

const AdminNavbar = ({ currentPage }) => {
  return (
    <div className="flex items-center w-[90vw] justify-between h-[8vh] p-10 shadow">
      <div>{currentPage}</div>
      <div className="cursor-pointer">
        <Avatar
          sx={{ width: 24, height: 24 }}
          src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
        ></Avatar>
      </div>
    </div>
  );
};

export default AdminNavbar;
