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
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
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
import { delivery } from "@/helper/delivery";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FormatIndentIncreaseOutlinedIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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

    setDeliveredDates(
      DeliveredOrders.map((data) => {
        return moment(data.updatedAt).format("YYYY-MM-DD");
      })
    );

    setDateOf(
      DeliveredDates.filter((data) => {
        return selectedDates.includes(data);
      })
    );
  }, [orders, selectedDates]);

  let uniqueDates = [];
  const DatesArr = dateof.filter((data, id) => {
    return dateof.indexOf(data) == id;
  });

  uniqueDates.push(DatesArr);

  // console.log(
  //   dateof.filter((data, id) => {
  //     return dateof.indexOf(data) !== id;
  //   })[0],
  //   "flllf"
  // );

  // let countTotal = [];
  // const totalArr = dateof.filter((data, id) => {
  //   return dateof.indexOf(data) !== id;
  // });

  // countTotal.push(totalArr);

  // useEffect(() => {
  //   setTotal(
  //     DeliveredOrders.filter((data) => {
  //       return moment(data.updatedAt).format("YYYY-MM-DD") === totalArr[0];
  //     }).map((data) => {
  //       return data.total;
  //     })
  //   );
  // }, [DeliveredOrders]);

  // const sum =
  //   total &&
  //   total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // console.log(sum, "sum");

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

  const salesCount = DeliveredOrders.map((data) => {
    return data.total;
  }).reduce((accumulator, current) => accumulator + current, 0);

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
      console.log(date);
      setSelectedDates(date);
      currentDate = currentDate.clone().add(1, "days");
    }
  };

  // console.log(
  //   DeliveredOrders?.filter((data) => {
  //     return (
  //       moment(data.updatedAt).format("YYYY-MM-DD") ===
  //       dateof.filter((data, id) => {
  //         return dateof.indexOf(data) !== id;
  //       })[0]
  //     );
  //   })
  //     .map((res) => {
  //       return res.total;
  //     })
  //     .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
  //   "ppppp"
  // );

  console.log(
    get(uniqueDates, "[0]", []).filter((res) => {
      DeliveredOrders.filter((data) => {
        return moment(data.updatedAt).format("YYYY-MM-DD") == res;
      });
    }),
    "ppp"
  );

  // uniqueDates[0].map((data) => {
  //   DeliveredOrders.filter((res) => {
  //     console.log(res, "lllll");
  //   });
  // });

  const UserData = {
    labels: uniqueDates[0].map((data) => {
      return data;
    }),

    datasets: [
      {
        label: "Sales During Day",
        data: DeliveredOrders.filter((data) => {
          return;
          moment(data.updatedAt).format("YYYY-MM-DD") === uniqueDates[0][0];
        }),
        backgroundColor: ["#9c3587", "violet", "#e53f71", "#3f1561"],
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
              <div className="flex items-center justify-center ml-[4vw] gap-[7vw] p-5 bg-slate-50 w-[80vw] ">
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
                    Sales Status During a Day
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className=" text-xl text-slate-400 font-normal w-[80vw] m-auto">
                <div className="flex gap-32 justify-around ">
                  <div className="flex gap-3 bg-slate-50 p-[4vw]">
                    <ShowChartOutlinedIcon
                      style={{ fontSize: "80px" }}
                      className="text-[--third-color]"
                    />
                    <span className="text-slate-700">
                      <h1 className="text-4xl">DashBoard </h1>
                      <p className="text-4xl">Stats</p>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-32 gap-y-4 justify-around">
                    <div className="bg-slate-50 w-[15vw] py-[2vh] text-center">
                      <p className="text-[--second-color] font-bold text-[20px]">
                        <LocalGroceryStoreOutlinedIcon />
                        Total Orders
                      </p>
                      <span>{orders.length}</span>
                    </div>
                    <div className="bg-slate-50  py-[2vh] text-center w-[15vw]">
                      <p className="text-[--second-color] font-bold text-[20px]">
                        <AttachMoneyOutlinedIcon />
                        Total Sales
                      </p>
                      <span>&#8377;{salesCount}</span>
                    </div>
                    <div className="bg-slate-50  w-[15vw] py-[2vh] text-center">
                      <p className="text-[--second-color] font-bold text-[20px]">
                        <ContactPageOutlinedIcon />
                        Total Users
                      </p>
                      <span>{users.length}</span>
                    </div>
                    <div className="bg-slate-50  w-[15vw] py-[2vh] text-center">
                      <p className="text-[--second-color] font-bold text-[20px]">
                        <MenuOutlinedIcon />
                        Total Categories
                      </p>
                      <span>{categories}</span>
                    </div>
                    <div className="bg-slate-50  w-[15vw] py-[2vh] text-center">
                      <p className="text-[--second-color] font-bold text-[20px]">
                        <FormatIndentIncreaseOutlinedIcon />
                        Total SubCategories
                      </p>
                      <span>{subCategories}</span>
                    </div>
                    <div className="bg-slate-50  w-[15vw] py-[2vh] text-center">
                      <p className="text-[--second-color] font-bold text-[20px]">
                        <Inventory2OutlinedIcon />
                        Total Products
                      </p>
                      <span>{Products}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-[5vh] ">
                  <div className="w-[83vw]  m-auto pt-[5vh]  bg-slate-50 p-4 ">
                    <div className="flex gap-[5vw] !w-[83vw] ">
                      <div className="flex flex-col">
                        <div className="w-[35vw] flex justify-between text-[--third-color] font-bold bg-slate-50 ">
                          <h1 className="text-2xl p-6 text-center">
                            Last 10 Orders
                          </h1>
                          <Link
                            href="/dashboard/order/order"
                            className="w-[10vw] flex items-center justify-center bg-slate-50  text-[--third-color] text-2xl font-bold"
                          >
                            <p>View All</p>
                          </Link>
                        </div>

                        <div className="flex pr-1">
                          <Table
                            dataSource={orders.slice(-10)}
                            columns={columns1}
                            pagination={{
                              pageSize: 4,
                            }}
                            className="w-[35vw] "
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col">
                        <div className="w-[42vw] flex justify-between text-[--third-color] font-bold bg-slate-50 ">
                          <h1 className="text-2xl p-6 text-center">
                            Last 10 Customers
                          </h1>
                          <Link
                            href="/dashboard/Users/user"
                            className="w-[20vw] flex items-center justify-center bg-slate-50  text-[--third-color] text-2xl font-bold"
                          >
                            <p>View All</p>
                          </Link>
                        </div>
                        <div className="flex">
                          <Table
                            dataSource={users.slice(-10)}
                            columns={columns2}
                            pagination={{
                              pageSize: 4,
                            }}
                            className="w-[42vw]"
                          />
                        </div>
                      </div>
                    </div>
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
