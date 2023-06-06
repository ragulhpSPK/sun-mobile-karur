/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidenavbar from "./shared/Sidenavbar";
import AdminNavbar from "./shared/AdminNavbar";
import Chart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import { userData } from "@/helper/data";
import RadarChart from "@/components/charts/ScatterChart";
import { Table, DatePicker } from "antd";
import {
  getAllOrder,
  getAllUsers,
  getAllCatagory,
  getAllSubCatagory,
  getAllproducts,
} from "../../helper/utilities/apiHelper";
import { get } from "lodash";
import moment from "moment";
import Link from "next/link";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const [selectedDates, setSelectedDates] = useState([]);
  const [DeliveredOrders, setDeliveredOrders] = useState([]);
  const [DeliveredDates, setDeliveredDates] = useState([]);
  const [dateof, setDateOf] = useState([]);

  const fetchData = async () => {
    try {
      const result = [
        await getAllOrder(),
        await getAllUsers(),
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
      ];
      setOrders(get(result, "[0]data.data", ""));
      setUsers(get(result, "[1]data.message", ""));
      setCategories(get(result, "[2]data.data.length", ""));
      setSubCategories(get(result, "[3]data.data.length", ""));
      setProducts(get(result, "[4]data.data.length", ""));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDeliveredOrders(
      orders.filter((data) => {
        return data.status === "Delivered";
      })
    );

    console.log(DeliveredOrders, "fhuh");

    DeliveredOrders.map((data) => {
      console.log(data, "fhhbgvbgvh");
      setDeliveredDates(moment(data.updatedAt).format("YYYY-MM-DD"));
    });

    console.log(DeliveredDates, "datessss");

    setDateOf(
      selectedDates.filter((data) => {
        return data === DeliveredDates;
      })
    );
  }, [orders, selectedDates]);

  console.log(dateof[0], "dakndjkasdbh");

  const columns1 = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
  ];

  const salesCount = +orders?.filter((data) => {
    return data.status === "Delivered";
  }).length;

  const columns2 = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Alternate Number",
      dataIndex: "alternateNumber",
      key: "alternateNumber",
    },
  ];

  const handleDateChange = (dates) => {
    // setSelectedDates(dates);

    const startDate = moment(
      `${dates[0]?.$y} - ${dates[0]?.$M + 1} - ${dates[0]?.$D}`,
      "YYYY-MM-DD"
    );
    const endDate = moment(
      `${dates[1]?.$y} - ${dates[1]?.$M + 1} - ${dates[1]?.$D}`,
      "YYYY-MM-DD"
    );

    const date = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      date.push(currentDate.format("YYYY-MM-DD"));
      setSelectedDates(date);
      currentDate = currentDate.clone().add(1, "days");
    }
  };
  const UserData = {
    labels: [
      dateof.map((data) => {
        return data;
      }),
    ],
    datasets: [
      {
        label: "User gained",
        data: userData.map((data) => {
          return data.userGain;
        }),
        backgroundColor: ["#943074", "#f092be", "violet", "pink"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="flex flex-row-reverse">
      <div>
        <AdminNavbar />
        <div>
          <div className="flex flex-col-reverse pt-[5vh]">
            <div
              className="text-2xl p-3 flex flex-col pt-[6vh]"
              style={{
                width: 1000,
              }}
            >
              <div className="flex  gap-[7vw] pl-[5vw]">
                <div>
                  <div className="pb-[2vh]">
                    <RangePicker
                      format={dateFormat}
                      onChange={handleDateChange}
                      style={{
                        width: "100%",
                      }}
                      size="large"
                    />
                  </div>

                  <Chart chartData={UserData} />
                  <h1 className="flex items-center justify-center bg-slate-50">
                    Order Status Of the Years
                  </h1>
                </div>
                <div>
                  <div className="pb-[2vh]">
                    <RangePicker
                      format={dateFormat}
                      onChange={handleDateChange}
                      style={{
                        width: "100%",
                      }}
                      size="large"
                    />
                  </div>

                  <PieChart chartData={UserData} />
                  <h1 className="flex items-center justify-center bg-slate-50">
                    Sales Status of the Years
                  </h1>
                </div>

                <div>
                  <div className="pb-[2vh]">
                    <RangePicker
                      format={dateFormat}
                      onChange={handleDateChange}
                      style={{
                        width: "100%",
                      }}
                      size="large"
                    />
                  </div>

                  <RadarChart chartData={UserData} />
                  <h1 className="flex items-center justify-center bg-slate-50">
                    Sales Status of the Years
                  </h1>
                </div>
              </div>

              {/* <div className="flex gap-[13vw] pt-[10vh] pl-[8vw]">
                <div>
                  <PieChart chartData={UserData} />
                </div>

                <div>
                  <RadarChart chartData={UserData} />
                </div>
              </div> */}
            </div>
            <div className="grid grid-cols-3 gap-5 justify-around text-xl text-slate-400 font-normal w-[80vw] m-auto">
              <div className="bg-slate-50    w-[20vw] py-[2vh] text-center">
                <p className="text-[--second-color] font-bold text-xl">
                  Total Orders
                </p>
                <span>{orders.length}</span>
              </div>
              <div className="bg-slate-50  py-[2vh] text-center w-[20vw]">
                <p className="text-[--second-color] font-bold text-xl">
                  Total Sales
                </p>
                <span>{salesCount}</span>
              </div>
              <div className="bg-slate-50  w-[20vw] py-[2vh] text-center">
                <p className="text-[--second-color] font-bold text-xl">
                  Total Users
                </p>
                <span>{users.length}</span>
              </div>
              <div className="bg-slate-50  w-[20vw] py-[2vh] text-center">
                <p className="text-[--second-color] font-bold text-xl">
                  Total Categories
                </p>
                <span>{categories}</span>
              </div>
              <div className="bg-slate-50  w-[20vw] py-[2vh] text-center">
                <p className="text-[--second-color] font-bold text-xl">
                  Total SubCategories
                </p>
                <span>{subCategories}</span>
              </div>
              <div className="bg-slate-50  w-[20vw] py-[2vh] text-center">
                <p className="text-[--second-color] font-bold text-xl">
                  Total Products
                </p>
                <span>{Products}</span>
              </div>
              <div className="w-[80vw] m-auto pt-[5vh]">
                <div className="flex">
                  <h1 className="text-2xl p-6 text-center w-[10vw]  flex items-center justify-center text-[--third-color] font-bold bg-slate-50">
                    Last 10 Orders
                  </h1>
                  <div className="flex">
                    <Table
                      dataSource={orders.slice(-10)}
                      columns={columns1}
                      pagination={false}
                      className="w-[55vw]"
                    />
                    <Link
                      href="/dashboard/order/order"
                      className="w-[10vw] flex items-center justify-center bg-slate-50  text-[--third-color] text-2xl font-bold"
                    >
                      <p>View All</p>
                    </Link>
                  </div>
                </div>
                <div className="pt-[4vh] flex">
                  <h1 className="text-2xl w-[10vw] p-3 text-center pb-3 text-[--third-color] flex items-center justify-center font-bold bg-slate-50">
                    Last 10 Customers
                  </h1>
                  <div className="flex">
                    <Table
                      dataSource={users.slice(-10)}
                      columns={columns2}
                      pagination={false}
                      className="w-[55vw]"
                    />
                    <Link
                      href="/dashboard/Users/user"
                      className="w-[10vw] flex items-center justify-center bg-slate-50  text-[--third-color] text-2xl font-bold"
                    >
                      <p>View All</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="fixed left-0">
          <Sidenavbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
