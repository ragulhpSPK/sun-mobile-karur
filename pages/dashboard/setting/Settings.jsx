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
import { PlusOneOutlined } from "@mui/icons-material";

function Settings() {
  const [open, setOpen] = useState(false);
  const [dashProfileData, setdashProfileData] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();
  const [imageList, setImageList] = useState("");

  const uploadImage = (imagename) => {
    if (imagename == null) return;

    const imageRef = ref(
      storage,
      `images/${v4()}-${imagename && imagename.name}`
    );

    uploadBytes(imageRef, imagename).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList(url);
      });
      notification.success({ message: "image uploaded successfully" });
    });
  };

  console.log(dashProfileData[0], "dfknj");

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

  const handleProfileFinish = async (value) => {
    try {
      const formData = {
        coverphto: imageList,
      };

      await createDasProfile(formData);
      setOpen(false);
      form.resetFields();
      fetchData();
      notification.success({ message: "profile created successfully" });
    } catch (e) {
      console.log(e, "Ebhn");
      notification.error({ message: "something went wrong" });
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
            <div className="w-[90vw] !z-10 mb-[-3vh]                                                                                 %] -70">
              <div
                className={`h-[30vh] bg-[url('/assets/images/1.jpg')]  flex justify-end items-start`}
              >
                <div className="p-2">
                  <div
                    className="flex items-center p-2 gap-1 border-2 w-fit rounded !cursor-pointer border-white  float-right "
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
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
                          <h2 className="text-xl font-medium text-slate-500">
                            {data.name}
                          </h2>
                          <h2 className="text-xl font-medium text-slate-500">
                            {data.email}
                          </h2>
                        </div>
                      }
                      subTitle={
                        <div className="flex flex-col text-justify gap-4 !text-slate-600 ">
                          <p className="text-lg flex flex-col gap-1">
                            <span className="font-semibold">Address:</span>
                            {data.address}
                          </p>
                          <p className="text-lg flex flex-col gap-1">
                            <span className="font-semibold">Phone Number:</span>
                            {data.number},{data.alternatenumber}
                          </p>
                          <p className="text-lg flex flex-col gap-1">
                            <span className="font-semibold">
                              Working hours:
                            </span>
                            {data.workinghours}
                          </p>
                          <p className="text-lg flex items-center gap-1 ">
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
                            <a href={dashProfileData[0]?.fblink}>
                              <FacebookOutlined className="group-hover:text-[#1673eb] !text-xl" />
                            </a>
                            <a href={dashProfileData[0]?.inlink}>
                              <InstagramOutlined className="group-hover:text-[#f40873] !text-xl" />
                            </a>
                            <a href={dashProfileData[0].twlink}>
                              <TwitterOutlined className="group-hover:text-[#1c96e8] !text-xl" />
                            </a>
                            <a href={dashProfileData[0].wplink}>
                              <WhatsAppOutlined className="group-hover:text-[#1ad03f] !text-xl" />
                            </a>
                          </div>
                        </div>
                      }
                      key={i}
                    />
                  );
                })}
              </div>
              <div>
                <Profile data={dashProfileData[0]} fetchData={fetchData} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal
            open={open}
            footer={false}
            width={300}
            onCancel={() => {
              setOpen(false);
            }}
          >
            <div className="flex flex-col items-center justify-center ">
              <Upload
                listType="picture-card"
                onRemove={(e) => {
                  setImageList("");
                }}
                // fileList={[
                //   {
                //     url: dashProfileData.dashProfileData[0]?.image,
                //   },
                // ]}
                maxCount={1}
                onChange={(e) => uploadImage(e.file.originFileObj)}
                className="pl-[4vw]"
              >
                <div>
                  <PlusOneOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>

              <div>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={handleProfileFinish}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Settings;
