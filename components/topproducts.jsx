/* eslint-disable react-hooks/exhaustive-deps */
import { TopProducts } from "@/helper/topProducts";
import Image from "next/image";
import React from "react";
import {
  getAllproducts,
  createCart,
  getAllCart,
  getOneUerforNav,
} from "@/helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Modal, notification, Rate } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Link from "next/link";

import Cookies from "js-cookie";
import Login from "@/pages/Authentication/Register";

function Topproducts() {
  const cartSlice = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  // const [topProducts,setTopProducts] = useState([])
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState(false);
  const [getUser, setGetUser] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [goCart, setGoGart] = useState([]);

  const fetchData = async () => {
    try {
      const result = [await getAllproducts(), await getAllCart()];
      const getUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setGetUser(get(getUser, "data.message[0]", []));

      setProducts(get(result, "[0].data.data"));
      setCart(get(result, "[1].data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (err) {}
  };

  let topProducts = products.filter((data) => {
    return data.status === true;
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
    });
    window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
  }, [goCart]);

  return (
    <div className="mt-[4vh]">
      <div className="w-[80vw] m-auto ">
        <div className="xl:text-2xl font-bold text-[--second-color]">
          Popular Products
        </div>
        <div className="w-[80vw] pt-4  justify-start grid xsm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {topProducts.map((res, index) => {
            return (
              <div
                className="card xsm:w-[80vw] sm:w-[35vw] lg:w-[26vw] xl:w-[20vw] bg-base-100 shadow-xl "
                key={index}
              >
                <figure className="px-10 pt-10  cursor-pointer">
                  <Image
                    width={100}
                    height={100}
                    src={res.image[0]}
                    alt="Shoes"
                    className="rounded-xl h-[15vh] !w-fit m-auto hover:scale-110 duration-1000"
                    onClick={() =>
                      router.push({
                        pathname: `/product/${res._id}`,
                        query: { id: res._id },
                      })
                    }
                  />
                </figure>
                <div className="card-body ">
                  <h2
                    className="font-bold xsm:text-[12px] cursor-pointer lg:text-[16px] text-center"
                    onClick={() =>
                      router.push({
                        pathname: `/product/${res._id}`,
                        query: { id: res._id },
                      })
                    }
                  >
                    {res.title}
                  </h2>
                  <Rate
                    allowHalf
                    defaultValue={2.5}
                    className="!text-sm p-[2vh] m-auto"
                  />
                  <div className="flex gap-x-10 xsm:text-[12px] justify-between pb-[3vh] m-auto items-center">
                    {res.offer !== null || 0 ? (
                      <p className="xl:text-lg xsm:text-[14px] text-green-400 flex flex-row-reverse gap-2 pb-[2vh] xsm:text-md xsm:font-semibold font-medium">
                        <s className="text-red-400">&#8377;{res.price}</s>
                        &#8377;
                        {Math.round(res.price - (res.price / 100) * res.offer)}
                      </p>
                    ) : (
                      <p className="text-lg   font-medium">{res.price}</p>
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
                        className="absolute bottom-5 cursor-pointer xsm:left-[10%] xsm:!w-[80%] xl:w-[15vw] flex items-center justify-center gap-x-2 bg-[--fifth-color] text-white p-2 rounded
                  "
                      >
                        <ShoppingCartCheckoutOutlinedIcon />
                        <div>Go to Cart</div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="absolute bottom-5 cursor-pointer xsm:left-[10%] xsm:!w-[80%] xl:w-[15vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
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
  );
}

export default Topproducts;
