import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Pagination, FreeMode, Autoplay } from "swiper";
import { useRouter } from "next/router";
import { Image, notification } from "antd";
import { getAllCatagory } from "../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";

function Categories() {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const fetchData = async () => {
    try {
      const result = await getAllCatagory();
      setCategory(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[80vw] pt-4 m-auto">
      <div className="xsm:text-sm md:text-lg xl:text-2xl font-bold text-[--second-color] flex justify-between items-center">
        <div>Featured Categories</div>
        <Link href="/products">View all</Link>
      </div>
      <div className="">
        <Swiper
          freeMode={true}
          autoplay={true}
          modules={[FreeMode, Pagination, Autoplay]}
          className="!bg-white !flex !flex-row  !items-center !justify-center !p-10 !h-fit !px-10"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1220: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {category.map((data, i) => {
            return (
              <SwiperSlide
                key={i}
                onClick={() => {
                  router.push({
                    pathname: "/allCat",
                    query: { cat_id: data._id },
                  });
                }}
              >
                <div className="card xl:w-[12vw] h-[250px]  bg-base-100 xsm:shadow-sm xl:shadow-xl flex items-center justify-center  cursor-pointer">
                  <figure className="px-10 pt-10  flex flex-col items-center">
                    <Image
                      src={data.image}
                      width={100}
                      height={100}
                      className="rounded-xl h-[10vh] w-fit self-center  hover:scale-110 duration-1000"
                      alt="logo"
                      preview={false}
                    />
                  </figure>
                  <div className="card-body items-center text-center ">
                    <div className="flex flex-col items-center">
                      <div className="text-lg text-slate-500 capitalize">
                        {data.name}
                      </div>
                      {/* <div className="text-sm  text-slate-300">12 Items</div> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Categories;
