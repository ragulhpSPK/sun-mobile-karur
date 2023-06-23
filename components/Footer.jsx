import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import { getDashProfile, getAllproducts } from "../helper/utilities/apiHelper";
import { get } from "lodash";
import { useRouter } from "next/router";

function Footer() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = [await getDashProfile(), await getAllproducts()];

      setData(get(result[0], "data.data"));
      setProducts(get(result[1], "data.data"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTopProducts(
      products.filter((data) => {
        return data.status === true;
      })
    );
  }, [products]);

  console.log(data, "ooookj");

  return (
    <div
      className="  w-[100vw] mt-20  pt-2"
      style={{
        backgroundColor: get(data, "[0].footercolor", ""),
        color: "white",
      }}
    >
      {/* <div className="w-[100vw] m-auto px-[5vw]">
        <p>Top products</p>
        <div className="flex flex-wrap gap-x-1 gap-y-1">
          {topProducts.map((data) => {
            return (
              <>
                <div className=" text-sm !capitalize cursor-pointer !font-serif text-ellipsis overflow-hidden">
                  {data.title.slice(0, 30)}.... &nbsp; |
                </div>
              </>
            );
          })}
        </div>
      </div> */}

      <div className="grid xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 xsm:gap-x-[20px] pt-[2vh]  xsm:gap-y-[20px] xl:gap-x-40 w-[100vw] px-[5vw] m-auto border-b border-gray-400 pb-5">
        <div className="flex flex-col gap-2 xsm:text-[12px] lg:text-md font-medium xl:text-[14px] md:w-[15vw]">
          <h1 className="lg:text-2xl cursor-pointer xsm:text-xl xxl:text-2xl font-semibold pb-2">
            Flash Deals
          </h1>
          {products
            .filter((data, i) => {
              return data.flashStatus === true;
            })
            .slice(0, 10)
            .map((res, i) => {
              return (
                <p
                  className="hover:text-[--third-color] hover:font-semibold cursor-pointer"
                  key={i}
                  onClick={() =>
                    router.push({
                      pathname: `/product/${res._id}`,
                      query: { id: res._id },
                    })
                  }
                >
                  {res.title.split("(")[0]}
                </p>
              );
            })}

          {/* <p className="hover:text-[--third-color] hover:font-semibold">
            Payment Methods
          </p> */}
          {/* <p className="hover:text-[--third-color] hover:font-semibold">
            Free Shipping
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Return & Refund
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Sun Guarantee
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            OverSeas Products
          </p>
          <p className="hover:text-[--third-color] hover:font-semibold">
            Contact Us
          </p> */}
        </div>

        <div className="flex flex-col gap-2 xsm:text-[12px] lg:text-md font-medium xl:text-[14px] md:w-[15vw] ">
          <h1 className="lg:text-2xl cursor-pointer xsm:text-xl xxl:text-2xl font-semibold pb-2 text-ellipsis overflow-hidden">
            Best Deals
          </h1>
          {products
            .filter((data, i) => {
              return data.bestStatus === true;
            })
            .slice(0, 10)
            .map((res, i) => {
              return (
                <p
                  className="hover:text-[--third-color] hover:font-semibold cursor-pointer"
                  key={i}
                  onClick={() =>
                    router.push({
                      pathname: `/product/${res._id}`,
                      query: { id: res._id },
                    })
                  }
                >
                  {res.title.split("(")[0]}
                </p>
              );
            })}
        </div>
        <div className="flex flex-col pl-5 xsm:text-[12px] xl:text-[14px] gap-2 text-md font-medium md:w-[15vw]">
          <h1 className="lg:text-2xl xsm:text-xl xxl:text-2xl font-semibold pb-2 cursor-pointer">
            About
          </h1>
          <Link href="/footers/About">
            <p className="hover:text-[--third-color] hover:font-semibold cursor-pointer">
              About Us
            </p>
          </Link>

          <Link href="/Allbestdeals">
            <p className="hover:text-[--third-color] hover:font-semibold">
              Best Deals
            </p>
          </Link>
          <Link
            href="flashDeals"
            className="hover:text-[--third-color] hover:font-semibold"
          >
            Flash Deals
          </Link>
          <Link
            href="/allCat?_id=123"
            className="hover:text-[--third-color] hover:font-semibold"
          >
            Categories
          </Link>
        </div>

        <div className="flex flex-col  xsm:text-[12px] xl:text-[14px] gap-2 text-md font-medium md:w-[15vw]">
          <h1 className="lg:text-2xl xsm:text-xl xxl:text-2xl font-semibold pb-2 cursor-pointer">
            Contact US
          </h1>

          {data.map((data, i) => {
            return (
              <div key={i} className="flex flex-col gap-3">
                <p className="hover:text-[--third-color] cursor-pointer hover:font-bold">
                  name:{data.name}
                </p>
                <p className="hover:text-[--third-color] cursor-pointer hover:font-bold">
                  Address:{data.address}
                </p>
                <p className="hover:text-[--third-color] cursor-pointer hover:font-bold">
                  Email:{data.email}
                </p>
                <p className="hover:text-[--third-color] cursor-pointer hover:font-bold">
                  Call Us:{data.number}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col xsm:text-[12px]  xl:text-[14px] gap-2 text-md font-medium md:w-[15vw]">
          <h1 className="lg:text-2xl xsm:text-xl xxl:text-2xl font-semibold pb-2 cursor-pointer">
            Follow Us
          </h1>
          <a
            href={data[0]?.fblink}
            target="_blank"
            className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2"
          >
            <FacebookIcon className="group-hover:text-[#1673eb] " />
            <h1 className="text-md">Facebook</h1>
          </a>
          <a
            href={data[0]?.inlink}
            target="_blank"
            className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2"
          >
            <InstagramIcon className="group-hover:text-[#f40873] " />
            <h1 className="text-md">Instagram</h1>
          </a>
          <a
            href={data[0]?.twlink}
            target="_blank"
            className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2"
          >
            <TwitterIcon className="group-hover:text-[#1c96e8] " />
            <h1 className="text-md">Twitter</h1>
          </a>
          <a
            href={data[0]?.wplink}
            target="_blank"
            className="group hover:font-semibold cursor-pointer flex flex-row items-center gap-x-2"
          >
            <WhatsAppIcon className="group-hover:text-[#1ad03f] " />
            <h1 className="text-md">Whatsapp</h1>
          </a>
        </div>
        <div className="flex flex-col xsm:text-[12px]  xl:text-[14px] gap-2 text-md font-medium">
          <h1 className="lg:text-2xl xsm:text-xl xxl:text-2xl font-semibold pb-2">
            Sun App Download
          </h1>
          <p className="hover:text-[--third-color]  hover:font-semibold cursor-pointer">
            Google play
          </p>
        </div>
      </div>
      <div>
        <div className="w-[80vw] m-auto pt-10">
          <div className="text-center">
            <span className="text-2xl">&#169;</span> Sun All Rights reserved
            2023
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
