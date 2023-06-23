import { Image, Skeleton, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  getWishList,
  createCart,
  getAllproducts,
  deleteWishList,
  getAllCart,
} from "@/helper/utilities/apiHelper";
import { DeleteOutline } from "@mui/icons-material";
import { get } from "lodash";
import { addproduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";

function WishList() {
  const [wishList, setWishList] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const cartSlice = useSelector((state) => state.cart);
  const [goCart, setGoGart] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = [
        await getWishList(),
        await getAllproducts(),
        await getAllCart(),
      ];
      console.log(result);
      setWishList(get(result, "[0]data.data"));
      setProducts(get(result, "[1]data.data"));
      setCart(get(result, "[2]data.message"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteWishList = async (data) => {
    try {
      setLoading(true);
      await deleteWishList(data._id);
      fetchData();
      notification.success({ message: "Wishlist deleted successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCart = async (data) => {
    console.log(
      products.filter((res) => {
        return res._id === data.productId;
      })[0].price,
      "poooo"
    );

    try {
      const formData = {
        data: {
          productId: products.filter((res) => {
            return res._id === data.productId;
          })[0]._id,
          image: products.filter((res) => {
            return res._id === data.productId;
          })[0].image,
          name: products.filter((res) => {
            return res._id === data.productId;
          })[0].title,
          price: products.filter((res) => {
            return res._id === data.productId;
          })[0].price,
          total: products.filter((res) => {
            return res._id === data.productId;
          })[0].price,
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

  return (
    <div className="pt-[15vh] w-[100vw] h-screen overflow-y-scroll bg-[#ecf0f1] ">
      {wishList.length === 0 ? (
        <div className="flex flex-col items-center justify-center lg:gap-6 lg:mt-10">
          <Image
            src="/assets/wish/heart.png"
            alt="no found"
            width={400}
            height={400}
            preview={false}
          />
          <h1 className="xsm:text-xl lg:text-4xl text-slate-500 font-bold">
            Your WishList is Empty
          </h1>
          <Link
            href="/"
            className="bg-[--second-color] flex items-center  gap-1 text-white font-bold py-2 px-2 rounded-md"
          >
            Create New Wish
            <span>
              <FavoriteIcon className="text-[20px]" />
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-2xl pb-2 text-[--text-primary] font-bold tracking-widest">
              WishList
            </h1>
          </div>
          <div className="flex xsm:w-[100%] lg:w-[70%] justify-between p-4 rounded-md text-[12px] lg:text-lg font-bold  !text-[--text-secondary] bg-[#E5E9EA]">
            <div>Image</div>
            <div>Title</div>
            <div>Cart</div>
            <div>Delete</div>
          </div>
          {wishList.map((data, i) => {
            return (
              <Skeleton
                key={i}
                loading={loading}
                className="xsm:w-[100%] lg:!w-[70%] m-auto"
              >
                <div className="flex xsm:w-[100%] xsm:p-2 lg:w-[70%] items-center justify-between lg:p-4 mt-5 rounded-md text-[12px] lg:text-[16px] font-bold  !text-[--text-secondary] bg-[#E5E9EA]">
                  <div>
                    <Image
                      alt="wish"
                      src={data.image}
                      width={60}
                      height={60}
                      preview={false}
                      className="cursor-pointer rounded-md"
                      onClick={() =>
                        router.push({
                          pathname: `/product/${data.productId}`,
                          query: { id: data.productId },
                        })
                      }
                    />
                  </div>
                  <div className="xsm:w-[80px] lg:w-[200px] xl:w-[320px]">
                    <h1
                      className="text-ellipsis overflow-hidden line-clamp-2 cursor-pointer"
                      onClick={() =>
                        router.push({
                          pathname: `/product/${data.productId}`,
                          query: { id: data.productId },
                        })
                      }
                    >
                      {data.title}
                    </h1>
                  </div>
                  <div className="sm:w-[25vw] lg:w-[20vw] xl:w-[14vw]">
                    {cart.find((res) => {
                      return res.productId === data.productId;
                    })?.productId === data.productId ? (
                      <Link
                        href={`${
                          goCart ? "/profiles/cart" : "/profiles/SideNavbar#2"
                        }`}
                        className="flex gap-2 items-center bg-[--second-color] cursor-pointer justify-center xsm:w-[25vw] sm:w-[15vw] lg:w-[120px]  py-2 rounded-lg"
                      >
                        Go to cart
                      </Link>
                    ) : (
                      <span
                        className="flex gap-2 items-center justify-center cursor-pointer bg-[--second-color] xsm:w-[25vw] sm:w-[15vw] lg:w-[120px]  py-2 rounded-lg"
                        onClick={() => {
                          handleCreateCart(data);
                          dispatch(
                            addproduct(!get(cartSlice, "products", false))
                          );
                        }}
                      >
                        Add to Cart
                      </span>
                    )}
                  </div>
                  <div
                    className="cursor-pointer flex  md:pr-4"
                    onClick={() => handleDeleteWishList(data)}
                  >
                    <DeleteOutline />
                  </div>
                </div>
              </Skeleton>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WishList;
