/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import React from "react";
import styles from "../../styles/zoom.module.css";
import { useDispatch } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import { AddCart } from "@/helper/Addcart";
import Link from "next/link";
import Image from "next/image";
import {
  createCart,
  getAllproducts,
  getAllCart,
} from "../../helper/utilities/apiHelper";
import { Drawer, Spin, notification } from "antd";
import { get, set } from "lodash";
import { ReloadOutlined } from "@ant-design/icons";
import Buy from "../buy";

export default function App() {
  const [current, setCurrentImage] = useState();
  const router = useRouter();
  const [imgs, setImgs] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [openDraw, setopenDraw] = useState(false);
  const [size, setSize] = useState();

  const result = AddCart.filter((data) => {
    return data.product_id == router.query.id;
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [await getAllproducts(), await getAllCart()];
      setProduct(get(result, "[0].data.data", []));
      setCart(get(result, "[1].data.message", []));
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  useEffect(() => {
    setFilterData(
      product.filter((data) => {
        return data._id === router.query.id;
      })
    );
  }, [product, router.query.id]);

  useEffect(() => {
    filterData.map((img, i) => {
      setImgs(img.image[0]);
    });
  }, [filterData]);

  const handleClick = async (data) => {
    try {
      const formData = {
        data: {
          productId: data._id,
          image: filterData[0].image[0],
          name: filterData[0].title,
          total: filterData[0].price,
          quantity: 1,
          price: filterData[0].price,
        },
      };

      await createCart(formData);
      notification.success({ message: "cart added successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const AntIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  return (
    <Spin
      spinning={loading}
      tip="loading data..."
      size="large"
      indicator={AntIcon}
    >
      <div
        className={`${
          loading ? "invisible" : "visible"
        } flex lg:h-[80vh] justify-center xsm:w-[100vw] lg:[80vw]`}
      >
        <div className="xsm:flex-col flex lg:!flex-row !pt-[12vh]">
          <div className={`${styles.container} lg:pt-[8vh]`}>
            <div
              className={`${styles.left} xsm:!h-[25vh] xsm:!pr-[2vw] sm:!h-[35vh] md:h-[50vh] lg:h-[40vh] xl:h-[50vh] xsm:!w-[80vw] lg:!w-[50vw] `}
            >
              <div
                className={`${styles.left_2} flex items-center justify-center xsm:h-[16vh] lg:!pl-[14vw] sm:h-[26vh] xl:h-[42vh] md:h-[40vh] lg:h-[36vh] `}
              >
                <Image
                  width={300}
                  height={300}
                  alt="logo"
                  src={current || imgs}
                  className=" flex items-center justify-center xsm:!h-[15vh] w-fit sm:!h-[25vh] md:h-[30vh] lg:!h-[35vh] xl:!h-[40vh]"
                />
              </div>
              <div className={`${styles.left_1}`}>
                {result &&
                  filterData.map((img) => {
                    return img.image.map((image, i) => {
                      return (
                        <>
                          <div className="xl:pt-[5vh]  xsm:pl-[3vw] sm:!pl-[5vw]  lg:!pl-[2vw] lg:!pt-[13vh]  flex items-center justify-center">
                            <div
                              className={`${
                                current && current.includes(image)
                                  ? "border-4 border-[--third-color] "
                                  : "border-none"
                              }  bg-slate-100 text-center !w-[5vw]`}
                              id={styles.img_wrap}
                              key={i}
                              onMouseEnter={() => {
                                setCurrentImage(image);
                              }}
                            >
                              <Image
                                width={400}
                                height={300}
                                alt="logo"
                                src={image}
                                className="m-auto "
                              />
                            </div>
                          </div>
                        </>
                      );
                    });
                  })}
              </div>
            </div>
          </div>
          <div className="xsm:pt-[3vh] lg:!pt-[8vh] xl:pt-[8vh] xxl:!pt-[1vh] flex items-center justify-center">
            {result &&
              filterData.map((data, index) => {
                return (
                  <div className="xsm:pl-[2vw]" key={index}>
                    <h1 className="xl:text-xl  font-semibold xsm:text-md">
                      {data.title}
                    </h1>

                    {data.flashStatus == true ? (
                      <div>
                        <span>
                          <s>&#8377;{data.price}</s>-
                          <p className="font-bold text-sm text-red-500">
                            -{data.offer}% Off
                          </p>
                        </span>

                        {data.offer !== null || 0 ? (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;
                            {Math.round(
                              data.price - (data.price / 100) * data.offer
                            )}
                          </p>
                        ) : (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;{data.price}
                          </p>
                        )}
                      </div>
                    ) : data.bestStatus === true ? (
                      <div>
                        <s>&#8377;{data.price}</s>{" "}
                        <p className="font-bold text-sm text-red-500">
                          -{data.bestOffer}% Off
                        </p>
                        {data.bestOffer !== null || 0 ? (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;
                            {Math.round(
                              data.price - (data.price / 100) * data.bestOffer
                            )}
                          </p>
                        ) : (
                          <p className="text-xl text-slate-800 pt-1">
                            &#8377;{data.price}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xl text-slate-800 pt-1">
                        &#8377;{data.price}
                      </p>
                    )}

                    <h2 className="xl:text-2xl pt-5 font-bold xsm:text-xl">
                      Product Specifications
                    </h2>

                    {data.highlight.split(",").map((res, index) => {
                      return (
                        <li
                          className="xl:text-xl xsm:text-[12px] pt-2 xsm:self-start xsm:pl-[2vw] sm:self-center sm:w-[50vw]"
                          key={index}
                        >
                          {res}.
                        </li>
                      );
                    })}
                    <div className="pt-10 flex lg:gap-5 xsm:pl-0  justify-around xsm:w-[80vw] sm:pr-[8vw] sm:w-[40vw] xl:!pl-0">
                      {cart.find((res) => {
                        return res.productId === data._id;
                      }) ? (
                        <Link href="/profiles/cart">
                          <button className="bg-slate-300 text-[#000] shadow-2xl hover:bg-[--second-color] hover:scale-105 hover:font-medium hover:text-white duration-1000 text-sm rounded-md !h-[30px] px-2">
                            Go to Cart
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="bg-[var(--second-color)] text-[#fff] hover:bg-[--first-color] hover:scale-105 hover:font-medium hover:text-black duration-1000 xl:text-xl rounded-md !h-[30px] px-2"
                          onClick={() => {
                            handleClick(data);
                            dispatch(addproduct({ products: true }));
                            {
                              console.log(data);
                            }
                          }}
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        className="bg-[var(--second-color)] lg:hidden hover:bg-[--first-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] xl:text-xl rounded-md !h-[30px] px-2"
                        onClick={() => {
                          setopenDraw(true);
                          setSize(260);
                        }}
                      >
                        Buy Now
                      </button>
                      <button
                        className="bg-[var(--second-color)] xsm:hidden lg:block hover:bg-[--first-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] xl:text-xl rounded-md !h-[30px] px-2"
                        onClick={() => {
                          setopenDraw(true);
                          setSize(400);
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                    <Drawer
                      open={openDraw}
                      width={size}
                      onClose={() => {
                        setopenDraw(false);
                      }}
                    >
                      <Buy id={router.query.id} />
                    </Drawer>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Spin>
  );
}
