import React, { useState } from "react";
import Link from "next/link";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { Avatar, Drawer, Image, Menu } from "antd";
import { Items } from "../../../helper/menu";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

function Sidenavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="!h-[100vh] ">
      <div>
        <MenuIcon
          className="lg:hidden !mt-[6vh]"
          onClick={() => {
            setOpen(true);
          }}
        />
        {/* <span className="!text-black">DashBoard</span> */}
      </div>

      <Drawer
        open={open}
        width={300}
        placement="left"
        onClose={() => setOpen(false)}
        className="lg:hidden"
      >
        <div className="shadow pt-[30%] !text-black">
          <div className="flex flex-col items-center justify-center">
            <Avatar
              style={{ backgroundColor: "white" }}
              className="!shadow-inner !shadow-slate-200"
              size={{ xsm: 64 }}
            >
              <Image
                src="/assets/sun2.png"
                alt="no"
                width={40}
                height={40}
                className="pb-5"
              />
            </Avatar>
            <p className="font-bold pt-2">Sun Mobiles</p>
            <p className="font-bold pt-2">sunmob123@gmail.com</p>
          </div>
          {console.log(
            router.route.split("/")[router.route.split("/").length - 1]
          )}
          <Menu
            defaultSelectedKeys={
              router.route.split("/")[router.route.split("/").length - 1]
            }
            mode="inline"
            // className="!h-[60vh] !w-[14vw] pt-[5vh] pl-[2vw]"
            items={Items}
          />
        </div>
      </Drawer>
      <div className="shadow pt-[30%] xsm:hidden lg:block">
        <div className="flex flex-col items-center justify-center">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            style={{ backgroundColor: "white" }}
            className="!shadow-inner !shadow-slate-200"
          >
            <Image
              src="/assets/sun2.png"
              alt="no"
              width={40}
              height={40}
              className="!h-[6vh] !w-[8vw]"
            />
          </Avatar>
          <p className="font-bold pt-2">Sun Mobiles</p>
          <p className="font-bold pt-2">sunmob123@gmail.com</p>
        </div>
        {console.log(
          router.route.split("/")[router.route.split("/").length - 1]
        )}
        <Menu
          defaultSelectedKeys={
            router.route.split("/")[router.route.split("/").length - 1]
          }
          mode="inline"
          className="!h-[60vh] !w-[14vw] pt-[5vh] pl-[2vw]"
          items={Items}
        />
      </div>
    </div>
  );
}

export default Sidenavbar;
