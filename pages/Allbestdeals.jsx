import React from "react";
import { BestDeals } from "@/helper/bestDeals";
import Image from "next/image";
import {
  getAllproducts,
  createCart,
  getAllBanner,
  getAllCart,
} from "@/helper/utilities/apiHelper";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import { Rate, Spin, notification } from "antd";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";

function Allbestdeals() {
  const [product, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    try {
      const result = [
        await getAllproducts(),
        await getAllCart(),
        await getAllBanner(),
      ];
      console.log(result);
      setProducts(get(result, "[0].data.data"));
      setCart(get(result, "[1].data.message"));
      setBanner(get(result, "[2].data.data", []));
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

  console.log(banner, "dfj");

  return (
    <Spin
      spinning={loading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div className="xsm:w-[90vw] xl:w-[80vw] m-auto mt-[20vh]">
        {banner
          .filter((data) => {
            console.log(data);
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
                    className="xsm:w-[90vw] xsm:h-[18vh] sm:h-[24vh] md:h-[26vh] xl:w-[80vw] xl:!h-[35vh]"
                  />
                </div>
              </>
            );
          })}

        <div className="flex items-center justify-center pt-10 relative">
          <div className="grid xsm:grid-cols-1 xl:grid-cols-4 xxl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 xsm:gap-10 xl:gap-24 ">
            {bestProducts.map((data, index) => {
              return (
                <div
                  className="card xsm:w-[80vw] sm:w-[40vw] md:w-[28vw] xl:w-[20vw] xxl:w-[16vw] bg-base-100 shadow-xl "
                  key={index}
                >
                  <figure className="px-10 pt-10  cursor-pointer">
                    <Image
                      width={100}
                      height={100}
                      src={data.image[0]}
                      alt="Shoes"
                      className="rounded-xl h-[15vh] !w-fit m-auto"
                    />
                  </figure>
                  <div className="card-body ">
                    <h2 className="font-bold">{data.title}</h2>
                    <Rate
                      allowHalf
                      defaultValue={2.5}
                      className="!text-sm p-[2vh]"
                    />
                    <div className="flex gap-x-10 justify-between items-center">
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
                      className="absolute bottom-5 w-[15vw] flex items-center justify-center  gap-x-2  text-white p-2 rounded
                  "
                    >
                      {cart.find((res) => {
                        return res.productId === data._id;
                      }) ? (
                        <Link href="/profiles/cart">
                          <div
                            className="absolute  xsm:left-0 xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                          >
                            <ShoppingCartOutlined />
                            <div>Go to Cart</div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className="absolute xsm:left-0 xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                          onClick={() => {
                            handleClick(data._id, data);
                            dispatch(addproduct({ ...data }));
                          }}
                        >
                          <ShoppingCartOutlined />
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
      </div>
    </Spin>
  );
}

export default Allbestdeals;
