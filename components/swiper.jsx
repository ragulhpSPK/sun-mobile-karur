/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { getAllBanner } from "../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get, set } from "lodash";
import { Carousel, Spin } from "antd";
// import Home from "../pages/index"
import { useRouter } from "next/router";
import { showLoader, hideLoader } from "@/redux/loadingSlice";
import { useDispatch } from "react-redux";

export default function Swipper({ setLoading }) {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      dispatch(showLoader());
      const result = await getAllBanner();
      setBanner(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let left = banner.filter((data) => {
    return data.status === "Left";
  });

  let top = banner.filter((data) => {
    return data.status === "Top";
  });

  let bottom = banner.filter((data) => {
    return data.status === "Bottom";
  });

  return (
    <div className="flex xsm:flex-col xl:flex-row  gap-x-1 xsm:pt-[10vh] lg:mt-[10vh]  m-auto xsm:!w-[90vw] xl:!w-[80vw]">
      {/* left */}
      <Carousel
        fade
        autoplay
        dotPosition="right"
        className="xl:!w-[60vw] xl:!h-[40vh] xsm:!w-[90vw] sm:h-[22vh] xsm:h-[16vh]"
      >
        {left.map((data, i) => {
          return (
            <div className="cursor-pointer " key={i}>
              <Image
                src={data.image}
                width={100}
                height={100}
                alt="logo"
                className="xl:!w-[60vw] xsm:!w-[90vw] xl:h-[40vh] sm:h-[22vh] xsm:h-[16vh]"
              />
            </div>
          );
        })}
      </Carousel>

      {/* right */}
      <div className="xl:!w-[30vw] xsm:w-[90vw]  xl:h-[40vh] xsm:h-[12vh] sm:h-[22vh] justify-between flex xl:flex-col ">
        <div>
          {top.map((data, i) => {
            return (
              <div className="cursor-pointer " key={i}>
                <Image
                  src={data.image}
                  width={100}
                  height={100}
                  alt="logo"
                  className="xl:!w-[30vw] xsm:w-[44.9vw] xsm:h-[10vh] sm:h-[16vh] xl:h-[19.8vh] "
                />
              </div>
            );
          })}
        </div>
        <div>
          {bottom.map((data, i) => {
            return (
              <div className="cursor-pointer " key={i}>
                <Image
                  src={data.image}
                  width={100}
                  height={100}
                  alt="logo"
                  className="xl:w-[30vw] xsm:w-[44.9vw] xsm:h-[10vh] sm:h-[16vh] xl:h-[19.8vh] "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
