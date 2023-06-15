/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidenavbar from "./shared/Sidenavbar";
import AdminNavbar from "./shared/AdminNavbar";
import Chart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import { userData } from "@/helper/data";
import RadarChart from "@/components/charts/ScatterChart";
import { Table, DatePicker, Image, Skeleton, Statistic, Col, Row } from "antd";
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
import {
  getDashBoardOrder,
  getAllUsers,
  getAllCatagory,
  getAllSubCatagory,
  getAllproducts,
} from "../../helper/utilities/apiHelper";
import _, { get, isEmpty, uniq } from "lodash";
import moment from "moment";
import Link from "next/link";
import { delivery } from "@/helper/delivery";
import styles from "../../styles/Home.module.css";
import { Tabs } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getOneUerforNav } from "../../helper/utilities/apiHelper";

const DynamicCountUp = dynamic(() => import("react-countup"), {
  loading: () => <div>Loading...</div>, // Optional loading component
  ssr: false, // Disable server-side rendering
});

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
  const [userDate, setUserDate] = useState([]);
  const [allUserDates, setallUserDates] = useState("");
  const [userChartDate, setUserChartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [
        await getDashBoardOrder(),
        await getAllUsers(),
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
        await getOneUerforNav(),
      ];

      setOrders(get(result, "[0]data.data", ""));
      setUsers(get(result, "[1]data.message", ""));
      setCategories(get(result, "[2]data.data.length", ""));
      setSubCategories(get(result, "[3]data.data.length", ""));
      setProducts(get(result, "[4]data.data.length", ""));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (
      localStorage.getItem("email") === null &&
      router.pathname.split("/").includes("dashboard")
    ) {
      router.push({ pathname: "customPage" });
    }

    setEmpty(isEmpty(localStorage.getItem("email")));
  }, []);

  console.log(empty, "empty");

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

    setallUserDates(
      users.map((data) => {
        return moment(data.createdAt).format("YYYY-MM-DD");
      })
    );

    setUserChartDate(
      allUserDates &&
        allUserDates.filter((data) => {
          return userDate.includes(data);
        })
    );
  }, [orders, selectedDates, userDate]);

  // salesUnique date
  let uniqueDates = [];
  const DatesArr = dateof.filter((data, id) => {
    return dateof.indexOf(data) == id;
  });

  uniqueDates.push(DatesArr);

  let countTotal = [];
  const totalArr = dateof.filter((data, id) => {
    return dateof.indexOf(data) !== id;
  });

  countTotal.push(totalArr);

  // userUniquedate
  let userUniquedate = [];

  const userDateArr =
    userChartDate &&
    userChartDate.filter((data, id) => {
      return userChartDate.indexOf(data) == id;
    });

  userUniquedate.push(userDateArr);

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

      setSelectedDates(date);
      currentDate = currentDate.clone().add(1, "days");
    }
  };

  const handleDateChangeUser = (date) => {
    const startDate = moment(
      `${date[0]?.$y} - ${date[0]?.$M + 1} - ${date[0]?.$D}`,
      "YYYY-MM-DD"
    );
    const endDate = moment(
      `${date[1]?.$y} - ${date[1]?.$M + 1} - ${date[1]?.$D}`,
      "YYYY-MM-DD"
    );

    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate.format("YYYY-MM-DD"));

      setUserDate(dates);
      currentDate = currentDate.clone().add(1, "days");
    }
  };

  const today = new Date();
  const recentFiveDays = new Array(5).fill().map((_, index) => {
    return new Date(
      new Date().setDate(new Date(today.getDate() - index))
    ).toISOString();
  });

  const totalDates = get(uniqueDates, "[0]")
    .map((res) => {
      return DeliveredOrders.filter((data) => {
        return (
          moment(data.updatedAt).format("YYYY-MM-DD").includes(res) &&
          data.total
        );
      });
    })
    ?.map((res) => {
      return res.map((datas) => {
        return datas.total;
      });
    })
    .map((res) => {
      return _.sum(res);
    });

  const totalDates2 =
    recentFiveDays &&
    recentFiveDays
      .map((res) => {
        return (
          DeliveredOrders &&
          DeliveredOrders.filter((data) => {
            return (
              moment(data.updatedAt)
                .format("YYYY-MM-DD")
                .includes(moment(res).format("YYYY-MM-DD")) && data.total
            );
          })
        );
      })
      ?.map((res) => {
        return res.map((datas) => {
          return datas.total;
        });
      })
      .map((res) => {
        return _.sum(res);
      });

  const totallen = userUniquedate.map((data) => {
    return (
      data &&
      data.map((res) => {
        return users.filter((dates) => {
          return moment(dates.updatedAt).format("YYYY-MM-DD") === res;
        });
      })
    );
  });

  const totallen2 = recentFiveDays.map((data) => {
    return users.filter((dates) => {
      return (
        moment(dates.updatedAt).format("YYYY-MM-DD") ===
        moment(data).format("YYYY-MM-DD")
      );
    });
  });

  let userLen = [];
  totallen.map((data) => {
    return (
      data &&
      data.map((res) => {
        return userLen.push(res.length);
      })
    );
  });

  const salesData = {
    labels:
      uniqueDates[0].length === 0
        ? recentFiveDays.map((data) => {
            return moment(data).format("YYYY-MM-DD");
          })
        : uniqueDates[0].map((data) => {
            return data;
          }),

    datasets: [
      {
        label: "Sales During Day",
        data: totalDates.length === 0 ? totalDates2 : totalDates,
        backgroundColor: ["#9c3587", "violet", "#e53f71", "#3f1561"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const UserData = {
    labels:
      userUniquedate[0].length === 0
        ? recentFiveDays
            .slice(0)
            .reverse()
            .map((data) => {
              return moment(data).format("YYYY-MM-DD");
            })
        : userUniquedate[0] &&
          userUniquedate[0].map((data) => {
            return data;
          }),

    datasets: [
      {
        label: "Customer on that Day",
        data:
          userLen.length === 0
            ? totallen2.map((res) => {
                return res.length;
              })
            : userLen.map((data) => {
                return data;
              }),
        backgroundColor: ["#9c3587", "violet", "#e53f71", "#3f1561"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const items = [
    {
      key: 1,
      label: <h1 className="xl:text-xl font-bold ">Orders</h1>,
      children: (
        <div className="flex flex-col ">
          <div className="w-[35vw] flex justify-between text-[--third-color] font-bold  ">
            <h1 className="xl:text-2xl xl:p-6 text-center">Last 10 Orders</h1>
            <Link
              href="/dashboard/order/order"
              className="w-[10vw] flex items-center justify-center hover:text-[-third-color]  text-[--third-color] xl:text-2xl font-bold"
            >
              <p>View All</p>
            </Link>
          </div>

          <div className="flex pr-1">
            <Skeleton loading={loading} className="h-[30vh]">
              <Table
                dataSource={orders.slice(-10)}
                columns={columns1}
                pagination={{
                  pageSize: 3,
                }}
                scroll={{ x: 1050 }}
                className="xl:w-[35vw] "
              />
            </Skeleton>
          </div>
        </div>
      ),
    },
    {
      key: 2,
      label: <h1 className="xl:text-xl font-bold">Customers</h1>,
      children: (
        <div className=" flex flex-col">
          <div className="w-[35vw] flex justify-between text-[--third-color] font-bold  ">
            <h1 className="xl:text-2xl p-6 text-center">Last 10 Customers</h1>
            <Link
              href="/dashboard/Users/user"
              className="w-[20vw] flex items-center justify-center   text-[--third-color] xl:text-2xl font-bold"
            >
              <p>View All</p>
            </Link>
          </div>
          <div className="flex">
            <Skeleton loading={loading} className="h-[30vh]">
              <Table
                dataSource={users.slice(-10)}
                columns={columns2}
                pagination={{
                  pageSize: 3,
                }}
                className="xl:w-[35vw]"
                scroll={{ x: 1100 }}
              />
            </Skeleton>
          </div>
        </div>
      ),
    },
  ];

  const formatter = (value) => <DynamicCountUp end={value} separator="," />;

  return (
    <div className={`flex ${empty === true ? "hidden" : "flex"}`}>
      {empty === true ? (
        ""
      ) : (
        <>
          <div>
            <Sidenavbar />
          </div>
          <div>
            <AdminNavbar
              currentPage={
                <p className="flex text-xl font-bold text-[--third-color] pl-[2vw]">
                  Dashboard
                </p>
              }
            />
            <div className="bg-gradient-to-r from-white via-[#f5f7f6] to-white !w-[80vw]">
              <div className="flex  flex-col-reverse pt-[5vh]">
                <div className="text-2xl xl:p-3 flex flex-col pt-[6vh]">
                  <div className="flex xsm:flex-col xl:flex-row-reverse shadow xl:ml-[1vw]  gap-[5vw] px-5  bg-white rounded-lg shadow-slate-300 xsm:w-[80vw] xl:w-[77.5vw] ">
                    <div className="xl:w-[35vw] text-[20px] text-slate-400">
                      Select Dates to See the Sales of a Choosing Day
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
                      <Skeleton loading={loading}>
                        <Chart chartData={salesData} />
                        {/* <h1 className="flex items-center justify-center bg-slate-50">
                      Sales Status During a Day
                    </h1> */}
                      </Skeleton>
                    </div>
                    <div className="xsm:pt-10 xl:pt-0">
                      <Tabs items={items} />
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <div className="text-xl text-slate-400  font-normal pt-[-6vh] w-[80vw] m-auto">
                    <div className="flex flex-col-reverse xl:flex-row-reverse  justify-around ">
                      <div className="xl:w-[25vw] xl:h-[38vh] xsm:w-[80vw] xsm:pb-2 ml-[-2vw] bg-white rounded-lg shadow-slate-300 shadow px-2">
                        <p className="text-[20px] pt-1">
                          Choose Dates for seeing new Customers
                        </p>
                        <div className="pb-[2vh]">
                          <RangePicker
                            format={dateFormat}
                            onChange={handleDateChangeUser}
                            style={{
                              width: "100%",
                            }}
                            size="large"
                          />
                        </div>
                        <Skeleton loading={loading}>
                          <PieChart chartData={UserData} />
                        </Skeleton>

                        {/* <h1 className="flex items-center justify-center bg-slate-50">
                      Customer on that Day
                    </h1> */}
                      </div>

                      <div className="grid lg:grid-cols-2  xl:grid-cols-3 gap-x-2 gap-y-3 justify-around">
                        <div className="bg-white rounded-lg shadow-slate-300 flex flex-col justify-center items-center xsm:w-[80vw] lg:w-[35vw] xl:w-[17vw] xl:h-[18vh] py-[1vh] text-center">
                          <div className="text-[--second-color] font-bold text-[20px] flex flex-col items-center justify-center">
                            <Image
                              src="/assets/dasicons/order.png"
                              alt="sale"
                              width={70}
                              height={70}
                              preview={false}
                              className="cursor-pointer"
                            />
                          </div>
                          <Row
                            gutter={16}
                            className="xsm:w-[80vw] xl:w-[17vw] flex items-center justify-center"
                          >
                            <Col span={12}>
                              <Statistic
                                title={
                                  <h1 className="text-[--second-color] font-bold xl:text-[20px]">
                                    Total Orders
                                  </h1>
                                }
                                value={orders.length}
                                formatter={formatter}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="bg-white xsm:w-[80vw]  xl:w-[17vw] lg:w-[35vw] xl:h-[18vh] rounded-lg h-[18vh] py-[1vh] text-center flex flex-col justify-center items-center">
                          <div className="text-[--second-color] font-bold text-[20px] flex flex-col items-center justify-center">
                            <Image
                              src="/assets/dasicons/sales.png"
                              alt="sale"
                              width={70}
                              height={70}
                              preview={false}
                              className="cursor-pointer"
                            />
                            <Row
                              gutter={16}
                              className="xsm:w-[80vw] xl:w-[17vw] lg:w-[35vw] flex items-center justify-center"
                            >
                              <Col span={12}>
                                <Statistic
                                  title={
                                    <h1 className="text-[--second-color] font-bold xl:text-[20px]">
                                      Total Sales
                                    </h1>
                                  }
                                  value={salesCount}
                                  formatter={formatter}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="bg-white  rounded-lg flex flex-col justify-center items-center shadow-slate-300 xsm:w-[80vw] lg:w-[35vw] xl:w-[17vw] xl:h-[18vh] h-[18vh] py-[1vh] text-center">
                          <div className="text-[--second-color] font-bold text-[20px] flex flex-col items-center justify-center">
                            <Image
                              src="/assets/dasicons/user (1).png"
                              alt="sale"
                              width={70}
                              height={70}
                              preview={false}
                              className="cursor-pointer"
                            />
                            <Row
                              gutter={16}
                              className="xsm:w-[80vw] xl:w-[17vw] flex items-center justify-center"
                            >
                              <Col span={12}>
                                <Statistic
                                  title={
                                    <h1 className="text-[--second-color] font-bold xl:text-[20px]">
                                      Total Users
                                    </h1>
                                  }
                                  value={users.length}
                                  formatter={formatter}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="bg-white   rounded-lg flex flex-col justify-center items-center shadow-slate-300 xsm:w-[80vw] lg:w-[35vw] xl:w-[17vw] xl:h-[18vh] h-[18vh] py-[1vh] text-center">
                          <div className="text-[--second-color] font-bold text-[20px] flex flex-col items-center justify-center">
                            <Image
                              src="/assets/dasicons/cat.png"
                              alt="sale"
                              width={70}
                              height={70}
                              preview={false}
                              className="cursor-pointer"
                            />
                            <Row
                              gutter={16}
                              className="xsm:w-[80vw] xl:w-[17vw] flex items-center justify-center"
                            >
                              <Col span={12}>
                                <Statistic
                                  title={
                                    <h1 className="text-[--second-color] font-bold  xl:text-[20px]">
                                      Total Categories
                                    </h1>
                                  }
                                  value={categories}
                                  formatter={formatter}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="bg-white  rounded-lg flex flex-col justify-center items-center shadow-slate-300 xsm:w-[80vw] lg:w-[35vw] xl:w-[17vw] xl:h-[18vh] h-[18vh] py-[1vh] text-center">
                          <div className="text-[--second-color] font-bold text-[20px] flex flex-col items-center justify-center">
                            <Image
                              src="/assets/dasicons/user (2).png"
                              alt="sale"
                              width={70}
                              height={70}
                              preview={false}
                              className="cursor-pointer"
                            />
                            <Row
                              gutter={16}
                              className="xsm:w-[80vw] xl:w-[17vw] flex items-center justify-center"
                            >
                              <Col span={12}>
                                <Statistic
                                  title={
                                    <h1 className="text-[--second-color] font-bold xl:text-[20px]">
                                      Total Subcategories
                                    </h1>
                                  }
                                  value={subCategories}
                                  formatter={formatter}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="bg-white  rounded-lg shadow-slate-300 flex flex-col justify-center items-center  xsm:w-[80vw] lg:w-[35vw] xl:w-[17vw] xl:h-[18vh] h-[18vh] py-[1vh] text-center">
                          <div className="text-[--second-color] font-bold text-[20px] flex flex-col items-center justify-center">
                            <Image
                              src="/assets/dasicons/poducts.png"
                              alt="sale"
                              width={80}
                              height={80}
                              preview={false}
                              className="cursor-pointer"
                            />
                            <Row
                              gutter={16}
                              className="xsm:w-[80vw] xl:w-[17vw] flex items-center justify-center"
                            >
                              <Col span={12}>
                                <Statistic
                                  title={
                                    <h1 className="text-[--second-color] font-bold xl:text-[20px]">
                                      Total Products
                                    </h1>
                                  }
                                  value={Products}
                                  formatter={formatter}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex flex-col items-center justify-center gap-3 bg-white shadow rounded-lg shadow-slate-300 w-[15vw] h-[37vh]">
                    <Image
                      src="/assets/dasicons/dash2 (1).png"
                      alt="sale"
                      width={130}
                      height={130}
                      preview={false}
                      className="cursor-pointer"
                    />
                    <div className="text-slate-700">
                      <h1 className="text-4xl">DashBoard </h1>
                      <p className="text-4xl">Stats</p>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
