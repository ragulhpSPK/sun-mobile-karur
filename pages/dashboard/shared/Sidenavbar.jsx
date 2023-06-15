import React, { useState } from "react";
import Link from "next/link";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { Avatar, Drawer, Image, Menu, Skeleton } from "antd";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import { getDashProfile } from "../../../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GroupIcon from "@mui/icons-material/Group";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

function Sidenavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const Items = [
    getItem(
      <Link href="/dashboard">
        <h1 className="!text-xl">Dashboard</h1>
      </Link>,
      "dashboard",
      <DashboardCustomizeIcon className="!text-xl" />
      // <Image src="/assets/dash.png" alt="no" width={10} height={10} />
    ),
    getItem(
      <Link href="/dashboard/product/products">
        <h1 className="!text-xl">Products</h1>
      </Link>,
      "products",
      <Inventory2Icon className="!text-xl" />
      // <Image src="/assets/products.png" alt="no" width={10} height={10} />
    ),
    getItem(
      <Link href="/dashboard/category">
        <h1 className="!text-xl">Category</h1>
      </Link>,
      "category",
      <CategoryIcon className="!text-xl" />
      // <Image src="/assets/category.png" alt="no" width={10} height={10} />
    ),
    getItem(
      <Link href="/dashboard/Banner/Banners">
        <h1 className="!text-xl">Banner</h1>
      </Link>,
      "Banners",
      <ViewCarouselIcon className="!text-xl" />
      // <Image src="/assets/banner2.png" alt="no" width={10} height={10} />
    ),
    getItem(
      <Link href="/dashboard/order/order">
        <h1 className="!text-xl">Orders</h1>
      </Link>,
      "order",
      <FormatListNumberedIcon className="!text-xl" />
      // <Image src="/assets/order.png" alt="no" width={10} height={10} />
    ),
    getItem(
      <Link href="/dashboard/Users/user">
        <h1 className="!text-xl">Users</h1>
      </Link>,
      "user",
      <GroupIcon className="!text-xl" />
    ),

    getItem(
      <Link href="/dashboard/setting/Settings">
        <h1 className="!text-xl">Settings</h1>
      </Link>,
      "Settings",
      <SettingsSuggestIcon className="!text-xl" />
    ),

    // <div
    //   onClick={() => {
    //     router.push({ pathname: "/dashboard/setting/Settings" });
    //   }}
    //   className="flex flex-row-reverse  justify-center"
    // >
    //   <h1 className="!text-xl">Settings</h1>

    //   <SettingsSuggestIcon className="!text-xl" />
    // </div>
  ];

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
          className="lg:!hidden"
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
