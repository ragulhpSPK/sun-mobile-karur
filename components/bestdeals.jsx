import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Modal, Rate, Skeleton, notification } from "antd";
import { flashdeals } from "@/helper/flashdeals";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {
  getAllproducts,
  getAllCart,
  createCart,
  getOneUerforNav,
  addWishList,
  getWishList,
  deleteWishList,
} from "@/helper/utilities/apiHelper";
import { useEffect } from "react";
import { get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Cookies from "js-cookie";
import Login from "@/pages/Authentication/Register";
import { addproduct } from "@/redux/cartSlice";
import { HeartOutlined } from "@ant-design/icons";

function Bestdeals() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const cartSlice = useSelector((state) => state.cart);
  const [product, setProducts] = useState([]);
  const [getUser, setGetUser] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [login, setLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [goCart, setGoGart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const fetchData = async () => {
    try {
      const result = [
        await getAllproducts(),
        await getAllCart(),
        await getWishList(),
      ];
      const getUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setGetUser(get(getUser, "data.message[0]", []));
      setProducts(get(result, "[0].data.data"));
      setCart(get(result, "[1].data.message"));
      setWishList(get(result, "[2].data.data"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setbestProducts(
      product.filter((data) => {
        return data.bestStatus === true;
      })
    );
  }, [product]);

  const handleClick = async (data) => {
    try {
      const formData = {
        data: {
          productId: data._id,
          image: data.image,
          name: data.title,
          price: data.price,
          total: data.price,
          quantity: 1,
        },
      };
      await createCart(formData);
      fetchData();
      notification.success({ message: "added to cart successfully" });
    } catch (err) {
      notification.failure({ message: "something went wrong" });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
    });
    window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
  }, [goCart]);

  const handleWishList = async (data, product) => {
    if (data === 1) {
      try {
        const formData = {
          image: product.image[0],
          title: product.title,
          productId: product._id,
        };

        await addWishList(formData);
        notification.success({ message: "added to wishlist successfully" });
        fetchData();
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    } else {
      try {
        await deleteWishList(
          wishList.filter((data) => {
            return data.productId === product._id;
          })[0]._id
        );
        notification.success({ message: "cart deleted successfully" });
        fetchData();
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    }
  };

  return (
    <div
      className="flex flex-col  !w-[90vw] xl:!w-[80vw] mt-0 pt-0  m-auto justify-center"
      data-theme="lightmode"
    >
      <div className=" flex items-center justify-center">
        <div className="flex flex-row w-[90vw] justify-between  ">
          <div className="xl:text-2xl  font-bold text-[--text-primary] ">
            Best Deals Today
          </div>
          <Link href="/Allbestdeals">
            <div className={`xl:text-2xl font-bold text-[--text-primary]`}>
              View all
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="w-[80vw] xl:w-[80vw]  flex  justify-center flex-wrap gap-10 ">
          <Swiper
            freeMode={true}
            autoplay={true}
            modules={[FreeMode, Pagination, Autoplay]}
            className="  !bg-white !flex !items-center !justify-center !p-2"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1520: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {bestProducts.map((res, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className="card  bg-base-100  shadow-sm xl:shadow-xl m-auto"
                    key={index}
                    data-theme="primary"
                  >
                    <div className="flex  justify-end p-2">
                      <Rate
                        count={1}
                        character={<HeartOutlined />}
                        className="text-[--third-color]"
                        onChange={(e) => {
                          handleWishList(e, res);
                        }}
                        defaultValue={
                          _.find(wishList, function (obj) {
                            if (obj.productId === res._id) {
                              return true;
                            }
                          })?.productId === res._id
                            ? 1
                            : ""
                        }
                      />
                    </div>
                    <figure className="xl:px-10   cursor-pointer">
                      <div
                        onClick={() =>
                          router.push({
                            pathname: `/product/${res._id}`,
                            query: { id: res._id },
                          })
                        }
                      >
                        <Image
                          width={100}
                          height={100}
                          src={res.image[0]}
                          alt="best deals"
                          className="rounded-xl xsm:!h-[14vh] xl:!h-[18vh] !w-fit m-auto hover:scale-110 duration-1000"
                        />
                      </div>
                    </figure>
                    <div className="card-body ">
                      <div className="h-[8vh] flex items-center justify-center">
                        <h2
                          className="font-bold xsm:text-[12px] w-[180px] text-center pt-[1vh] lg:text-[16px] cursor-pointer text-[--text-secondary]"
                          onClick={() =>
                            router.push({
                              pathname: `/product/${res._id}`,
                              query: { id: res._id },
                            })
                          }
                        >
                          <span className="text-ellipsis overflow-hidden line-clamp-2">
                            {res.title}
                          </span>
                        </h2>
                      </div>

                      <Rate
                        allowHalf
                        defaultValue={2.5}
                        className="!text-sm pt-[1vh] text-center"
                      />
                      <div className="flex gap-x-10 justify-between pb-[3vh] xsm:text-[12px] items-center m-auto">
                        {res.bestOffer !== null || 0 ? (
                          <p className="xl:text-lg xsm:text-[14px] text-green-400 flex flex-row-reverse gap-2 pb-[1vh] xsm:text-md xsm:font-semibold font-medium">
                            <s className="text-red-400">&#8377;{res.price}</s>
                            &#8377;
                            {Math.round(
                              res.price - (res.price / 100) * res.offer
                            )}
                          </p>
                        ) : (
                          <p className="text-lg font-medium">{res.price}</p>
                        )}
                      </div>

                      {cart.find((data) => {
                        return data.productId === res._id;
                      }) ? (
                        <Link
                          href={`${
                            goCart ? "/profiles/cart" : "/profiles/SideNavbar#2"
                          }`}
                        >
                          <div
                            className="absolute bottom-5 xsm:left-[15%] lg:left-[12%] xsm:w-[80%] xl:left-[28%] cursor-pointer xxl:left-[17%] bg-[--fifth-color]  xl:!w-[12vw] m-auto flex items-center justify-center gap-x-2  text-white p-2 rounded
                  "
                          >
                            <ShoppingCartCheckoutOutlinedIcon />
                            <div>Go to Cart</div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className="absolute bottom-5 xsm:left-[15%] cursor-pointer lg:left-[12%] xsm:w-[80%] xl:left-[28%] xxl:left-[17%]   xl:!w-[12vw] m-auto flex items-center justify-center gap-x-2 bg-[--third-color] text-white p-2 rounded"
                          onClick={() => {
                            isEmpty(getUser)
                              ? setLogin(true)
                              : handleClick(res._id, res);

                            dispatch(
                              addproduct(!get(cartSlice, "products", false))
                            );
                          }}
                        >
                          <ShoppingCartCheckoutOutlinedIcon />
                          <div>Add To Cart</div>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
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
      </div>
    </div>
  );
}

export default Bestdeals;
