import React from "react";
import { ClockCircleOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Button, Timeline, Image, Steps, notification, Badge } from "antd";
import { useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";
import {
  getAllCart,
  getAllOrder,
  updateOrder,
} from "@/helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";
import moment from "moment";

function Orders() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [steps, setSteps] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getAllOrder();
      setProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const status = products.map((data) => {
    return data.status;
  });

  const handleClick = async (id, data) => {
    if (status !== "Delivered") {
      try {
        const formData = {
          status: "Cancelled",
          id: id,
        };
        await updateOrder(formData);
        fetchData();
        notification.success({ message: "You cancel Your Order" });
      } catch (err) {
        console.log(err);
        notification.error({ message: "something went wrong" });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 1024 ? setSteps(true) : setSteps(false);
    });
    window.innerWidth > 1024 ? setSteps(true) : setSteps(false);
  }, [steps]);

  return (
    // <div className="flex flex-col gap-[5vh] justify-around mt-[5vh] steps:!w-[100vw] steps:px-[1vw]  xl:!w-[70vw] xl:p-[5vw] xl:m-auto min-h-[70vh]">
    //   {products
    //     .filter((data) => {
    //       return data._id === router.query.id;
    //     })
    //     .map((res, i) => {
    //       return (
    //         <>
    //           <div
    //             className="pt-[3vh] xsm:!w-[90vw] sm:!pt-[10vh] md:pt-0 md:py-[5vh]  xsm:self-center xsm:pl-[2vw] xl:pl-0 steps:!w-[100vw]  xl:!w-[80vw] flex items-center justify-center xl:p-[4vw]"
    //             key={i}
    //           >
    //             <div
    //               className={`${
    //                 res.status === "Cancelled" ? "!hidden" : "!block"
    //               } pt-[3vh] lg:pr-[2vw] xsm:!w-[90vw] lg:shadow-lg  sm:!pt-[10vh] md:pt-0 md:py-[5vh]  xsm:self-center xsm:pl-[5vw] xl:pl-0 steps:!w-[100vw] xl:!w-[80vw] flex items-center justify-center xl:p-[4vw]`}
    //             >
    //               <Steps
    //                 className={` xxl:pl-[3vw] `}
    //                 size="small"
    //                 direction={`${steps ? "horizontal" : "vertical"}`}
    //                 lineWidth={1}
    //                 items={[
    //                   {
    //                     title: "Confirmed",
    //                     status:
    //                       res.status === "Confirmed" ? "process" : "finish",
    //                     icon: (
    //                       <DoneIcon
    //                         style={{ fontSize: "30px" }}
    //                         className=" text-[--third-color] "
    //                       />
    //                     ),
    //                   },
    //                   {
    //                     title: "Order Shipped",
    //                     status:
    //                       res.status === "Out_For_Delivery"
    //                         ? "finish"
    //                         : res.status === "Delivered"
    //                         ? "finish"
    //                         : "process",
    //                     icon: (
    //                       <CodeSandboxOutlined
    //                         style={{ fontSize: "30px" }}
    //                         className="text-[--third-color]"
    //                       />
    //                     ),
    //                   },
    //                   {
    //                     title: "Order out for delivery",
    //                     status:
    //                       res.status === "Delivered" ? "finish" : "process",
    //                     icon: (
    //                       <LocalShippingIcon
    //                         style={{ fontSize: "30px" }}
    //                         className="text-[--third-color]"
    //                       />
    //                     ),
    //                   },

    //                   {
    //                     title: "Order Delivered",
    //                     status: "finish",

    //                     icon: (
    //                       <HomeRoundedIcon
    //                         style={{ fontSize: "30px" }}
    //                         className="text-[--third-color]"
    //                       />
    //                     ),
    //                   },
    //                 ]}
    //                 responsive={true}
    //               />
    //             </div>
    //           </div>

    //           <div className="flex flex-col items-center">
    //             <div className="flex flex-col xsm:!w-[90vw] px-[1vw] lg:shadow-lg  gap-[15px] bg-white p-1  xsm:self-center  steps:!w-[100vw] xl:!w-[75vw]">
    //               <div className="flex xsm:flex-col  md:flex-row xsm:items-center  xsm:!justify-between">
    //                 <h1 className="xsm:text-[16px] md:text-3xl text-[--text-primary]">
    //                   Purchased Items
    //                 </h1>
    //                 {res.status === "Delivered" ? (
    //                   <p className="xsm:text-[14px] xsm:!pt-1  lg:text-xl text-[--text-secondary] lg:mt-10    flex items-center justify-center">
    //                     <span>
    //                       <DoneIcon className="bg-[green]  rounded-3xl xsm:!h-[16px] xsm:!w-[16px] lg:!h-[26px] lg:!w-[26px] lg:!text-sm text-white" />
    //                       Order Reached You SuccessFully!
    //                     </span>
    //                   </p>
    //                 ) : res.status === "Cancelled" ? (
    //                   <p className="xsm:text-[12px] lg:text-3xl   text-red-500    flex items-center justify-center">
    //                     <span>
    //                       <CancelIcon className="bg-red-500 rounded-3xl xsm:!h-[16px] xsm:!w-[16px] lg:!h-[26px] lg:!w-[26px] lg:!text-sm text-white" />
    //                       <span className="">Order Cancelled</span>
    //                     </span>
    //                   </p>
    //                 ) : (
    //                   <button
    //                     className="bg-red-500 !text-white p-[5px] xsm:mb-[8px] xl:mb-0 xsm:w-[40vw] xl:!h-[5vh] md:w-[20vw] xl:w-[9vw] lg:h-[7vh] rounded-md"
    //                     onClick={() => {
    //                       handleClick(res._id, res);
    //                     }}
    //                   >
    //                     Cancel Order
    //                   </button>
    //                 )}
    //               </div>
    //               <div className="flex  w-[70vw] xsm:pl-[15vw] md:pl-0 flex-wrap xsm:gap-x-10 md:gap-x-6 xl:gap-x-10 gap-y-20 xsm:items-center xsm:justify-center">
    //                 {res.image.map((img, i) => {
    //                   return (
    //                     <div
    //                       className="xxl:!w-[13vw] xsm:!w-[40vw] sm:!w-[20vw] md:w-[10vw] lg:min-h-[20vh]  flex  shadow-2xl rounded-box items-center justify-center flex-col h-[15vh]"
    //                       key={i}
    //                     >
    //                       <div>
    //                         <Image
    //                           src={img || img[0]}
    //                           alt="order"
    //                           width={70}
    //                           height={70}
    //                           preview={false}
    //                           className="!w-fit m-auto"
    //                         />
    //                       </div>
    //                       <p className="text-2xl text-slate-600">
    //                         &#8377;{res.price[i]}
    //                       </p>
    //                     </div>
    //                   );
    //                 })}
    //               </div>
    //               <h1
    //                 className={`xsm:text-md md:text-xl xl:text-3xl pt-[5px] text-[--text-secondary] xsm:text-center ${
    //                   res.total === null ? "hidden" : "block"
    //                 }`}
    //               >
    //                 Total Price:&#8377;{res.total}
    //               </h1>
    //               <div className="text-[--text-secondary] xsm:text-[12px] lg:text-2xl flex items-center justify-center">
    //                 <Badge
    //                   dot
    //                   color={`${res.status === "Cancelled" ? "red" : "green"}`}
    //                   size="large"
    //                   className="!text-2xl pr-1 xsm:pb-[1vh]"
    //                 />
    //                 {res.status} on {moment(res.updatedAt).format("LLLL")}
    //               </div>
    //             </div>
    //           </div>
    //         </>
    //       );
    //     })}
    // </div>

    <div className="pt-[10vh] xsm:w-[100vw] md:w-[80vw] m-auto md:shadow-md">
      {products
        .filter((data) => {
          return data._id === router.query.id;
        })
        .map((res, i) => {
          return (
            <div
              className="flex flex-col md:flex-row justify-between md:px-10 pt-[4vh] md:h-[80vh]"
              key={i}
            >
              <div className="w-screen md:w-[30vw] relative flex flex-col gap-5 pl-[15vw] md:pl-0">
                <h1 className="pl-12 text-[22px] font-bold text-[--text-primary]">
                  Order Tracking
                </h1>
                <Steps
                  className={` xxl:pl-[3vw] `}
                  size="small"
                  direction="vertical"
                  lineWidth={1}
                  items={[
                    {
                      title: "Confirmed",
                      status: res.status === "Confirmed" ? "process" : "finish",
                      icon: (
                        <DoneIcon
                          style={{ fontSize: "30px" }}
                          className=" text-[--third-color] "
                        />
                      ),
                    },
                    {
                      title: "Order Shipped",
                      status:
                        res.status === "Out_For_Delivery"
                          ? "finish"
                          : res.status === "Delivered"
                          ? "finish"
                          : "process",
                      icon: (
                        <CodeSandboxOutlined
                          style={{ fontSize: "30px" }}
                          className="text-[--third-color]"
                        />
                      ),
                    },
                    {
                      title: "Order out for delivery",
                      status: res.status === "Delivered" ? "finish" : "process",
                      icon: (
                        <LocalShippingIcon
                          style={{ fontSize: "30px" }}
                          className="text-[--third-color]"
                        />
                      ),
                    },

                    {
                      title: "Order Delivered",
                      status: "finish",

                      icon: (
                        <HomeRoundedIcon
                          style={{ fontSize: "30px" }}
                          className="text-[--third-color]"
                        />
                      ),
                    },
                  ]}
                  responsive={true}
                />
                <div className="flex items-center justify-center absolute bottom-16 xxl:left-14">
                  {res.status === "Delivered" ? (
                    <p className="xsm:text-[14px] xsm:!pt-1  lg:text-xl text-[--text-secondary] lg:mt-10  flex items-center justify-center">
                      <span className="flex gap-2 items-center justify-center">
                        <DoneIcon className="bg-[green]  rounded-3xl xsm:!h-[16px] xsm:!w-[16px] lg:!h-[26px] lg:!w-[26px] lg:!text-sm text-white" />
                        <span className="text-md">
                          Order Reached You SuccessFully!
                        </span>
                      </span>
                    </p>
                  ) : res.status === "Cancelled" ? (
                    <p className="xsm:text-[12px] lg:text-3xl   text-red-500    flex items-center justify-center">
                      <span className="flex gap-2 items-center justify-center">
                        <CancelIcon className="bg-red-500 rounded-3xl  xsm:!h-[16px] xsm:!w-[16px] lg:!h-[26px] lg:!w-[26px] lg:!text-sm text-white" />
                        <span className="text-md">Order Cancelled</span>
                      </span>
                    </p>
                  ) : (
                    <button
                      className="bg-red-500 !text-white p-[5px] xsm:mb-[8px] xl:mb-0 xsm:w-[40vw] xl:!h-[4vh] md:w-[20vw] xl:w-[9vw] lg:h-[7vh] rounded-md"
                      onClick={() => {
                        handleClick(res._id, res);
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
              <div className="md:w-[45vw] w-screen h-[65vh] overflow-y-scroll px-2">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between text-[12px] text-[--text-secondary] sm:text-sm xl:text-xl font-medium  md:pl-3">
                    <p>Image</p>
                    <p>Title</p>
                    <p>Total Price:&#8377;{res.total}</p>
                  </div>
                  {res.image.map((img, i) => {
                    return (
                      <div
                        key={i}
                        className="!h-[5vh] !mt-12 flex  justify-between items-center border-b pb-20 text-[--text-secondary] text-[12px] sm:text-sm xl:text-xl border-b-slate-100"
                      >
                        <Image
                          alt="no image"
                          src={img || img[0]}
                          width={100}
                          height={100}
                          className="rounded-lg"
                          preview={false}
                        />
                        <p className="w-[20vw]">
                          <span className="text-ellipsis  overflow-hidden line-clamp-2">
                            {res.productname[i]}
                          </span>
                        </p>
                        <p className="flex gap-x-14">&#8377;{res.price[i]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Orders;
