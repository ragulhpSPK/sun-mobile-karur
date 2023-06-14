import React, { useState } from "react";
import Link from "next/link";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { Avatar, Drawer, Image, Menu, Skeleton } from "antd";
import { Items } from "../../../helper/menu";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import { getDashProfile } from "../../../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";

function Sidenavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getDashProfile();
      setData(get(result, "data.data[0]"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="!h-[100vh] w-[14vw] pl-[3vw]">
      <div>
        <MenuIcon
          className="lg:hidden"
          onClick={() => {
            setOpen(true);
          }}
        />
        {/* <span className="!text-black">DashBoard</span> */}
      </div>

      <div className=" h-[100vh] xsm:hidden lg:block ">
        <div className="flex flex-col items-center justify-center !pt-[10vh]">
          <Skeleton loading={loading} style={{ height: "50px", width: "80px" }}>
            <Image
              src={data.image}
              alt="no"
              width={60}
              height={50}
              className="!h-[100%] !w-[100%] cursor-pointer shadow-inner shadow-slate-200 "
              preview={false}
            />
            <p className="font-bold pt-2 text-black">{data.name}</p>
            <p className="font-bold pt-2">{data.email}</p>
          </Skeleton>
        </div>

        <Menu
          defaultSelectedKeys={
            router.route.split("/")[router.route.split("/").length - 1]
          }
          mode="inline"
          className=" !w-[14vw] pt-[5vh] hidden lg:block"
          items={Items}
          style={{ backgroundColor: "none" }}
        />
      </div>

      <Drawer
        open={open}
        width={300}
        placement="right"
        onClose={() => setOpen(false)}
        className="lg:hidden"
      >
        <div className=" pt-[30%] !text-black">
          <div className="flex flex-col items-center justify-center">
            <Avatar
              style={{ backgroundColor: "white" }}
              className="!shadow-inner !shadow-slate-100 !w-[20vw]"
            >
              <Image
                src={data.image}
                alt="no"
                width={40}
                height={40}
                className="pb-5"
              />
            </Avatar>
            <p className="font-bold pt-2 text-black">{data.name}</p>
            <p className="font-bold pt-2">{data.email}</p>
          </div>

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
    </div>
  );
}

export default Sidenavbar;
