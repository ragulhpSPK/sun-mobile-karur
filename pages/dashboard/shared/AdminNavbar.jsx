/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AdminNavbar = ({ currentPage }) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("email") === null) {
      router.push({ pathname: "/customPage" });
    }
  }, []);

  return (
    <div className="flex items-center w-[85vw] justify-between h-[8vh] ">
      <div>{currentPage}</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.getItem("email") == null
            ? router.push({ pathname: "/admin" })
            : "";
        }}
      >
        <h1 className="text-lg pr-2 text-[--third-color] font-bold flex gap-1 items-center justify-center">
          <ExitToAppIcon style={{ fontSize: "20px" }} />
          LogOut
        </h1>
      </div>
    </div>
  );
};

export default AdminNavbar;
