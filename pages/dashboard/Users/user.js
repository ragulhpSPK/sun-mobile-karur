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

  console.log(users, "dfj");

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
    <div className="flex flex-row-reverse">
      <div>
        <AdminNavbar />
        <div className="w-[80vw] m-auto pt-[5vh]">
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
              pageSize: 20,
            }}
          />
        </div>
      </div>
      <div>
        <SideNavebar />
      </div>
    </div>
  );
}

export default User;
