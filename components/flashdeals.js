import { Divider, Rate, notification } from "antd";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import Link from "next/link";
import {
  getAllproducts,
  createCart,
  getAllCart,
} from "@/helper/utilities/apiHelper";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import { useRouter } from "next/router";

const TopRated = () => {
  const [product, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const result = [await getAllproducts(), await getAllCart()];
      console.log(result);
      setProducts(get(result, "[0].data.data"));
      setCart(get(result, "[1].data.message"));
    } catch (err) {
      console.log(err);
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

  return (
    <div className="flex flex-col mt-[5vh] !w-[90vw] xl:!w-[80vw]  m-auto justify-center">
      <div className=" flex items-center xl:!w-[80vw] justify-center">
        <div className="flex flex-row w-[90vw] justify-between  ">
          <div className="xl:text-2xl  font-bold text-[--second-color]">
            Flash Deals
          </div>
          <Link href="/Allbestdeals">
            <div className="xl:text-2xl font-bold text-[--second-color]">
              see more
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="xsm:!w-[90vw] xl:!w-[80vw]  flex  justify-center flex-wrap gap-10 ">
          <Swiper
            freeMode={true}
            autoplay={true}
            modules={[FreeMode, Pagination, Autoplay]}
            className="  !bg-white !flex !items-center !justify-center !p-2 "
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
            {filteredProducts.map((res, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className="card  bg-base-100  shadow-sm xl:shadow-xl m-auto"
                    key={index}
                  >
                    <figure className="xl:px-10 pt-10  cursor-pointer">
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
                          alt="Shoes"
                          className="rounded-xl xsm:h-[10vh] xl:h-[16vh] !w-fit m-auto"
                        />
                      </div>
                    </figure>
                    <div className="card-body ">
                      <div className="h-[6vh]">
                        <h2
                          className="font-bold text-center p-[1vh]"
                          onClick={() =>
                            router.push({
                              pathname: `/product/${res._id}`,
                              query: { id: res._id },
                            })
                          }
                        >
                          {res.title}
                        </h2>
                      </div>

                      <Rate
                        allowHalf
                        defaultValue={2.5}
                        className="!text-sm p-[3vh] text-center"
                      />
                      <div className="flex gap-x-10 justify-between pb-[3vh] items-center m-auto">
                        {res.bestOffer !== null || 0 ? (
                          <p className="xl:text-lg xsm:text-[14px] text-green-400 flex flex-row-reverse gap-2 pb-[2vh] xsm:text-md xsm:font-semibold font-medium">
                            <s className="text-red-400">&#8377;{res.price}</s>
                            &#8377;
                            {Math.round(
                              res.price - (res.price / 100) * res.offer
                            )}
                          </p>
                        ) : (
                          <p className="text-lg   font-medium">{res.price}</p>
                        )}
                      </div>
                      {cart.find((data) => {
                        return data.productId === res._id;
                      }) ? (
                        <Link href="/profiles/cart">
                          <div
                            className="absolute bottom-5 xsm:w-[80%] xl:!w-[12vw] m-auto flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                          >
                            <ShoppingCartOutlined />
                            <div>Go to Cart</div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className="absolute bottom-5 xsm:w-[80%] xl:!w-[12vw] m-auto flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                          onClick={() => {
                            handleClick(res._id, res);
                            dispatch(addproduct({ ...res }));
                          }}
                        >
                          <ShoppingCartOutlined />
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
      </div>
    </div>
  );
};

export default TopRated;
