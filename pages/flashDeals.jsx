/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Image from "next/image";
import {
  getAllproducts,
  getAllCart,
  createCart,
  getOneUerforNav,
  getWishList,
  addWishList,
  deleteWishList,
} from "@/helper/utilities/apiHelper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";
import { Spin, Pagination, Drawer, Modal, notification } from "antd";
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import Link from "next/link";

import Cookies from "js-cookie";
import Login from "@/pages/Authentication/Register";
import { isEmpty } from "lodash";
import { showLoader, hideLoader } from "@/redux/loadingSlice";

function FlashDeals() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const cartSlice = useSelector((state) => state.cart);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProducts] = useState([]);
  const [goCart, setGoGart] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const [getUser, setGetUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [wishList, setWishList] = useState([]);

  const fetchData = async () => {
    try {
      dispatch(showLoader());
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
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      product.filter((data) => {
        return data.flashStatus === true;
      })
    );
  }, [product]);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  const handleClick = async (id, data) => {
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
      notification.error({ message: "something went wrong" });
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
    <Spin
      spinning={isLoading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div
        className={`${
          isLoading === true ? "invisible" : "visible"
        } xsm:w-[90vw] xl:w-[80vw] flex !flex-col m-auto mt-[10vh] h-[100vh] overflow-y-scroll`}
      >
        <div className="bg-[--third-color] xsm:w-[90vw] xl:w-[80vw] m-auto ">
          <div className="text-[6vw] text-white text-center xsm:p-[4vh] xl:p-[7vh]  ">
            <p>
              Flash
              <ElectricBoltIcon
                fontSize="10px duration-3000"
                className=" text-[yellow] "
              />
              Deals
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center pt-10 relative">
          <div className="grid xsm:grid-cols-1 xl:!grid-cols-4  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xsm:gap-10 xl:gap-14 ">
            {filteredProducts.map((data, index) => {
              return (
                <div
                  className="card xsm:w-[90vw]  sm:w-[40vw] md:w-[34vw] lg:w-[26vw] xl:w-[20vw] xxl:w-[18vw]  bg-base-100 shadow-xl "
                  key={index}
                >
                  <div className="flex  justify-end p-2">
                    <Rate
                      count={1}
                      character={<HeartOutlined />}
                      className="text-[--third-color]"
                      defaultValue={
                        _.find(wishList, function (obj) {
                          if (obj.productId === data._id) {
                            return true;
                          }
                        })?.productId === data._id
                          ? 1
                          : ""
                      }
                      onChange={(e) => {
                        handleWishList(e, data);
                      }}
                    />
                  </div>
                  <figure className="px-10 pt-10  cursor-pointer">
                    <Image
                      width={100}
                      height={100}
                      src={data.image[0]}
                      alt="flash products"
                      className="rounded-xl h-[15vh] !w-fit m-auto hover:scale-110 duration-1000 cursor-pointer"
                      onClick={() =>
                        router.push({
                          pathname: `/product/${data._id}`,
                          query: { id: data._id },
                        })
                      }
                    />
                  </figure>
                  <div className="card-body ">
                    <h2
                      className="font-bold m-auto text-center cursor-pointer  text-[--text-secondary]"
                      onClick={() =>
                        router.push({
                          pathname: `/product/${data._id}`,
                          query: { id: data._id },
                        })
                      }
                    >
                      {data.title}
                    </h2>
                    <Rate
                      allowHalf
                      defaultValue={2.5}
                      className="!text-sm p-[2vh]  m-auto"
                    />
                    <div className="flex gap-x-10 justify-between items-center m-auto">
                      {data.offer !== null || 0 ? (
                        <p className="xl:text-lg xsm:text-[14px] text-green-400 flex flex-row-reverse gap-2 pb-[2vh] xsm:text-md xsm:font-semibold font-medium">
                          <s className="text-red-400">&#8377;{data.price}</s>
                          &#8377;
                          {Math.round(
                            data.price - (data.price / 100) * data.offer
                          )}
                        </p>
                      ) : (
                        <p className="text-lg font-medium">{data.price}</p>
                      )}
                    </div>
                    <div className="absolute bottom-9 xsm:!left:[10%] md:right-[58%] xl:right-[50%] xxl:right-[40%]  w-[15vw] flex items-center justify-center  gap-x-2  text-white p-2 rounded">
                      {cart.find((res) => {
                        return res.productId === data._id;
                      }) ? (
                        <Link
                          href={`${
                            goCart ? "/profiles/cart" : "/profiles/SideNavbar#2"
                          }`}
                        >
                          <div className="absolute xsm:w-[60vw] cursor-pointer sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--fifth-color] text-white p-2 rounded">
                            <ShoppingCartCheckoutOutlinedIcon />
                            <div>Go to Cart</div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className="absolute top-2 xsm:left-[7vw] cursor-pointer sm:left-[1vw] md:left-[58%] lg:left-[50%] xl:left-[50%] xxl:left-[48%]   xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded "
                          onClick={() => {
                            isEmpty(getUser)
                              ? setLogin(true)
                              : handleClick(data._id, data);

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
                </div>
              );
            })}
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
      </div>
    </Spin>
  );
}

export default FlashDeals;
