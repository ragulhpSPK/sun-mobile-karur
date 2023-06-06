// import {
//   FundOutlined,
//   SettingOutlined,
//   AppstoreOutlined,
// } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import Image from "next/image";
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

export const Items = [
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
];
