import { Avatar, Badge, Divider, Image, List, Spin } from "antd";
import React from "react";
import { getAllOrder } from "@/helper/utilities/apiHelper";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { get } from "lodash";
import moment from "moment/moment";
import { showLoader, hideLoader } from "@/redux/loadingSlice";
import { useSelector } from "react-redux";
import { ReloadOutlined } from "@ant-design/icons";

function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const isLoading = useSelector((state) => state.loader.isLoading);

  const fetchData = async () => {
    try {
      showLoader();
      const result = await getAllOrder();
      setOrders(get(result, "data.data"));
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const antIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  console.log(orders, "ooo");

  return (
    <Spin
      spinning={isLoading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div className="bg-[#ecf0f1] xsm:h-[90vh] sm:!h-[88vh] overflow-x-hidden overflow-y-scroll w-screen md:w-[80vw] xsm:p-[3vw] xsm:mt-[10vh]  xl:mt-0 xl:pt-[10vh]">
        {orders && orders.length === 0 ? (
          <div
            className={`${
              isLoading === true ? "hidden" : "flex"
            } text-center !pt-[15vh] animate-pulse text-[--text-secondary]  text-5xl flex flex-col sm:flex-row items-center justify-center`}
          >
            <div>
              <Image
                src="/assets/orders2.png"
                alt="no image"
                width={150}
                height={130}
                preview={false}
              />
            </div>
            <div className="text-slate-600">No orders found</div>
          </div>
        ) : (
          <div className="xsm:w-[100vw] md:w-[60vw] m-auto">
            <div className="flex justify-between items-center text-[--text-secondary] xl:text-[22px] font-bold p-5">
              <h1 className="xl:pl-10">Image</h1>
              <h1>Product Name</h1>
              <h1 className="sm:pr-8">Order Status</h1>
            </div>
            {orders.map((data, i) => {
              console.log(data, "POOO");
              return (
                <div
                  className="flex justify-between items-center pt-5  xl:p-10"
                  key={i}
                >
                  <div className="bg-[#E5E9EA] flex justify-center items-center gap-4 sm:gap-28 md:gap-8 xxl:gap-28 xl:p-10">
                    <div className="flex flex-col  gap-5 ">
                      {data.image.map((img, i) => {
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-center gap-4 text-[--text-secondary] sm:gap-[8vw] xxl:gap-[15vw] cursor-pointer"
                            onClick={() => {
                              router.push({
                                pathname: `/orders/${data._id}`,
                                query: { id: data._id },
                              });
                            }}
                          >
                            <Image
                              src={img || img[i]}
                              alt="no found"
                              width={80}
                              height={80}
                              preview={false}
                            />
                            <h1 className="w-[25vw]" key={i}>
                              <span className="text-ellipsis overflow-hidden font-bold md:font-medium text-[10px] sm:text-[16px]  md:pr-5 line-clamp-2 xl:text-lg ">
                                {data.productname[i]}
                              </span>
                            </h1>
                          </div>
                        );
                      })}
                    </div>
                    <h1 className="font-bold md:font-medium text-[10px] sm:text-[16px]  xl:text-lg pr-2 md:p-2 xl:pr-5">
                      <span>
                        {data.status} on {moment(data.updatedAt).format("LLLL")}
                      </span>
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Spin>
  );
}

export default Orders;
