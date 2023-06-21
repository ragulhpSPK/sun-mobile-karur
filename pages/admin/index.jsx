import { Button, Form, Input, notification } from "antd";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getDashBoardUsers } from "../../helper/utilities/apiHelper";
import { get } from "lodash";

function Admin() {
  const router = useRouter();
  const handleFinish = async (value) => {
    try {
      const result = await getDashBoardUsers();

      if (
        get(result, "data.message[0].email") === value.email &&
        get(result, "data.message[0].password") == value.password
      ) {
        localStorage.setItem("email", get(result, "data.message[0].email"));
      } else {
        notification.error({ message: "You are not authorized user" });
      }

      if (localStorage.getItem("email") === "Admin1234@gmail.com") {
        router.push({ pathname: "/dashboard" });
      }

      if (localStorage.getItem("email") === null) {
        router.push({ pathname: "admin" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-screen bg-cover backdrop-blur-sm  bg-[url('/assets/admin/admin2.avif')]">
      <div className="flex flex-col bg-white/70 backdrop-blur-sm  p-10 rounded-md">
        <h1 className="xsm:text-2xl xl:text-6xl pb-[2vh]">Admin Login</h1>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="email"
            label={<h1 className="lg:text-2xl">Email</h1>}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              className="xl:!h-[6vh] xl:!w-[21vw] lg:!h-[6vh] lg:!w-[30vw] xsm:h-[6.5vh] md:w-[40vw] xsm:w-[60vw]"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<h1 className="lg:text-2xl">Password</h1>}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              className="xl:!h-[6vh] xl:!w-[21vw] lg:!h-[6vh] lg:!w-[30vw] xsm:h-[6.5vh] xsm:w-[60vw] md:w-[40vw] outline-none"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="xsm:!h-[5vh] w-[40vw] flex items-center justify-center md:!h-[6vh] lg:!h-[6vh] md:ml-[-10vw] lg:!w-[21vw] xsm:ml-[-5.1vw] lg:ml-[-5.1vw] text-xl tracking-widest hover:scale-95 duration-1000"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Admin;
