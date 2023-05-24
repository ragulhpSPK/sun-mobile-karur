import { Avatar, Badge, Divider, Image, List } from "antd";
import React from "react";
import { getAllOrder } from "@/helper/utilities/apiHelper";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { get } from "lodash";

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
    <div className="bg-[#ecf0f1] h-fit overflow-y-scroll w-screen xsm:p-[3vw]">
      <div className=" p-[10px] rounded-md  w-[90%]  overflow-y-scroll">
        <h1 className="text-black xsm:text-[22px] sm:text-[32px] text-center p-[2vh] ">
          My Orders
        </h1>
      </div>

      <div className="flex flex-col m-auto gap-[2vw]  items-center justify-center pt-[1vh]">
        {orders.map((data, index) => {
          return (
            <div
              className=" m-auto shadow shadow-slate bg-[#E5E9EA] p-[4vh] md:!w-[50vw] xl:w-[50vw] flex flex-col items-center justify-center"
              key={index}
              onClick={() => {
                router.push({
                  pathname: `/orders/${data._id}`,
                  query: { id: data._id },
                });
              }}
            >
              <div className="flex  gap-[2vw] pt-[2vh]">
                <div className="sm:text-sm md:text-md xl:text-xl flex flex-row-reverse gap-[2vw]">
                  <div className="flex flex-col gap-[5vh] ">
                    {data.productname.map((name, i) => {
                      return (
                        <p className="text-slate-600 " key={i}>
                          {name},
                        </p>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-[2vh]">
                    {data.image.map((image, i) => {
                      return (
                        <div key={i}>
                          <Image
                            src={image || image[0]}
                            width={70}
                            height={70}
                            alt="img"
                            className="rounded-full shadow-lg shadow-slate-300 p-2"
                          />

                          {/* <Avatar src={image || image[0]}></Avatar> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-start">
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
