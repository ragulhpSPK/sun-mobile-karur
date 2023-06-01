/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BestDeals } from "@/helper/bestDeals";
import Image from "next/image";
import {
  getAllproducts,
  createCart,
  getAllBanner,
  getAllCart,
  getOneUerforNav,
} from "@/helper/utilities/apiHelper";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import { Modal, Rate, Spin, notification } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Link from "next/link";
import Cookies from "js-cookie";
import Login from "@/pages/Authentication/Register";

import { isEmpty } from "lodash";
import { showLoader, hideLoader } from "@/redux/loadingSlice";

function Allbestdeals() {
  const [product, setProducts] = useState([]);
  const cartSlice = useSelector((state) => state.cart);
  const [banner, setBanner] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [goCart, setGoGart] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [cart, setCart] = useState([]);
  const [getUser, setGetUser] = useState([]);
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      dispatch(showLoader());
      const result = [
        await getAllproducts(),
        await getAllCart(),
        await getAllBanner(),
      ];
      const getUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setGetUser(get(getUser, "data.message[0]", []));

      setProducts(get(result, "[0].data.data"));
      setCart(get(result, "[1].data.message"));
      setBanner(get(result, "[2].data.data", []));
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
    setbestProducts(
      product.filter((data) => {
        return data.bestStatus === true;
      })
    );
  }, [product]);

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
      notification.failure({ message: "something went wrong" });
    }
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40 }} className="animate-spin" />
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
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div
        className={`${
          isLoading === true ? "invisible" : "visible"
        } xsm:w-[90vw] xl:w-[80vw] m-auto mt-[16vh]`}
      >
        <div className="!w-[85vw]">
          {banner
            .filter((data) => {
              return data.status === "Best Deals";
            })
            .map((res) => {
              return (
                <>
                  <div>
                    <Image
                      src={res.image}
                      alt="bestDeas"
                      width={100}
                      height={100}
                      className="xsm:w-[90vw] xsm:h-[15vh] sm:h-[24vh] md:h-[26vh] xl:w-[80vw] xl:!h-[35vh] cursor-pointer"
                    />
                  </div>
                </>
              );
            })}
        </div>

        <div className="grid xsm:grid-cols-1 xl:!grid-cols-4 mt-[3vh] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xsm:gap-10 xl:gap-14 ">
          {bestProducts.map((data, index) => {
            return (
              <div
                className="card xsm:w-[90vw]  sm:w-[40vw] md:w-[34vw] lg:w-[26vw] xl:w-[20vw] xxl:w-[18vw]  bg-base-100 shadow-xl "
                key={index}
              >
                <figure className="px-10 pt-10  cursor-pointer">
                  <Image
                    width={100}
                    height={100}
                    src={data.image[0]}
                    alt="Shoes"
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
                    className="font-bold m-auto text-center cursor-pointer"
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
                      <p className="text-lg   font-medium">{data.price}</p>
                    )}
                  </div>
                  <div
                    className="absolute bottom-9 xsm:!left:[10%] md:right-[58%] xl:right-[50%] xxl:right-[40%]  w-[15vw] flex items-center justify-center  gap-x-2  text-white p-2 rounded
                  "
                  >
                    {cart.find((res) => {
                      return res.productId === data._id;
                    }) ? (
                      <Link
                        href={`${
                          goCart ? "/profiles/cart" : "/profiles/SideNavbar#2"
                        }`}
                      >
                        <div className="absolute  cursor-pointer xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--fifth-color] text-white p-2 rounded">
                          <ShoppingCartCheckoutOutlinedIcon />
                          <div>Go to Cart</div>
                        </div>
                      </Link>
                    ) : (
                      <div
                        className="absolute top-2 xsm:left-[7vw] cursor-pointer sm:left-[1vw] md:left-[58%] lg:left-[50%] xl:left-[50%] xxl:left-[48%]   xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
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

export default Allbestdeals;
