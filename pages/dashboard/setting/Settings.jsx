/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import SideNavebar from "../shared/Sidenavbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import {
  Avatar,
  Modal,
  Tabs,
  notification,
  Result,
  Space,
  Badge,
  Switch,
} from "antd";
import { Button, Form, Input, InputNumber, Upload, Skeleton } from "antd";
import { useState } from "react";
import {
  PlusOutlined,
  CameraOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
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
import Profile from "./profile";
import { PlusOneOutlined } from "@mui/icons-material";

function Settings() {
  const [open, setOpen] = useState(false);
  const [dashProfileData, setdashProfileData] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();
  const [imageList, setImageList] = useState("");
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getDashProfile();
      setdashProfileData(get(result, "data.data"));
      form.setFieldsValue(get(result, "data.data")[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileFinish = async () => {
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
        <div className="!hidden lg:!block w-[86vw] ">
          <AdminNavbar
            currentPage={
              <p className="flex text-xl font-bold text-[--third-color] pl-[2vw]">
                Settings
              </p>
            }
          />
          <div className="bg-gradient-to-r from-white via-[#f5f7f6] to-white">
            <div className="xl:w-[86vw]  !z-10 xl:mb-[-3vh]                                                                                 %] -70">
              <div
                style={{
                  background: `${
                    get(dashProfileData, "[0].coverphto", "") !== ""
                      ? `url(${get(dashProfileData, "[0].coverphto", "")})`
                      : "#570DF8"
                  }`,
                }}
                className={`xsm:h-[20vh] xl:h-[30vh] !bg-cover !bg-no-repeat  flex justify-end items-start`}
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
            <div className="flex flex-col xl:flex-row items-center justify-center xl:gap-10 !z-20 !opacity-100">
              <div className="xl:h-[70vh] xl:w-[25vw] bg-white shadow-2xl rounded-lg">
                <Skeleton loading={loading} className="!h-[60vh] !w-[25vw]">
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
                              <span className="font-semibold">
                                Phone Number:
                              </span>
                              {data.number},{data.alternatenumber}
                            </p>
                            <p className="text-lg flex flex-col gap-1">
                              <span className="font-semibold">
                                Working hours:
                              </span>
                              {data.workinghours}
                            </p>
                            <div className="text-lg flex items-center gap-1 ">
                              <div className="font-semibold">
                                background Colors:
                              </div>

                              <Badge
                                className="site-badge-count-109"
                                count="primary"
                                style={{
                                  backgroundColor: get(data, "primary", ""),
                                }}
                              />

                              <Badge
                                className="site-badge-count-109"
                                count="secondary"
                                style={{
                                  backgroundColor: get(data, "secondary", ""),
                                }}
                              />

                              <Badge
                                className="site-badge-count-109"
                                count={<p className="text-black">navbg</p>}
                                style={{
                                  backgroundColor: get(data, "navColor", ""),
                                }}
                              />
                              <Badge
                                className="site-badge-count-109"
                                count="footer"
                                style={{
                                  backgroundColor: get(data, "footercolor", ""),
                                }}
                              />
                            </div>
                            <div className="text-lg flex items-center gap-1 ">
                              <div className="font-semibold">Text Colors:</div>
                              <Badge
                                className="site-badge-count-109"
                                count="textprimarycolor"
                                style={{
                                  backgroundColor: get(
                                    data,
                                    "textprimarycolor",
                                    ""
                                  ),
                                }}
                              />
                              <Badge
                                className="site-badge-count-109"
                                count="textsecondarycolor"
                                style={{
                                  backgroundColor: get(
                                    data,
                                    "textsecondarycolor",
                                    ""
                                  ),
                                }}
                              />
                            </div>

                            <div className=" hover:font-semibold cursor-pointer flex flex-row items-center justify-center gap-x-3">
                              <div className="group">
                                <a
                                  href={dashProfileData[0]?.fblink}
                                  target="_blank"
                                >
                                  <FacebookOutlined className="group-hover:text-[#1673eb] !text-xl" />
                                </a>
                              </div>
                              <div className="group">
                                <a
                                  href={dashProfileData[0]?.inlink}
                                  target="_blank"
                                >
                                  <InstagramOutlined className="group-hover:text-[#f40873] !text-xl" />
                                </a>
                              </div>
                              <div className="group">
                                <a
                                  href={dashProfileData[0].twlink}
                                  target="_blank"
                                >
                                  <TwitterOutlined className="group-hover:text-[#1c96e8] !text-xl" />
                                </a>
                              </div>

                              <div className="group">
                                <a
                                  href={dashProfileData[0].wplink}
                                  target="_blank"
                                >
                                  <WhatsAppOutlined className="group-hover:text-[#1ad03f] !text-xl" />
                                </a>
                              </div>
                            </div>
                          </div>
                        }
                        key={i}
                      />
                    );
                  })}
                </Skeleton>
              </div>

              <div>
                <Profile
                  data={dashProfileData[0]}
                  fetchData={fetchData}
                  loading={loading}
                />
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
