import React from "react";
import SideNavebar from "../shared/Sidenavbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { Avatar } from "antd";

function settings() {
  return (
    <div className="flex">
      <div>
        <SideNavebar />
      </div>
      <div className="p-[5vh] pt-[15vh] w-screen ">
        <div className="flex gap-32 border-b border-slate-200 pb-[1vh]">
          <h2 className="flex items-center ">
            <AccountCircleIcon className="text-[--third-color]" />
            Profile
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar
            style={{ backgroundColor: "white" }}
            className="!shadow-inner !shadow-slate-200 p-[4vw] "
          >
            <Image
              src="/assets/sun2.png"
              alt="no"
              width={150}
              height={150}
              className="mt-[-2vh]"
            />
          </Avatar>
          <div className="text-xl flex flex-col justify-center items-center">
            <h1>Sun Mobiles</h1>
            <h1>Sunmob@123@gmail.com</h1>
            <button>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default settings;
