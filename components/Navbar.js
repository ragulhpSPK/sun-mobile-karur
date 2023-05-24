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
  Drawer,
  Input,
  Modal,
  Form,
  Divider,
} from "antd";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "@/redux/searchSlice";
import Image from "next/image";
import { getAllCart, getOneUerforNav } from "../helper/utilities/apiHelper";
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
  const [drawOpen, setDrawOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;

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
      const result = await getAllCart();
      const getOneUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setActiveUser(get(getOneUser, "data.message[0]", []));
      setProduct(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cart.products.length, userDetails, product]);

  useEffect(() => {
    setData(
      Category.filter((data) => {
        return data.category.toLowerCase().includes(search);
      })
    );
  }, [search, cart.products.length]);

  return (
    <div className="flex flex-col justify-center fixed top-0 w-screen z-50 bg-white">
      {/* step 1 */}
      <div className="flex justify-between p-2 xsm:hidden lg:flex items-center !font-bold  hover:font-bold ">
        <div className="flex gap-x-2 text-sm capitalize hover:cursor-pointer hover:text-[--second-color] items-center">
          <div>About Us</div>
          <Divider type="vertical" />
          <div>My Account</div>
          <Divider type="vertical" />
          <div>Wishlist</div>
          <Divider type="vertical" />
          <div>Order Tracking</div>
        </div>
        <div>
          <div className="hover:!cursor-pointer hover:!text-[--second-color]">
            free delivery for all orders
          </div>
        </div>
        <div className="flex gap-x-1 text-sm  capitalize items-center">
          <div>
            <span className="hover:!cursor-pointer hover:!text-[--second-color]">
              call us : 9876543210
            </span>
          </div>
          <Divider type="vertical" />
          <FacebookIcon />
          <Divider type="vertical" />
          <InstagramIcon />
          <Divider type="vertical" />
          <TwitterIcon />
          <Divider type="vertical" />
          <WhatsAppIcon />
        </div>
      </div>
      <hr />
      {/* step 2 */}
      <div className="flex justify-center items-center h-[10vh]">
        <div className="flex justify-between items-center w-[90vw] h-[10vh]  ">
          <div>
            <Image
              src="/assets/logo/logo.png"
              width={90}
              height={90}
              alt="logo"
              className="pb-2 xsm:w-[12vw] sm:!w-[8vw] md:w-[8vw] lg:!w-[5vw]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between  border border-slate-50  p-2 rounded">
              <input
                placeholder="I'm looking for...."
                className="outline-none border-none xsm:!w-[40vw] lg:w-[30vw] placeholder:text-slate-200"
              />
              <div className="flex items-center w-[2vw]">
                <Divider type="vertical" />
                <SearchOutlined className="text-slate-200" />
              </div>
            </div>
          </div>

          <div className="flex gap-x-2 text-sm capitalize  items-center">
            <Link href="/profiles/cart">
              <Badge
                count={get(product, "length", "")}
                size="small"
                color="#9843A1"
                className="xsm:!hidden lg:!flex"
              >
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/assets/icons/cart.png"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <div>cart</div>
                </div>
              </Badge>
            </Link>
            <Divider type="vertical" />

            {isEmpty(activeUser) ? (
              <div className="bg-white shadow shadow-slate-300  rounded xsm:mt-1 md:mt-0 p-2 xl:h-[30px] xsm:!mr-[2vw] xl:w-[5vw] xsm:w-[18vw] xsm:h-[3.5vh] sm:w-[8vw] flex items-center  justify-center">
                <button
                  className="pl-1 xsm:text-[10px]  sm:text-md flex gap-x-1 items-center font-medium text-[--second-color] border-none lg:text-lg"
                  onClick={() => {
                    setLogin(!login);
                  }}
                >
                  <Image
                    src="/assets/icons/login.png"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <h1 className="font-bold xsm:text-[10px] xl:text-[12px] tracking-wider">
                    Login
                  </h1>
                </button>
              </div>
            ) : (
              <Link href="/profiles/SideNavbar">
                <Avatar
                  style={{
                    background: "orange",
                    textTransform: "uppercase",
                  }}
                  size={20}
                  className="xsm:!text-[12px]"
                >
                  {activeUser.firstName?.split("")[0]}
                </Avatar>
              </Link>
            )}
          </div>
          <Modal
            open={login}
            width={1000}
            footer={false}
            onCancel={() => {
              setLogin(false);
            }}
          >
            <Login setLogin={setLogin} />;
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
  );
}

export default Navbar;
