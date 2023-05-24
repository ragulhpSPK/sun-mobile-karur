import React, { useEffect, useState } from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Sidenavbar from "../shared/Sidenavbar";
import { Form, Select, Table, notification } from "antd";
import {
  getDashBoardOrder,
  updateOrder,
} from "../../../helper/utilities/apiHelper";
import { get } from "lodash";

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
      console.log(result);
      setOrder(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeStatus = async (e, id) => {
    console.log(e);
    // console.log(
    //   order.filter((data) => {
    //     return data._id === e;
    //   })[0]
    // );

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
            <div className="bg-red-500 w-[8vw] text-center p-3 text-white rounded">
              {name}
            </div>
          );
        } else if (name === "Delivered") {
          return (
            <div className="bg-green-500 w-[8vw] text-center p-3 text-white rounded">
              {name}
            </div>
          );
        }
        return (
          <Select
            placeholder="Select order status"
            className="w-[8vw]"
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

  return (
    <div className="flex flex-col">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex">
        <div>
          <Sidenavbar />
        </div>

        <div className="w-[80vw] p-5">
          <Table
            className="m-auto w-[80vw]"
            columns={columns}
            dataSource={order}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
