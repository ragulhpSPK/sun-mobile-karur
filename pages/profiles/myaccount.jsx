import { EditOutlined } from "@ant-design/icons";
import {
  Drawer,
  Form,
  Input,
  Button,
  Avatar,
  Descriptions,
  notification,
} from "antd";
import React from "react";
import { useState } from "react";
import { getOneUerforNav, userProfile } from "../../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";

function Profile() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profile, setProfile] = useState([]);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [size, setSize] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getOneUerforNav();
      setProfile(get(result, "data.message", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (data) => {
    form.setFieldsValue(data);
  };

  const handleSubmit = async (value) => {
    try {
      const formData = {
        address: value.address,
        alternateNumber: `91${value.alternateNumber}`,
        email: value.email,
        firstName: value.firstName,
        number: `91${value.number}`,
        id: value._id,
      };
      await userProfile(formData);
      fetchData();
      setOpenDrawer(false);
      notification.success({ message: "profile updated successfully" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="xsm:!w-[100vw] sm:!w-[80vw] h-screen bg-[#ecf0f1] flex overflow-x-hidden justify-center xsm:pt-[12vh] sm:pt-[14vh]">
      <div className="xsm:w-[90vw] sm:w-[50vw]">
        <div className="flex justify-end float-right w-[20vw]">
          <Button
            onClick={() => {
              setOpenDrawer(true);
              handleEdit(profile[0]);
              setSize(260);
            }}
            type="primary"
            className="flex flex-row gap-x-1 items-center justify-center md:hidden"
          >
            <EditOutlined />
            <div> Edit</div>
          </Button>
          <Button
            onClick={() => {
              setOpenDrawer(true);
              handleEdit(profile[0]);
              setSize(400);
            }}
            type="primary"
            className="flex  gap-x-1 items-center justify-center xsm:hidden md:flex !w-[80px]"
          >
            <EditOutlined />
            <div> Edit</div>
          </Button>
        </div>

        <Descriptions
          column={2}
          title={
            <div className="!text-2xl flex gap-2 items-center w-[40vw] ">
              <Avatar
                size="large"
                style={{ backgroundColor: "var(--third-color)" }}
              >
                {profile[0] && profile[0].firstName.slice(0, 1).toUpperCase()}
              </Avatar>
              {get(profile, "[0].firstName")}
            </div>
          }
        >
          {/* <Descriptions.Item label="Name">
            {get(profile, "[0].firstName")}
          </Descriptions.Item> */}
          <Descriptions.Item label="Email">
            {get(profile, "[0].email")}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile Number">
            {get(profile, "[0].number")}
          </Descriptions.Item>

          <Descriptions.Item label="Address">
            {get(profile, "[0].address")}
          </Descriptions.Item>
          <Descriptions.Item label="Alternate Mobile Number">
            {get(profile, "[0].alternateNumber")}
          </Descriptions.Item>
        </Descriptions>
        <Drawer
          open={openDrawer}
          width={size}
          onClose={() => setOpenDrawer(false)}
        >
          <Form
            form={form}
            size="small"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="firstName"
              label="Name"
              rules={[
                { required: true, message: "Please Enter Your Name" },
                {
                  type: "text",
                  message: "Name must be atleast 2 characters",
                },
                { min: 2 },
              ]}
              className="!text-white"
            >
              <Input placeholder="Enter Your Name" type="text" />
            </Form.Item>
            <Form.Item
              name="number"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Mobile Number",
                },
                { message: "Enter valid number" },
              ]}
            >
              <Input placeholder="Enter Your  Mobile number" />
            </Form.Item>
            <Form.Item
              name="alternateNumber"
              label={
                <span>
                  Alternate Mobile number
                  <span className="text-slate-400">(optional)</span>
                </span>
              }
              rules={[{ message: "Enter valid number" }]}
            >
              <Input
                placeholder="Enter Your Alternate Mobile number"
                defaultValue={91}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={
                <span>
                  Email Address
                  <span className="text-slate-400">(optional)</span>
                </span>
              }
              rules={[
                {
                  required: true,
                },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input placeholder="Enter Your Alternate Mobile number" />
            </Form.Item>
            <Form.Item
              name="address"
              label={<span>Address</span>}
              rules={[
                { required: true, message: "Please Enter Your Address" },
                {
                  min: 15,
                },
              ]}
            >
              <TextArea placeholder="Enter Your Address" />
            </Form.Item>
            <Button
              htmlType="submit"
              className="w-[100%] m-auto !h-[5vh] !bg-[--second-color] hover:scale-95 hover:bg-[--fifth-color] hover:duration-1000"
            >
              <span className="text-white text-lg tracking-wider">Save</span>
            </Button>
          </Form>
        </Drawer>
      </div>
    </div>

    // <div className="w-[85vw]  h-[90vh]">
    //   <div className="w-[50vw] p-[5vw]">
    //     <div>
    //       <div className="text-2xl">
    //         <h1> Customer Name </h1>
    //       </div>
    //       <div className="text-2xl">
    //         <h1>Email Addrss</h1>
    //       </div>
    //       <div className="text-2xl">
    //         <h1>Mobile Number</h1>
    //       </div>
    //       <div className="text-xl">
    //         <p>Address</p>
    //         <p>abcdefgh</p>
    //         <p>abcdefgh</p>
    //         <p>abcdefgh</p>
    //       </div>
    //     </div>
    //     <div className="flex items-center">
    //       <p className="text-xl">Edit Address</p>
    //       <EditOutlined
    //         style={{ fontSize: "20px" }}
    //         onClick={() => {
    //           setOpenDrawer(true);
    //         }}
    //       />
    //     </div>

    //   </div>
    // </div>
  );
}

export default Profile;
