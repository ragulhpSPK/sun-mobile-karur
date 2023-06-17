import { Image, Table } from "antd";
import React from "react";

function WishList() {
  const dataSource = [
    {
      key: "1",
      image: "image",
      title: "Mike",
      cart: 32,
      remove: "Remove",
    },
  ];

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Cart",
      dataIndex: "cart",
      key: "cart",
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
    },
  ];
  return (
    <div className="pt-[15vh] w-[90vw] ">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1>WishList</h1>
        </div>
        <div className="flex   pl-[10vw]">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            style={{ width: "80vw" }}
          />
        </div>
      </div>
    </div>
  );
}

export default WishList;
