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
    <div className="w-[80vw] m-auto mt-20">
      {produts.length > 0 ? (
        <div
          className={`${
            search.length === 0 ? "hidden" : "block"
          } grid grid-cols-5 gap-3 w-[80vw] m-auto`}
        >
          {produts &&
            produts.map((data, index) => {
              return (
                <div
                  className="card w-[13vw] h-[35vh] bg-base-100 shadow-xl pt-10 "
                  id={styles.shadow3}
                  onClick={() => {
                    router.push({
                      pathname: `product/${data._id}`,
                      query: data,
                    });
                  }}
                  key={index}
                >
                  <figure className="h-[18vh]">
                    <Image
                      width={100}
                      height={100}
                      src={get(data, "image[0]", "")}
                      alt="Shoes"
                      className="!w-[8vw] h-[100%] m-auto "
                    />
                  </figure>

                  <div className="card-body flex flex-col items-center h-[6vh] justify-center">
                    <h2 className="card-title text-sm">{data.title}</h2>
                    <p className="text-sm">{data.price}</p>
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
