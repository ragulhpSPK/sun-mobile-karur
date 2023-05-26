import { Avatar, Badge, Divider, Image, List } from "antd";
import React from "react";
import { getAllOrder } from "@/helper/utilities/apiHelper";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { get, result } from "lodash";

function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllOrder();

      setOrders(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#ecf0f1] h-fit overflow-y-scroll w-screen xsm:p-[3vw] xsm:mt-[10vh] sm:mt-[15vh] xl:mt-0 xl:pt-[15vh]">
      <div className=" p-[10px] rounded-md  w-[90%]  overflow-y-scroll">
        <h1 className="text-black xsm:text-[18px] sm:text-[32px] text-center p-[2vh] ">
          My Orders
        </h1>
      </div>

      <div className="flex flex-col  gap-[2vw]    pt-[1vh]">
        {orders.map((data, index) => {
          console.log(data);
          return (
            <div
              className=" m-auto e  px-[4vh] xsm:!w-[90vw] md:!w-[100vw] xl:!w-[70vw] flex flex-col "
              key={index}
              onClick={() => {
                router.push({
                  pathname: `/orders/${data._id}`,
                  query: { id: data._id },
                });
              }}
            >
              <div className="flex  gap-[2vw] pt-[2vh]">
                <div className="xsm:text-[12px] sm:text-sm md:text-md xl:text-xl flex flex-row-reverse justify-center items-center gap-[2vw]">
                  <div className="flex flex-col items-center justify-center gap-[5vh] w-[70vw] m-auto">
                    {data.productname.map((name, i) => {
                      return (
                        <div
                          key={i}
                          className=" xsm:w-[90vw] sm:w-[70vw]  flex items-center justify-center"
                        >
                          <div className="flex flex-row-reverse items-center justify-end pl-[2vw] gap-5 bg-[#E5E9EA] xsm:!w-[90vw] xsm:px-[3vw]  sm:w-[50vw] xsm:p-[6vw] sm:p-[4vh]  m-auto">
                            <p className="text-slate-600 ">{name},</p>
                            <div>
                              <Image
                                src={data.image[i]}
                                alt="ordered image"
                                height={50}
                                width={50}
                                className="!h-[8vh] !w-fit"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-slate-600 pt-2">
                  <Badge dot color="green" className="!text-xl" />
                  <span className="pl-[3px] sm:text-sm md:text-md xl:text-xl tracking-wider">
                    {data.status} On Thu,sep 28,2019
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
