import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cat } from "@/helper/product";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllproducts } from "@/helper/utilities/apiHelper";
import { get } from "lodash";

function ProductFilter() {
  const [produts, setProduts] = useState([""]);
  const search = useSelector((state) => state.search);
  // const [searches, setSearches] = useState([search.searches]);
  const [allProducts, setAllProducts] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await getAllproducts();
      setAllProducts(get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setProduts(
      allProducts.filter((data) => {
        return (
          data.title
            .toLowerCase()
            .includes(search.searches.toString().toLowerCase()) ||
          data.categoryname
            .toLowerCase()
            .includes(search.searches.toString().toLowerCase())
        );
      })
    );
  }, [search, allProducts]);

  return (
    <div className="xsm:w-[90vw] xl:w-[80vw] m-auto xsm:mt-[12vh] sm:mt-[20vh]">
      {produts.length > 0 ? (
        <div
          className={`${
            search.length === 0 ? "hidden" : "block"
          } sm:grid xxl:grid-cols-5 xsm:grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-3 w-[80vw] sm:m-auto`}
        >
          {produts &&
            produts.map((data, index) => {
              return (
                <div
                  className="sm:card  flex flex-row sm:flex-col border-b border-t  xsm:w-[90vw] mt-[2vh] sm:w-[35vw] md:w-[24vw]  xl:w-[18vw] xxl:w-[15vw]  sm:bg-base-100 xsm:p-[2vh] sm:shadow-xl sm:pt-10 "
                  onClick={() => {
                    router.push({
                      pathname: `product/${data._id}`,
                      query: data,
                    });
                  }}
                  key={index}
                >
                  <figure className="">
                    <Image
                      width={100}
                      height={100}
                      src={get(data, "image[0]", "")}
                      alt="Shoes"
                      className="xl:h-[10vh] xsm:h-[8vh] !w-fit m-auto "
                    />
                  </figure>

                  <div className="p-2 flex flex-col items-center justify-center">
                    <h2 className=" xsm:text-[12px] xl:text-sm">
                      {data.title}
                    </h2>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="w-[70vw] flex  flex-col-reverse pt-10 relative ">
          <Image
            width={100}
            height={100}
            alt="logo"
            src="/assets/searchempty2.gif"
            className="text-center m-auto w-[25vw] animate-pulse absolute top-[2vh] left-[22vw]"
          ></Image>
          <p className="text-xl text-slate-400 top-[3vh]  absolute left-[26vw]">
            No products matches your search
          </p>
        </div>
      )}
    </div>
  );
}
export default ProductFilter;
