/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useEffect } from "react";
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
import SocialSettings from "./socialSettings";

function Profile(dashProfileData) {
  const [open, setOpen] = useState(false);
  const [imageList, setImageList] = useState("");

  const [form] = Form.useForm();
  const router = useRouter();

  console.log(dashProfileData.dashProfileData[0], "hnjmk");

  const handleProfileFinish = async (value) => {
    console.log("clicked");
    try {
      const formData = {
        name: value.name,
        email: value.email,
        image: imageList,
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
    form.setFieldsValue(dashProfileData.dashProfileData[0]);
  }, [dashProfileData.dashProfileData[0]]);

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

  const items = [
    {
      key: "1",
      label: <div className="font-bold">Profile Settings</div>,
      children: (
        <div>
          <Result
            icon={
              <Form>
                <Form.Item rules={[{ required: true }]}>
                  <Upload
                    listType="picture-card"
                    onRemove={(e) => {
                      setImageList("");
                    }}
                    fileList={[
                      {
                        url: dashProfileData.dashProfileData[0]?.image,
                      },
                    ]}
                    maxCount={1}
                    onChange={(e) => uploadImage(e.file.originFileObj)}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Form>
            }
            title={
              <Form
                layout="vertical"
                form={form}
                // initialValues={{
                //   name: dashProfileData[0]?.name,
                //   email: dashProfileData[0]?.email,
                // }}
                onFinish={(e) => handleProfileFinish(e)}
              >
                <Form.Item name="name" label="Name">
                  <Input placeholder="Enter  Name" type="text" />
                </Form.Item>

                <Form.Item name="email" label="Email">
                  <Input placeholder="Enter Email" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-[15vw] h-[5vh]"
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            }
          />
        </div>
      ),
    },
    {
      key: "2",
      label: `Themes Settings`,
      children: <Themes />,
    },
    {
      key: "3",
      label: `Footer Settings`,
      children: <FooterSettings data={dashProfileData.dashProfileData[0]} />,
    },
    {
      key: "4",
      label: "Social Media Settings",
      children: <SocialSettings data={dashProfileData.dashProfileData[0]} />,
    },
  ];

  return (
    <div className="h-[60vh] w-[50vw] bg-white pl-2 shadow-2xl rounded-lg">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Profile;