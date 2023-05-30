import {
  FundOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
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

export const Items = [
  getItem(
    <Link href="/dashboard">
      <h1 className="!text-xl">Dashboard</h1>
    </Link>,
    "dashboard",
    // <FundOutlined className="!text-xl" />
    <Image src="/assets/dash.png" alt="no" width={28} height={28} />
  ),
  getItem(
    <Link href="/dashboard/product/products">
      <h1 className="!text-xl">Products</h1>
    </Link>,
    "products",
    // <StayCurrentPortraitOutlinedIcon className="!text-xl" />
    <Image src="/assets/products.png" alt="no" width={28} height={28} />
  ),
  getItem(
    <Link href="/dashboard/category">
      <h1 className="!text-xl">Category</h1>
    </Link>,
    "category",
    // <AppsOutlinedIcon className="!text-xl" />
    <Image src="/assets/category.png" alt="no" width={28} height={28} />
  ),
  getItem(
    <Link href="/dashboard/Banner/Banners">
      <h1 className="!text-xl">Banner</h1>
    </Link>,
    "Banners",
    // <ViewCarouselOutlinedIcon className="!text-xl" />
    <Image src="/assets/banner2.png" alt="no" width={28} height={28} />
  ),
  getItem(
    <Link href="/dashboard/order/order">
      <h1 className="!text-xl">Orders</h1>
    </Link>,
    "order",
    // <ViewCarouselOutlinedIcon className="!text-xl" />
    <Image src="/assets/order.png" alt="no" width={28} height={28} />
  ),
];
