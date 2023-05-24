import {
  FundOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import React from "react";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export const Items = [
  getItem(
    <Link href="/dashboard">
      <h1 className="!text-xl">Dashboard</h1>
    </Link>,
    "menu1",
    <FundOutlined className="!text-xl" />
  ),
  getItem(
    <Link href="/dashboard/product/products">
      <h1 className="!text-xl">Products</h1>
    </Link>,
    "menu2",
    <StayCurrentPortraitOutlinedIcon className="!text-xl" />
  ),
  getItem(
    <Link href="/dashboard/category">
      <h1 className="!text-xl">Category</h1>
    </Link>,
    "menu3",
    <AppsOutlinedIcon className="!text-xl" />
  ),
  getItem(
    <Link href="/dashboard/Banner/Banners">
      <h1 className="!text-xl">Banner</h1>
    </Link>,
    "menu4",
    <ViewCarouselOutlinedIcon className="!text-xl" />
  ),
  getItem(
    <Link href="/dashboard/order/order">
      <h1 className="!text-xl">order</h1>
    </Link>,
    "menu5",
    <ViewCarouselOutlinedIcon className="!text-xl" />
  ),

  getItem(
    <Link href="/dashboard/topProducts/Topproducts">
      <h1 className="!text-xl">Top Products</h1>
    </Link>,
    "menu6",
    <ViewCarouselOutlinedIcon className="!text-xl" />
  ),
];
