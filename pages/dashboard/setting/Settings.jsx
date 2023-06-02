/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import SideNavebar from "../shared/Sidenavbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { Avatar, Modal, Tabs, notification, Result } from "antd";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { useState } from "react";
import { PlusOutlined, CameraOutlined } from "@ant-design/icons";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import {
  createDasProfile,
  getDashProfile,
} from "../../../helper/utilities/apiHelper";
import { storage } from "../../../components/firebase/firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import Sidenavbar from "../shared/Sidenavbar";
import AdminNavbar from "../shared/AdminNavbar";
import { useRouter } from "next/router";
import { get } from "lodash";
import FooterSettings from "./footerSettings";
import Themes from "./themes";
import { primary } from "daisyui/colors/colorNames";
import Profile from "./profile";

function Settings() {
  const [open, setOpen] = useState(false);
  const [imageList, setImageList] = useState("");
  const [dashProfileData, setdashProfileData] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await getDashProfile();
      console.log(result);
      setdashProfileData(get(result, "data.data"));
      form.setFieldsValue(get(result, "data.data")[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Sidenavbar />
        <div>
          <AdminNavbar currentPage={"Settings"} />
          <div>
            <div className="w-[90vw] !z-10 mb-[-3%] -70">
              <div className="h-[30vh] bg-[url('/assets/images/1.jpg')]  flex justify-end items-start">
                <div className="p-2">
                  <div className="flex items-center p-2 gap-1 border-2 w-fit rounded border-white  float-right ">
                    <CameraOutlined />
                    <div>Change cover</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10 !z-20 !opacity-100">
              <div className="h-[60vh] w-[25vw] bg-white shadow-2xl rounded-lg">
                {dashProfileData.map((data, i) => {
                  return (
                    <Result
                      icon={
                        <div className="  rounded-md shadow-inner w-[120px] h-[80px] flex items-center justify-center shadow-slate-300  m-auto">
                          <Image
                            src={data.image}
                            alt="no"
                            width={80}
                            height={80}
                            className=" m-auto   "
                          />
                        </div>
                      }
                      title={
                        <div>
                          <h2 className="text-2xl">{data.name}</h2>
                          <h2 className="text-2xl">{data.email}</h2>
                        </div>
                      }
                      subTitle={
                        <div className="flex flex-col text-justify gap-4 !text-slate-600 ">
                          <p className="text-xl flex flex-col gap-1">
                            <span className="font-semibold">Address:</span>
                            {data.address}
                          </p>
                          <p className="text-xl flex flex-col gap-1">
                            <span className="font-semibold">Phone Number:</span>
                            {data.number},{data.alternatenumber}
                          </p>
                          <p className="text-xl flex flex-col gap-1">
                            <span className="font-semibold">
                              Working hours:
                            </span>
                            {data.workinghours}
                          </p>
                          <p className="text-xl flex items-center gap-1 ">
                            <div className="font-semibold">Primary Color:</div>
                            <div
                              className="w-[30%]"
                              style={{
                                backgroundColor: get(data, "primary", ""),
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%  ",
                              }}
                            ></div>
                          </p>

                          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center justify-center gap-x-3">
                            <FacebookOutlined className="group-hover:text-[#1673eb] !text-xl" />
                            <InstagramOutlined className="group-hover:text-[#f40873] !text-xl" />
                            <TwitterOutlined className="group-hover:text-[#1c96e8] !text-xl" />
                            <WhatsAppOutlined className="group-hover:text-[#1ad03f] !text-xl" />
                          </div>
                        </div>
                      }
                      key={i}
                    />
                  );
                })}
              </div>
              <div>
                <Profile dashProfileData={dashProfileData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
