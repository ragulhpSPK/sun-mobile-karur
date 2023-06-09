import React, { useEffect, useState } from "react";
import AdminNavbar from "../shared/AdminNavbar";
import SideNavebar from "../shared/Sidenavbar";
import { getAllUsers } from "@/helper/utilities/apiHelper";
import { Table, Select } from "antd";
import { get } from "lodash";

function User() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllUsers();
      setUsers(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: <h1 className="!text-md">Name</h1>,
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: <h1 className="!text-md">Address</h1>,
      dataIndex: "address",
      key: "address",
    },
    {
      title: <h1 className="!text-md">Email</h1>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <h1 className="!text-md">Number</h1>,
      dataIndex: "number",
      key: "number",
    },
    {
      title: <h1 className="!text-md">Alternate Number</h1>,
      dataIndex: "alternateNumber",
      key: "alternateNumber",
    },
  ];

  let search = [];
  users.map((data, i) => {
    return search.push({ key: i, value: data.firstName });
  });

  const result = users.filter((res) => {
    return (
      res.firstName
        .toString()
        .toLowerCase()
        .includes(data.toString().toLowerCase()) ||
      res.number.toString().includes(data)
    );
  });

  return (
    <div className="flex ">
      <div>
        <SideNavebar />
      </div>
      <div>
        <AdminNavbar
          currentPage={
            <p className="flex text-xl font-bold text-[--third-color] ">
              Users
            </p>
          }
        />
        <div className="lg:w-[86vw] h-[92vh] xsm:w-[100vw]  m-auto lg:pt-[5vh] bg-gradient-to-r from-white via-[#f5f7f6] to-white">
          <div className="pb-[20px] flex items-center justify-center">
            <Select
              mode="tags"
              style={{
                width: "60%",
              }}
              placeholder="Type Username here..."
              options={search}
              onChange={(data) => {
                setData(data);
              }}
              size="large"
            />
          </div>

          <Table
            dataSource={result}
            columns={columns}
            pagination={{
              pageSize: 10,
            }}
            className="hidden lg:block"
          />

          <Table
            dataSource={result}
            columns={columns}
            pagination={{
              pageSize: 10,
            }}
            scroll={{ x: 200 }}
            className=" lg:hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default User;
