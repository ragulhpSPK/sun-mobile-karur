import React from "react";
import { Category } from "../helper/categories";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllCatagory } from "../helper/utilities/apiHelper";
import { get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

function AllProducts() {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getAllCatagory();
      setCategory(get(result, "data.data", []));
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

   const antIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );


  return (
    <Spin
      spinning={loading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div className="min-h-screen">
        <div  className="w-[90vw] bg-[--third-color] m-auto py-[1vh] mt-[5vh] rounded-sm">
          <h1 className="lg:text-2xl xsm:text-xl text-white pl-[20px]">All Categories</h1>
        </div>
        <div className="h-[100%] grid w-screen xsm:pl-10 lg:pl-28 xsm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-5  pt-10">
          {category.map((data) => {
            return (
              <div
                className="card w-[250px] h-[280px]  p-5 mt-12 bg-[#fff]"
                key={data.id}
                id={styles.shadow3}
                onClick={() => {
                  router.push({
                    pathname: "/allCat",
                    query: { cat_id: data._id },
                  });
                }}
              >
                <figure>
                  <Image
                    width={100}
                    height={100}
                    alt="logo"
                    src={data.image}
                    className="h-[150px] !w-fit m-auto"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title m-auto w-fit">{data.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Spin>
  );
}

export default AllProducts;
