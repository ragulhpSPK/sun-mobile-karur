import React from "react";
import Profile from "./myaccount";
import Cart from "./cart";
import Order from "./Orders";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { Divider } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function SideNavebar() {
  const [current, setProfileCurrent] = useState(1);

  const router = useRouter();

  const sidenavData = [
    {
      id: 1,
      name: "Profile",
      img: <AccountCircleIcon />,
      goto: "/profiles/SideNavbar/#1",
    },
    {
      id: 2,
      name: "Cart",
      img: <ShoppingCartCheckoutIcon />,
      goto: "/profiles/SideNavbar/#2",
    },
    {
      id: 3,
      name: "Orders",
      img: <StoreIcon />,
      goto: "/profiles/SideNavbar/#3",
    },
    {
      id: 4,
      name: "Logout",
      img: <LogoutIcon />,
      goto: "/",
    },
  ];

  const handleLogout = () => {
    Cookies.remove("x-o-t-p");
    dispatch(changeUserValues({ user: [] }));
  };

  return (
    <div>
      <div className="flex justify-between w-[100vw] flex-row-reverse xsm:hidden sm:flex">
        <div className="xl:w-[20vw] h-[85vh] flex flex-col gap-y-3  pt-[10vh]  p-10 overflow-y-hidden">
          {sidenavData.map((res, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => {
                    setProfileCurrent(res.id);
                  }}
                  key={index}
                  className={`${
                    current === res.id
                      ? "bg-[--third-color] text-white "
                      : "bg-white"
                  } h-[6vh] rounded`}
                >
                  <Link
                    href={`${res.goto}`}
                    onClick={() => {
                      res.id === 4 && handleLogout();
                    }}
                  >
                    <div className="flex items-center justify-start   xl:gap-1 h-[100%]">
                      <div className="p-3">{res.img}</div>
                      <div className="md:text-lg xl:text-xl font-bold sm:!pr-[2vw] xxl:!pr-0">
                        {res.name}
                      </div>
                    </div>
                  </Link>
                </div>
                <hr />
              </div>
            );
          })}
        </div>

        <div className="w-[80vw] h-[90vh]  overflow-y-scroll">
          <div id="1" className="h-[90vh] flex justify-center ">
            {<Profile />}
          </div>
          <div id="2" className="h-[90vh] flex justify-center">
            {<Cart />}
          </div>
          <div id="3" className="h-[90vh] flex justify-center ">
            {<Order />}
          </div>
        </div>
      </div>
      <div className="sm:hidden pl-[5vw]">
        {sidenavData.map((res, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                res.id === 2
                  ? router.push({ pathname: "/profiles/cart" })
                  : res.id === 3
                  ? router.push({ pathname: "/profiles/Orders" })
                  : router.push({ pathname: "/profiles/myaccount" });
              }}
            >
              <div key={index} className={`${"bg-white"} h-[10vh] rounded`}>
                <Link
                  href={`${res.goto}`}
                  onClick={() => {
                    res.id === 4 && handleLogout();
                  }}
                >
                  <div className="flex items-center justify-start    h-[100%]">
                    <div className="p-3">{res.img}</div>
                    <div className="font-bold text-lg">{res.name}</div>
                  </div>
                </Link>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideNavebar;

// import React from "react";

// function SideNavbar() {
//   return <div>SideNavbar</div>;
// }

// export default SideNavbar;
