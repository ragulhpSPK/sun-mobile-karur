/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import { Category } from "@/helper/categories";
import { useRouter } from "next/router";
import {
  Avatar,
  Badge,
  Button,
  Input,
  Modal,
  Form,
  Divider,
  notification,
  Skeleton,
  Carousel,
} from "antd";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "@/redux/searchSlice";
import Image from "next/image";
import {
  getAllCart,
  getOneUerforNav,
  getDashProfile,
} from "../helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";
import Login from "../pages/Authentication/Register";
import Cookies from "js-cookie";
import { SearchOutlined } from "@ant-design/icons";

function Navbar() {
  const { Search } = Input;
  const Quantity = useSelector((state) => state.cart.quantity);
  const userDetails = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart);
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  const [profile, setProfile] = useState(false);
  const [dashsettings, setDashSettings] = useState([]);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      router.push({ pathname: `/subcat`, query: data });
    } else if (search.length == 0) {
      router.push({ pathname: "/" });
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [await getAllCart(), await getDashProfile()];
      setProduct(get(result[0], "data.message"));
      setDashSettings(get(result[1], "data.data"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cart.products, userDetails]);

  const avtivateNavbar = async () => {
    try {
      const getOneUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setActiveUser(get(getOneUser, "data.message[0]", []));
      fetchData();
    } catch (err) {
      notification.error({ message: "Something went wrong!" });
    }
  };

  useEffect(() => {
    avtivateNavbar();
  }, [userDetails, cart.products.length]);

  useEffect(() => {
    setData(
      Category.filter((data) => {
        return data.category.toLowerCase().includes(search);
      })
    );
  }, [search, cart.products.length]);

  return (
    <div
      className="w-[100vw] !h-[10vh]  fixed top-0  z-50 "
      style={{
        backgroundColor: get(dashsettings, "[0].navColor"),
      }}
    >
      <div className="flex flex-col justify-center items-center xsm:!w-[100vw] xl:!w-[100vw] m-auto">
        {/* step 1 */}

        <div className="flex  lg:w-[100vw] xl:w-[100vw] m-auto justify-between p-2 h-[10vh]  items-center  !font-bold  hover:font-bold ">
          <div>
            <Link href="/">
              <Skeleton loading={loading}>
                <Image
                  src={dashsettings[0]?.image}
                  width={60}
                  height={60}
                  alt="logo"
                  className="!pointer-none !ml-[-2vw] md:hidden"
                />
              </Skeleton>
            </Link>

            <Link href="/">
              <Skeleton loading={loading}>
                <Image
                  src={dashsettings[0]?.image}
                  width={80}
                  height={80}
                  alt="logo"
                  className="!pointer-none !ml-[4vw] hidden md:block"
                />
              </Skeleton>
            </Link>
          </div>
          {isEmpty(activeUser) ? (
            ""
          ) : (
            <div className="flex gap-x-2 text-[--text-secondary]  xsm:hidden md:flex text-md md:text-[12px] xl:text-[16px] xxl:pl-[3vw] md:w-[40vw] xl:w-[30vw] capitalize hover:cursor-pointer items-center ">
              <Link
                href="/footers/About"
                className="hover:text-[--second-color]"
              >
                About Us
              </Link>
              <Divider type="vertical" />
              <Link
                href="/profiles/SideNavbar#1"
                className="hover:text-[--second-color]"
              >
                My Account
              </Link>
              <Divider type="vertical" />
              <Link href="/wishlist" className="hover:text-[--second-color]">
                Wishlist
              </Link>
              <Divider type="vertical" />
              <Link
                href="/profiles/SideNavbar#3"
                className="hover:text-[--second-color]"
              >
                Order Tracking
              </Link>
            </div>
          )}

          <div className="flex md:gap-x-4 text-sm xsm:w-[70vw] md:w-[50vw] lg:w-[60vw] xl:w-[65vw] capitalize items-center ">
            <div className="flex items-center justify-between border border-slate-300  rounded-full pr-1 xsm:h-[35px] xl:h-[5vh] !bg-white p-2  relative">
              <input
                placeholder="I'm looking for...."
                className="outline-none border-none xsm:!w-[46vw] xsm:!h-[14px] md:!w-[250px] xl:p-2 lg:!w-[30vw] xxl:!w-[38vw]  lg:!h-[3vh] placeholder:text-slate-400"
                onChange={(e) => dispatch(addSearch(e.target.value))}
                onKeyUp={handleKeyDown}
              />
              <div className="flex items-center w-[2vw] absolute xsm:right-[9.5vw] sm:right-[5vw] md:right-[2.5vw] lg:right-[1.5vw]">
                <Divider type="vertical" />
                <SearchOutlined className="text-slate-200" />
              </div>
            </div>
            <div className="text-center  items-center justify-center hidden lg:flex">
              <div className="hover:!cursor-pointer xsm:w-[40vw] md:w-[25vw] xl:w-[20vw]   text-center pt-1 ">
                <Carousel
                  autoplay="true"
                  dots={false}
                  className="flex items-center justify-center h-[20px]"
                  dotPosition="right"
                >
                  <p className="hover:!text-[--second-color] xl:text-[15px]  h-[20px]  text-[--text-secondary]">
                    Free Delivery for All Orders
                  </p>
                  <p className="hover:!text-[--second-color] xl:text-[15px]  h-[20px]  text-[--text-secondary]">
                    Offers for products
                  </p>
                  <p className="hover:!text-[--second-color] xl:text-[15px]  h-[20px]  text-[--text-secondary]">
                    Great Deals Daily
                  </p>
                </Carousel>
              </div>
            </div>

            <div className="flex gap-x-2 text-sm capitalize absolute right-0 pr-5 items-center ">
              {isEmpty(activeUser) ? (
                ""
              ) : (
                <Link href="/profiles/SideNavbar#2">
                  <Badge
                    count={get(product, "length", "")}
                    size="small"
                    color="#9843A1"
                    className="xsm:!hidden xl:!flex"
                  >
                    <div className="flex items-center gap-x-2">
                      <Image
                        src="/assets/icons/cart.png"
                        width={30}
                        height={30}
                        alt="logo"
                      />
                      <div className="text-md">cart</div>
                    </div>
                  </Badge>
                </Link>
              )}

              {isEmpty(activeUser) ? "" : <Divider type="vertical" />}

              {isEmpty(activeUser) ? (
                <div className="bg-white shadow shadow-slate-300 xsm:ml-2 rounded xsm:mt-1 md:mt-0 p-2 xl:h-[30px] xsm:!mr-[2vw] xl:w-[5vw] xsm:w-[18vw] xsm:h-[3vh] sm:w-[8vw] flex items-center  justify-center">
                  <button
                    className="pl-1 xsm:text-[10px]  sm:text-md flex gap-x-1 items-center font-medium text-[--second-color] border-none lg:text-lg"
                    onClick={() => {
                      setLogin(!login);
                    }}
                  >
                    <Image
                      src="/assets/icons/login.png"
                      width={10}
                      height={10}
                      alt="logo"
                    />
                    <h1 className="font-bold xsm:text-[10px] text-center xl:text-[12px] pr-2 tracking-wider">
                      Login
                    </h1>
                  </button>
                </div>
              ) : (
                <Link href="/profiles/SideNavbar">
                  <Avatar
                    style={{
                      textTransform: "uppercase",
                    }}
                    size={25}
                    className="xsm:!text-[12px] !bg-[--second-color]"
                  >
                    {activeUser.firstName?.split("")[0]}
                  </Avatar>
                </Link>
              )}
            </div>
          </div>
        </div>
        <span className="border-b border-slate-50 p-1"></span>
        {/* step 2 */}
        <div className="flex justify-center items-center h-[7vh]">
          <div className="flex justify-between items-center w-[90vw] h-[5vh]  ">
            <Modal
              open={login}
              width={1000}
              footer={false}
              onCancel={() => {
                setLogin(false);
              }}
            >
              <Login setLogin={setLogin} />
            </Modal>

            <Modal
              open={profile}
              footer={false}
              onCancel={() => {
                setProfile(false);
              }}
            >
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl">Personal Information</h1>
                <Form
                  form={form}
                  size="small"
                  layout="vertical"
                  // onFinish={handleSubmit}
                >
                  <Form.Item
                    name="firstName"
                    label="Name"
                    rules={[
                      { required: true, message: "Please Enter Your Name" },
                    ]}
                  >
                    <Input placeholder="Enter Your Name" />
                  </Form.Item>
                  <Form.Item
                    name="number"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Mobile Number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Your  Mobile number"
                      // value={phoneNumber}
                    />
                  </Form.Item>
                  <Form.Item
                    name="alternateNumber"
                    label={
                      <span>
                        Alternate Mobile number{" "}
                        <span className="text-slate-400">(optional)</span>
                      </span>
                    }
                    rules={[
                      { message: "Please Enter Your Alternate Mobile number" },
                    ]}
                  >
                    <Input placeholder="Enter Your Alternate Mobile number" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={
                      <span>
                        Email Address
                        <span className="text-slate-400">(optional)</span>
                      </span>
                    }
                    rules={[{ message: "Please Enter Your Email Address" }]}
                  >
                    <Input placeholder="Enter Your Alternate Mobile number" />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label={<span>Address</span>}
                    rules={[
                      { required: true, message: "Please Enter Your Address" },
                    ]}
                  >
                    <TextArea placeholder="Enter Your Address" />
                  </Form.Item>
                  <Button htmlType="submit" className="w-[100%] !h-[5vh]">
                    <span className="text-black">Save</span>
                  </Button>
                </Form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
