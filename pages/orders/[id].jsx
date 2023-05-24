import React from "react";
import { ClockCircleOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Button, Timeline, Image, Steps, notification } from "antd";
import styles from "../../styles/Home.module.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
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

function Orders() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

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

  console.log();

  return (
    <div className="flex flex-col gap-[5vh] justify-around mt-[5vh] steps:!w-[100vw] steps:px-[1vw]  xl:!w-[70vw] xl:p-[5vw] xl:m-auto min-h-[70vh]">
      {products
        .filter((data) => {
          return data._id === router.query.id;
        })
        .map((res, i) => {
          return (
            <>
              <div
                className="pt-[3vh] xsm:!w-[90vw] sm:!pt-[10vh] md:pt-0 md:py-[5vh]  xsm:self-center xsm:pl-[2vw] xl:pl-0 steps:!w-[100vw] xl:!w-[70vw] flex items-center justify-center xl:p-[4vw]"
                key={i}
              >
                {console.log(res.status, "tfghbjnm")}
                <div
                  className={`${
                    res.status === "Cancelled" ? "!hidden" : "!block"
                  } pt-[3vh] xsm:!w-[90vw] sm:!pt-[10vh] md:pt-0 md:py-[5vh]  xsm:self-center xsm:pl-[5vw] xl:pl-0 steps:!w-[100vw] xl:!w-[70vw] flex items-center justify-center xl:p-[4vw]`}
                  id={styles.shadow3}
                >
                  <Steps
                    className={` xxl:pl-[3vw] `}
                    size="small"
                    lineWidth={1}
                    items={[
                      {
                        title: "Confirmed",
                        status:
                          res.status === "Confirmed" ? "process" : "finish",
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
                        status:
                          res.status === "Delivered" ? "finish" : "process",
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
                </div>
              </div>

              <div className="flex flex-col ">
                <div
                  className="flex flex-col xsm:!w-[90vw]  gap-[15px] bg-white p-[5vh] xsm:self-center  steps:!w-[100vw] xl:!w-[70vw]"
                  id={styles.shadow3}
                >
                  <div className="flex xsm:flex-col  md:flex-row xsm:items-center  xsm:!justify-between">
                    <h1 className="xsm:text-[16px] md:text-2xl p-4">
                      Purchased Item
                    </h1>
                    {res.status === "Delivered" ? (
                      <p className="text-3xl text-slate-600 mt-10 flex items-center justify-center">
                        <DoneIcon className="bg-[green] rounded-3xl h-[30px] w-[30px] text-white" />

                        <span>Order Reached You SuccessFully!</span>
                      </p>
                    ) : res.status === "Cancelled" ? (
                      <p className="text-3xl text-slate-600 mt-10 flex items-center justify-center">
                        <span className="tracking-wider xsm:text-xl sm:text-2xl md:text-4xl pl-2 ">
                          Order Cancelled
                        </span>
                        <CancelIcon className="bg-red-500 rounded-3xl md:h-[30px] md:w-[30px] text-white" />
                      </p>
                    ) : (
                      <button
                        className="bg-red-600 !text-white p-[5px] xsm:mb-[8px] xl:mb-0 xsm:w-[40vw] xl:!h-[5vh] md:w-[20vw] xl:w-[9vw] lg:h-[7vh] rounded-md"
                        onClick={() => {
                          handleClick(res._id, res);
                        }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  <div className="flex  w-[70vw] flex-wrap xsm:gap-x-10 md:gap-x-6 xl:gap-x-10 gap-y-20 xsm:items-center xsm:justify-center">
                    {res.image.map((img, i) => {
                      console.log(img, "dki");
                      return (
                        <div
                          className="xxl:!w-[10vw] xsm:!w-[40vw] sm:!w-[20vw] md:w-[10vw] lg:min-h-[20vh]  flex  shadow-2xl rounded-box items-center justify-center flex-col h-[15vh]"
                          key={i}
                        >
                          <div>
                            <Image
                              src={img || img[0]}
                              alt="order"
                              width={70}
                              height={70}
                              preview={false}
                            />
                          </div>
                          <p className="text-2xl text-slate-600">
                            &#8377;{res.price[i]}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <h1
                    className={`xsm:text-md md:text-xl xl:text-3xl pt-[5px] text-slate-600 xsm:text-center ${
                      res.total === null ? "hidden" : "block"
                    }`}
                  >
                    Total Price:{res.total}
                  </h1>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Orders;
