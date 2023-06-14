import React, { useEffect, useState } from "react";
import Sidenavbar from "../shared/Sidenavbar";
import Categories from "./categories";
import { Tabs } from "antd";
import Subcategories from "./subcategories";
import AdminNavbar from "../shared/AdminNavbar";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  getAllCatagory,
  getAllSubCatagory,
} from "@/helper/utilities/apiHelper";
import { Collapse, theme } from "antd";
import { get } from "lodash";
const { Panel } = Collapse;

const CategoryHome = () => {
  const [categoryData, setcategoryData] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [await getAllCatagory(), await getAllSubCatagory()];
      setcategoryData(get(result, "[0].data.data", []));
      setSubCat(get(result, "[1].data.data", []));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="pl-[13vw]">
        <AdminNavbar
          currentPage={
            <p className="flex text-xl font-bold text-[--third-color] pl-[2vw] ">
              Categories
            </p>
          }
        />
      </div>
      <div className="flex flex-row gap-x-5">
        <div>
          <Sidenavbar />
        </div>
        <div className="pt-[5vh]  bg-gradient-to-r from-white via-[#f5f7f6] to-white w-[90vw] flex flex-col items-center justify-center lg:flex-row gap-y-10 lg:items-start gap-x-10 lg:justify-start">
          <Categories
            loading={loading}
            setLoading={setLoading}
            fetchData={fetchData}
            category={categoryData}
          />
          <Subcategories
            loading={loading}
            setLoading={setLoading}
            fetchData={fetchData}
            subcategory={subCat}
            category={categoryData}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
