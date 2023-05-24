import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Image from "next/image";
import {
  getAllproducts,
  getAllCart,
  createCart,
} from "@/helper/utilities/apiHelper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";
import { Spin, Pagination, Drawer } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Buy from "./buy";
import { Rate } from "antd";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { useDispatch } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";

function FlashDeals() {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();

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
      notification.failure({ message: "something went wrong" });
    }
  };

  return (
    <Spin
      spinning={loading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div className="bg-[--third-color] w-[80vw] m-auto ">
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

      <div className="w-[80vw] m-auto xsm:mt-5 xsm:grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 xl:!grid-cols-3 grid xxl:!grid-cols-5  xxl:gap-14 ">
        {filteredProducts.map((data, index) => {
          return (
            <>
              <div className="card w-[20vw] bg-base-100 shadow-xl " key={index}>
                <figure className="px-10 pt-10  cursor-pointer">
                  <Image
                    width={100}
                    height={100}
                    src={data.image[0]}
                    alt="Shoes"
                    className="rounded-xl h-[12vh] !w-fit m-auto"
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
                    className="font-bold"
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
                    className="!text-sm p-[2vh]"
                  />
                  <div className="flex gap-x-10 justify-between items-center pb-[1vh] m-auto">
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

                  {cart.find((res) => {
                    return res.productId === data._id;
                  }) ? (
                    <Link href="/profiles/cart">
                      <div
                        className="absolute bottom-5  w-[15vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                      >
                        <ShoppingCartOutlined />
                        <div>Go to Cart</div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="absolute bottom-5 w-[15vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
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
            </>
          );
        })}
      </div>
    </Spin>
  );
}

export default FlashDeals;
