import Image from "next/image";
import React, { useState } from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  AliwangwangOutlined,
  FieldTimeOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { getDashProfile } from "../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";

const CustomerFooters = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await getDashProfile();
    setData(get(result, "data.data[0]"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const footersData = [
    {
      id: 1,
      title: "Address",
      subTitle: data.address,
      icon: <EnvironmentOutlined className="text-sm" />,
    },
    {
      id: 2,
      title: "Call Us",
      subTitle: `(+91) - ${data.number}`,
      icon: <PhoneOutlined className="text-sm" />,
    },
    {
      id: 3,
      title: "Email",
      subTitle: data.email,
      icon: <AliwangwangOutlined className="text-sm" />,
    },
    {
      id: 4,
      title: "Hours",
      subTitle: data.workinghours,
      icon: <FieldTimeOutlined className="text-sm" />,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center xsm:w-[90vw] lg:w-[80vw] xsm:pl-[12vw] lg:pl-0 lg:m-auto !mt-[15vh]">
      {/* Locations */}
      <div className="lg:w-[30vw] flex-col  pt-2 gap-y-4  p-2">
        {/* <div className="text-lg font-bold ">Sun Mobiles</div> */}
        <div className="pt-2 flex gap-y-2 gap-x-2 xsm:text-sm flex-col ">
          {footersData.map((res, index) => {
            return (
              <div
                key={index}
                className="flex gap-x-2 items-start justify-start"
              >
                <div>{res.icon}</div>
                <div className="font-bold hover:text-[--third-color] cursor-pointer">
                  {res.title}:
                </div>
                <div className="text-md lg:w-[15vw]">{res.subTitle}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Tours */}
      <div className="lg:w-[20vw] flex-col  items-center pt-2 gap-y-4  p-2">
        <div className="text-lg font-bold hover:text-[--third-color] cursor-pointer">
          Website Tour
        </div>
        <div className="pt-2 flex gap-y-2 flex-col  ">
          {["Home", "Categories", "Profile", "Orders", "Abous us"].map(
            (res, index) => {
              return (
                <div key={index} className="flex gap-x-2 items-start">
                  <div className="hover:text-[--third-color] cursor-pointer font-normal">
                    {res}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      {/* follow */}
      <div className="lg:w-[20vw] flex-col items-center pt-2 gap-y-4  p-2">
        <div className="text-lg font-bold h-[5vh]">Follow Us</div>
        <div className="pt-2 flex gap-y-2 flex-col h-[20vh] ">
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <FacebookOutlined className="group-hover:text-[#1673eb] " />
            <h1 className="text-md">Facebook</h1>
          </div>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <InstagramOutlined className="group-hover:text-[#f40873] " />
            <h1 className="text-md">Instagram</h1>
          </div>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <TwitterOutlined className="group-hover:text-[#1c96e8] " />
            <h1 className="text-md">Twitter</h1>
          </div>
          <div className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <WhatsAppOutlined className="group-hover:text-[#1ad03f] " />
            <h1 className="text-md">Whatsapp</h1>
          </div>
          <div className="group invisible hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2">
            <WhatsAppOutlined className="group-hover:text-[#1ad03f] " />
            <h1 className="text-md">Whatsapp</h1>
          </div>
        </div>
      </div>
      {/* React Us */}
      <div className="lg:w-[20vw] flex-col items-center pt-2 gap-y-4  p-2">
        <div className="text-lg font-bold h-[5vh]">Reach Us</div>
        <div className="pt-2 flex gap-y-2 flex-col h-[20vh] ">
          <div className="cursor-pointer flex flex-row items-center gap-x-2">
            <Image
              src="/assets/tags/app-store.avif"
              width={90}
              height={90}
              alt="logo"
              className="pb-2 "
            />
            <Image
              src="/assets/tags/google-play.avif"
              width={90}
              height={90}
              alt="logo"
              className="pb-2 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFooters;
