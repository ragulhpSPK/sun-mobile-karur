/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import React from "react";
import styles from "../../styles/zoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import { AddCart } from "@/helper/Addcart";
import Link from "next/link";
import Image from "next/image";
import {
  createCart,
  getAllproducts,
  getAllCart,
  getOneUerforNav,
} from "../../helper/utilities/apiHelper";
import { Drawer, Modal, Spin, notification } from "antd";
import { get, isEmpty, set } from "lodash";
import { ReloadOutlined } from "@ant-design/icons";
import Buy from "../../components/buy";
import Categories from "@/components/categories";
import TopRated from "@/components/flashdeals";
import Bestdeals from "@/components/bestdeals";
import TopProducts from "../../components/topproducts";
import Cookies from "js-cookie";
import Login from "@/pages/Authentication/Register";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { showLoader, hideLoader } from "@/redux/loadingSlice";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

export default function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [current, setCurrentImage] = useState();
  const router = useRouter();
  const [imgs, setImgs] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);
  const [goCart, setGoGart] = useState([]);
  const dispatch = useDispatch();
  const [openDraw, setopenDraw] = useState(false);
  const [size, setSize] = useState();
  const [login, setLogin] = useState(false);
  const [getUser, setGetUser] = useState([]);
  const [go, setGo] = useState("");
  const [address, setAddress] = useState("");

  const result = AddCart.filter((data) => {
    return data.product_id == router.query.id;
  });

  const fetchData = async () => {
    try {
      dispatch(showLoader());
      const result = [
        await getAllproducts(),
        await getAllCart(),
        await getOneUerforNav(),
      ];
      setProduct(get(result, "[0].data.data", []));
      setCart(get(result, "[1].data.message", []));
      setAddress(get(result, "[2]data.message", []));
      const getUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setGetUser(get(getUser, "data.message[0]", []));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(hideLoader());
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

    setGo(
      cart.find((res) => {
        return res.productId === router.query.id;
      })
    );
  }, [product, router.query.id]);

  useEffect(() => {
    filterData.map((img, i) => {
      setImgs(img.image[0]);
    });
  }, [filterData]);

  console.log(go, "erugybhnjkpojihbgvbhjiojb v");

  const handleClick = async (data) => {
    try {
      const formData = {
        data: {
          productId: data,
          image: filterData[0].image[0],
          name: filterData[0].title,
          total: filterData[0].price,
          quantity: 1,
          price: filterData[0].price,
        },
      };

      await createCart(formData);
      notification.success({ message: "cart added successfully" });
      fetchData();
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const AntIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
    });
    window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
  }, [goCart]);

  return (
    <Spin
      spinning={isLoading}
      tip="loading data..."
      size="large"
      indicator={AntIcon}
      className="overflow-y-scroll"
    >
      <div
        className={`${
          isLoading ? "invisible" : "visible"
        } flex justify-center lg:[90vw] mt-[8vh]`}
      >
        <div className="xsm:flex-col  flex lg:!flex-row  xsm:w-[100vw] lg:h-[100vh] lg:w-[90vw] lg:gap-[15vw] xl:gap-[8vw] p-[2vw]   ">
          <div className="lg:hidden">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {filterData.map((data) => {
                return data.image.map((res, i) => {
                  return (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div>
                        <Image
                          src={res}
                          alt="products"
                          width={50}
                          height={50}
                          className="xsm:!h-[280px] m-auto xsm:!w-fit sm:!h-[400px] sm:!w-[400px]"
                        />
                      </div>
                    </SwiperSlide>
                  );
                });
              })}
            </Swiper>
          </div>

          <div
            className={`${styles.container} xsm:w-[100vw] xsm:mt-[8vh]  lg:mt-0 lg:w-[40vw] lg:pt-[8vh] xsm:!hidden lg:!block`}
          >
            <div
              className={`${styles.left} xsm:!h-[25vh] xsm:!pr-[2vw] sm:!h-[35vh] md:h-[50vh] lg:h-[40vh] xl:h-[50vh] xsm:!w-[80vw] lg:!w-[50vw] `}
            >
              <div
                className={`${styles.left_2} flex items-center justify-center xsm:h-[16vh] lg:!pl-[10vw] sm:h-[26vh] xl:h-[42vh] md:h-[40vh] lg:h-[36vh] `}
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
          <div className="xsm:pt-[1vh]  lg:!pt-[8vh] xl:pt-[3vh] !self-center bg-slate-100  lg:min-h-[70vh] h-fit lg:!mt-[-7vh] xxl:!mt-[-5vh] py-[2vh] xsm:w-[90vw] lg:w-[40vw] flex ">
            {result &&
              filterData.map((data, index) => {
                return (
                  <div className="xsm:pl-[2vw]" key={index}>
                    <h1 className="xl:text-xl  font-semibold xsm:text-md py-[1vw]">
                      {data.title}
                    </h1>
                    <p className="text-red-400 pt-1 font-bold">
                      -{data.offer}% off
                    </p>
                    <div className="flex gap-x-10 justify-between pt-1 items-center m-auto">
                      {data.offer !== null || 0 ? (
                        <p className="xl:text-lg xsm:text-[14px] text-green-400 flex flex-row-reverse gap-2 pb-[2vh] xsm:text-md xsm:font-semibold font-medium">
                          <s className="text-red-400">&#8377;{data.price}</s>
                          &#8377;
                          {Math.round(
                            data.price - (data.price / 100) * data.offer
                          )}
                        </p>
                      ) : (
                        <p className="text-lg   font-medium">{data.price}</p>
                      )}
                    </div>
                    <h2 className="xl:text-2xl pt-5 font-bold xsm:text-xl">
                      Product Specifications
                    </h2>

                    {data.highlight.split(",").map((res, index) => {
                      return (
                        <li
                          className="xl:text-[16px] xsm:text-[12px] pt-2 xsm:self-start xsm:pl-[2vw] sm:self-center sm:w-[35vw]"
                          key={index}
                        >
                          {res}.
                        </li>
                      );
                    })}

                    <div className="pt-10 flex lg:gap-5 xsm:pl-0   !gap-x-[6vw] xsm:w-[80vw]  sm:pr-[8vw] sm:w-[40vw] xl:!pl-0">
                      {go !== undefined ? (
                        <Link
                          href={`${
                            goCart ? "/profiles/cart" : "/profiles/SideNavbar#2"
                          }`}
                        >
                          <button className="bg-[--fifth-color] text-[#000] shadow-2xl hover:bg-[--second-color] hover:scale-105 hover:font-medium hover:text-white duration-1000 text-sm rounded-md w-[150px] !h-[40px] px-2">
                            <ShoppingCartCheckoutOutlinedIcon />
                            Go to Cart
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="bg-[var(--second-color)] text-[#fff] hover:bg-[--first-color] hover:scale-105 hover:font-medium hover:text-black duration-1000 xl:text-xl rounded-md w-[140px] !h-[40px] px-2"
                          onClick={() => {
                            isEmpty(getUser)
                              ? setLogin(true)
                              : handleClick(data._id, data);

                            dispatch(addproduct({ ...data }));
                          }}
                        >
                          <ShoppingCartCheckoutOutlinedIcon />
                          Add to Cart
                        </button>
                      )}

                      <button
                        className="bg-[var(--second-color)] lg:hidden hover:bg-[--first-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] xl:text-xl rounded-md w-[100px] !h-[40px] px-2"
                        onClick={() => {
                          setopenDraw(true);
                          setSize(260);
                        }}
                      >
                        Buy Now
                      </button>
                      <button
                        className="bg-[var(--second-color)] xsm:hidden lg:block hover:bg-[--first-color] hover:scale-105  hover:text-black duration-1000 hover:font-medium text-[#fff] xl:text-xl rounded-md !h-[40px] px-2"
                        onClick={() => {
                          isEmpty(getUser) ? setLogin(true) : setopenDraw(true);
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
                      <Buy id={router.query.id} address={address} />
                    </Drawer>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Modal
        open={login}
        width={1000}
        footer={false}
        onCancel={() => {
          setLogin(false);
        }}
      >
        <Login setLogin={setLogin} />;
      </Modal>
      <div>
        <TopProducts />
        <TopRated />
        <Bestdeals />
        <Categories />
      </div>
    </Spin>
  );
}
