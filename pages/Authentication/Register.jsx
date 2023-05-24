/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal, Form, Input, Button, Image, notification, Drawer } from "antd";
import { useState } from "react";
import {
  authHandler,
  createMessage,
  getOneUer,
} from "../../helper/utilities/apiHelper";
import OtpInput from "react-otp-input";
import styles from "../../styles/Home.module.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../components/firebase/firebase";
import { useEffect } from "react";
import { get, isEmpty } from "lodash";
import Cookies from "js-cookie";
import { excrypt } from "@/helper/shared";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeUserValues } from "@/redux/userSlice";

function Register({ setLogin }) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [expandForm, setExpandForm] = useState(false);
  const [numbers, setNumbers] = useState();
  const router = useRouter();
  const [formModal, setFormModal] = useState(false);

  const dispatch = useDispatch();
  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptacha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = async (e) => {
    setLogin(false);
    setExpandForm(true);

    // e.preventDefault();
    // if (phoneNumber.length >= 12) {
    //   setExpandForm(true);
    //   generateRecaptchaVerifier();
    //   let appVerfier = window.recaptchaVerifier;
    //   signInWithPhoneNumber(authentication, phoneNumber, appVerfier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  const verifyOtp = async () => {
    if (otp.length === 6) {
      const result = await getOneUer(phoneNumber);

      if (isEmpty(result.data.message)) {
        setFormModal(true);
      } else {
        const result = await authHandler({ number: phoneNumber });
        Cookies.set("x-o-t-p", result.data.data);
        dispatch(changeUserValues({ user: result.data.data }));
        notification.success({ message: "Continue to shop" });
      }
      setExpandForm(false);
    }
    // try {
    //   if (otp.length === 6) {
    //     let confirmationResult = window.confirmationResult;
    //     const result = await confirmationResult.confirm(otp);
    //     await createMessage({ number: get(result, "user.phoneNumber", "") });
    //     Cookies.set(
    //       "profie",
    //       JSON.stringify(excrypt(get(result, "user.phoneNumber", "")))
    //     );
    //     notification.success({ message: "data added successfully" });
    //   }
    // } catch (err) {
    //   router.push("/");
    //   console.log(err);
    //   notification.error({ message: "Something went wrong" });
    // }
  };

  useEffect(() => {
    verifyOtp();
  }, [otp]);
  const handleSubmit = async (values) => {
    try {
      const result = await authHandler(values);
      dispatch(changeUserValues({ user: result.data.data }));
      Cookies.set("x-o-t-p", result.data.data);
      setFormModal(false);
      notification.success({ message: "Continue to shop" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };
  return (
    <div>
      <div className="">
        <div className="lg:w-[50vw] l m-auto ">
          <div className="flex lg:flex-row xsm:flex-col">
            <div className="lg:w-[30vw] xxl:w-[20vw] xsm:w-[75vw]  xsm: backdrop-blur-sm bg-[--third-color] rounded-md md:flex-row xsm:flex-col flex xl:flex-col items-center justify-center">
              <h1 className="text-white xsm:text-[14px] lg:text-lg md:pl-[2vw] lg:pt-[2vh] md:text-xl xsm:w-[85%] md:w-[60%] lg:w-[60%] ">
                Register With Your Mobile Number Via OTP...
              </h1>
              <Image
                src="/assets/login2.png"
                alt="logo"
                width={200}
                height={200}
                preview={false}
                className="xsm:!w-[40vw] md:!h-[20vh] lg:h-[10vh]"
              />
            </div>
            <div className="lg:w-[30vw]  flex rounded-md !pt-[2vh] flex-col lg:items-center lg:justify-between   pr-[2vw]">
              <Form
                style={{ maxWidth: 500 }}
                form={form}
                name="control-hooks"
                className="xsm:pl-[3vw] lg:pl-[12vw] xl:pl-[6vw] xxl:pl-[2vw]"
              >
                <Form.Item
                  name="number"
                  label="Phone Number"
                  rules={[
                    { required: true, message: "Please Enter Your Number" },
                  ]}
                  style={{
                    fontSize: "30px",
                    color: "red",
                  }}
                  className="!w-[40vw] !text-[8px]"
                >
                  <Input
                    size="large"
                    placeholder="+91 9839288383"
                    className="xsm:w-[56vw] sm:w-[50vw] md:w-[50vw] lg:!w-[16vw]"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Item>
                <p className=" lg:!w-[25vw] xsm:text-[14px] md:text-[20px] sm:text-[12px]  xsm:w-[80vw] lg:text-base font-medium">
                  Secure access to our e-commerce platform by
                  {/* <a className="text-blue-600">Terms of Use</a> and &nbsp; */}
                  &nbsp;
                  <a className="text-blue-600">Our Privacy Policy</a>
                  &nbsp; before Register in.
                </p>
                <Form.Item className="flex items-center justify-center w-[80%]">
                  <Button
                    className={` bg-[--third-color] xsm:h-[5vh] xsm:w-[40vw] lg:!w-[22vw] lg:h-[6vh] !mt-[15px] lg:text-md  !text-white hover:!border-none hover:!scale-105 duration-1000`}
                    htmlType="submit"
                    style={{ color: "white" }}
                    onClick={requestOTP}
                  >
                    Request Otp
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={expandForm}
        footer={false}
        header={false}
        onCancel={() => setExpandForm(!expandForm)}
        className="absolute top-[22vh] xsm:!w-[80vw] sm:!w-[55vw] sm:right-[22vw] md:!w-[40vw] md:!right-[30vw] lg:!w-[26vw] xsm:right-[10vw] lg:!right-[40vw] "
      >
        <div
          className={`
           
          h-[18vh] bg-white rounded-md flex flex-col justify-around items-center`}
        >
          <label
            htmlFor="otp"
            className="font-bold text-xl text-slate-700 text-center "
          >
            Enter your OTP
          </label>
          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
            numInputs={6}
            otpType="number"
            disabled={false}
            autoFocus
            renderInput={(props) => (
              <input {...props} className="border-2 h-10 !w-8 ml-2" />
            )}
          ></OtpInput>
        </div>
      </Modal>
      <Modal
        open={formModal}
        footer={false}
        onCancel={() => {
          setFormModal(false);
        }}
      >
        <div className="flex flex-col justify-center">
          <Form
            form={form}
            size="small"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="firstName"
              label="Name"
              rules={[{ required: true, message: "Please Enter Your Name" }]}
            >
              <Input placeholder="Enter Your Name" />
            </Form.Item>
            <Form.Item
              name="number"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please Enter Your Mobile Number" },
              ]}
            >
              <Input
                placeholder="Enter Your  Mobile number"
                value={phoneNumber}
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
              rules={[{ message: "Please Enter Your Alternate Mobile number" }]}
            >
              <Input placeholder="Enter Your Alternate Mobile number" />
            </Form.Item>
            <Form.Item
              name="email"
              label={
                <span>
                  Email Address{" "}
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
              rules={[{ required: true, message: "Please Enter Your Address" }]}
            >
              <TextArea placeholder="Enter Your Address" />
            </Form.Item>
            <Button htmlType="submit" className="w-[100%] !h-[5vh]">
              <span className="text-black">Continue to Shop now</span>
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
