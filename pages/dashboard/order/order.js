import React, { useEffect, useState } from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";
import { Form, Select, Table, notification } from "antd";
import {
  getDashBoardOrder,
  updateOrder,
} from "../../../helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";

function Order() {
  const [order, setOrder] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const statusSet = [
    "Confirmed",
    "Shipped",
    "Out_For_Delivery",
    "Delivered",
    "Cancelled",
  ];

  const fetchData = async () => {
    try {
      const result = await getDashBoardOrder();
      setOrder(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeStatus = async (e, id) => {
    try {
      const formData = {
        status: e,
        id: id._id,
      };
      await updateOrder(formData);
      notification.success({ message: "status updated successfully" });
      fetchData();
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const handleConfirm = () => {
    console.log(order, "dk");
    setDataSource(
      order.filter((data) => {
        return data.status === "Confirmed";
      })
    );
  };
  const handleShipped = () => {
    console.log(order, "dk");
    setDataSource(
      order.filter((data) => {
        return data.status === "Shipped";
      })
    );
  };
  const handleOutForDelivery = () => {
    console.log(order, "dk");
    setDataSource(
      order.filter((data) => {
        return data.status === "Out_For_Delivery";
      })
    );
  };
  const handleDelivered = () => {
    setDataSource(
      order.filter((data) => {
        return data.status === "Delivered";
      })
    );
  };
  const handleCancelled = () => {
    console.log(order, "dk");
    setDataSource(
      order.filter((data) => {
        return data.status === "Cancelled";
      })
    );
  };

  console.log(
    order.filter((data) => {
      return data.status === "Cancelled";
    }).length
  );

  const columns = [
    {
      title: "CustomerId",
      dataindex: "CustomerId",
      key: "CustomerId",
      render: (name) => {
        return <p className="text-[16px]">{name.customerId}</p>;
      },
    },
    {
      title: "Customer Name",
      dataindex: "customer",
      key: "customer",
      render: (name) => {
        return <p className="text-[16px]">{name.customer}</p>;
      },
    },
    {
      title: "Address",
      dataindex: "address",
      key: "address",
      render: (name) => {
        return <p className="text-[16px]">{name.address}</p>;
      },
    },
    {
      title: "number",
      dataindex: "number",
      key: "number",
      render: (name) => {
        return <p className="text-[16px]">{name.number}</p>;
      },
    },
    {
      title: "alternateNumber",
      dataindex: "alternateNumber",
      key: "alternateNumber",
      render: (name) => {
        return <p className="text-[16px]">{name.alternateNumber}</p>;
      },
    },
    {
      title: "Total Price",
      dataindex: "total",
      key: "total",
      render: (name) => {
        return <p className="text-[16px]">{name.total}</p>;
      },
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (name, id) => {
        if (name === "Cancelled") {
          return (
            <div className="bg-red-500 xl:w-[8vw] text-center p-3 text-white rounded">
              {name}
            </div>
          );
        } else if (name === "Delivered") {
          return (
            <div className="bg-green-500 xl:w-[8vw] text-center p-3 text-white rounded">
              {name}
            </div>
          );
        }
        return (
          <Select
            placeholder="Select order status"
            className="xl:w-[8vw]"
            defaultValue={name}
            value={name}
            onChange={(e) => handleChangeStatus(e, id)}
          >
            {statusSet
              .filter((res, index) => {
                return res === name
                  ? ""
                  : statusSet.indexOf(name) < index && res;
              })
              .map((res, index) => {
                return (
                  <Select.Option key={index} value={res}>
                    {res}
                  </Select.Option>
                );
              })}
          </Select>
        );
      },
    },
  ];

  console.log(dataSource, "sourde");

  return (
    <div className="flex flex-col">
      <div className="ml-[13vw]">
        <AdminNavbar
          currentPage={
            <p className="flex text-xl font-bold text-[--third-color] pl-[2vw]">
              Orders
            </p>
          }
        />
      </div>
      <div className="flex">
        <div>
          <Sidenavbar />
        </div>

        <div className="xl:w-[90vw] m-auto  xl:p-5 xl:!pt-[12vh] bg-gradient-to-r from-white via-[#f5f7f6] to-white">
          <div className="flex flex-wrap pl-[5vw] gap-10 pb-3 text-white text-md">
            <p
              className="lg:h-[5vh] lg:w-[10vw] xsm:p-3 lg:p-0 cursor-pointer bg-pink-400  flex items-center justify-center rounded-md"
              onClick={handleConfirm}
            >
              Confirmed
              <span className="pl-2">
                {
                  order.filter((data) => {
                    return data.status === "Confirmed";
                  }).length
                }
              </span>
            </p>
            <p
              className="lg:h-[5vh] lg:w-[10vw] xsm:p-3 lg:p-0 cursor-pointer bg-purple-400  flex items-center  justify-center rounded-md"
              onClick={handleShipped}
            >
              Shipped
              <span className="pl-2">
                {
                  order.filter((data) => {
                    return data.status === "Shipped";
                  }).length
                }
              </span>
            </p>
            <p
              className="lg:h-[5vh] lg:w-[10vw] xsm:p-3 lg:p-0 cursor-pointer bg-yellow-500 flex items-center  justify-center rounded-md"
              onClick={handleOutForDelivery}
            >
              Out_For_Delivery
              <span className="pl-2">
                {
                  order.filter((data) => {
                    return data.status === "Out_For_Delivery";
                  }).length
                }
              </span>
            </p>
            <p
              className="lg:h-[5vh] lg:w-[10vw] xsm:p-3 lg:p-0  cursor-pointer bg-green-500 flex items-center  justify-center rounded-md"
              onClick={handleDelivered}
            >
              Delivered
              <span className="pl-2">
                {
                  order.filter((data) => {
                    return data.status === "Delivered";
                  }).length
                }
              </span>
            </p>
            <p
              className="lg:h-[5vh] lg:w-[10vw] xsm:p-3 lg:p-0 cursor-pointer bg-red-500 flex items-center  justify-center rounded-md"
              onClick={handleCancelled}
            >
              Cancelled
              <span className="pl-2">
                {
                  order.filter((data) => {
                    return data.status === "Cancelled";
                  }).length
                }
              </span>
            </p>
          </div>
          <Table
            className="xl:m-auto xsm:w-[100vw] xl:w-[80vw] hidden lg:block"
            columns={columns}
            dataSource={isEmpty(dataSource) ? order : dataSource}
            pagination={{
              pageSize: 10,
            }}
          />
          <Table
            className="xl:m-auto xsm:w-[100vw] xl:w-[80vw]  lg:hidden"
            columns={columns}
            dataSource={isEmpty(dataSource) ? order : dataSource}
            pagination={{
              pageSize: 10,
            }}
            scroll={{ x: 300 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
