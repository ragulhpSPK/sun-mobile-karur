/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListIcon from "@mui/icons-material/List";
import { Category } from "@/helper/categories";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  Image,
  List,
  Select,
  notification,
  Drawer,
  Modal,
  Collapse,
  Checkbox,
} from "antd";
import { SubCategory } from "@/helper/Subcategory";
import "rc-menu/assets/index.css";
import {
  getAllCatagory,
  getAllSubCatagory,
  getAllproducts,
  createCart,
  getAllCart,
  getOneUerforNav,
} from "../helper/utilities/apiHelper";
import { get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { Spin } from "antd";
import SyncIcon from "@mui/icons-material/Sync";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "@/redux/cartSlice";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Cookies from "js-cookie";
import Login from "@/pages/Authentication/Register";
import { showLoader, hideLoader } from "@/redux/loadingSlice";
function AllCat() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const cartSlice = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);
  const [id, setId] = useState();
  const [more, setMore] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [filerProduct, setFilerProduct] = useState([]);
  const [dummy, activateDummy] = useState();
  const [priceDummy, setPriceDummy] = useState(false);
  const router = useRouter();
  const { Meta } = Card;
  const [priceval, setPriceVal] = useState([]);
  const [loading, setLoading] = useState([]);
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [allProducts, setAllProducts] = useState(false);
  const [catDrawer, setCatDrawer] = useState(false);
  const [filDrawer, setFilDrawer] = useState(false);
  const [priceFilter, setPriceFilter] = useState();
  const [getUser, setGetUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [goCart, setGoGart] = useState([]);
  const [open, setOpen] = useState(null);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(showLoader());
      const result = [
        await getAllCatagory(),
        await getAllSubCatagory(),
        await getAllproducts(),
        await getAllCart(),
      ];
      const getUser = Cookies.get("x-o-t-p") && (await getOneUerforNav());
      setGetUser(get(getUser, "data.message[0]", []));

      setCategory(get(result, "[0].data.data", []));
      setSubCategory(get(result, "[1].data.data", []));
      setProducts(get(result, "[2].data.data", []));
      setCart(get(result, "[3].data.message", []));
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
    if (
      get(router, "query.cat_id", "") &&
      get(router, "query.subcat_id", "") &&
      get(router, "query.price", "")
    ) {
      setFilerProduct(
        products
          .filter((product) => {
            return (
              product.categoryId === router.query.cat_id &&
              product.SubCategoryId === router.query.subcat_id
            );
          })
          .sort((a, b) => {
            return get(router, "query.price", "") === "high"
              ? b.price - a.price
              : a.price - b.price;
          })
      );
    } else if (
      get(router, "query.cat_id", "") &&
      get(router, "query.price", "")
    ) {
      setFilerProduct(
        products
          .filter((product) => {
            return product.categoryId === router.query.cat_id;
          })
          .sort((a, b) => {
            return get(router, "query.price", "") === "high"
              ? b.price - a.price
              : a.price - b.price;
          })
      );
    } else if (
      get(router, "query._id", "") === "123" &&
      get(router, "query.price", "")
    ) {
      setFilerProduct(
        products
          .map((product) => {
            return product;
          })
          .sort((a, b) => {
            return get(router, "query.price", "") === "high"
              ? b.price - a.price
              : a.price - b.price;
          })
      );
    } else if (
      get(router, "query.cat_id", "") &&
      get(router, "query.subcat_id", "")
    ) {
      setFilerProduct(
        products.filter((product) => {
          return (
            product.categoryId === router.query.cat_id &&
            product.SubCategoryId === router.query.subcat_id
          );
        })
      );
      setPriceFilter();
    } else if (get(router, "query.cat_id", "")) {
      setFilerProduct(
        products.filter((product) => {
          return product.categoryId === router.query.cat_id;
        })
      );
      setPriceFilter();
    } else if (get(router, "query._id", "") === "123") {
      setFilerProduct(
        products.map((product) => {
          return product;
        })
      );
      setPriceFilter();
    }
    setId(router.query.cat_id);
  }, [
    get(router, "query.cat_id", ""),
    get(router, "query.subcat_id", ""),
    get(router, "query.price", ""),
    products,
  ]);

  const handleFilter = (catIt) => {
    try {
      setId(catIt);
      router.push({
        pathname: "/allCat",
        query: { cat_id: catIt },
      });
      activateDummy();
    } catch (e) {
      console.log(e);
    }
    setPriceDummy(false);
  };

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
      notification.success({ message: "product add to cart successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }

    dispatch(addproduct({ ...data }));
  };

  const handleSubCategoryFilterChange = (id) => {
    try {
      router.push({
        pathname: "/allCat",
        query: { cat_id: router.query.cat_id, subcat_id: id },
      });
      activateDummy(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePriceChange = (e) => {
    try {
      setPriceFilter(e);
      setId(router.query.cat_id);
      if (router.query._id === "123") {
        router.push({
          pathname: "/allCat",
          query: {
            _id: 123,

            price: e,
          },
        });
      } else {
        router.push({
          pathname: "/allCat",
          query: {
            cat_id: router.query.cat_id,
            price: e,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  const allProductsHandler = () => {
    router.push({ pathname: "/allCat", query: { _id: 123 } });
    setActive(true);
    console.log("click");
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
    });
    window.innerWidth < 640 ? setGoGart(true) : setGoGart(false);
  }, [goCart]);

  const handleOpensettings = (value) => {
    console.log("j");
    if (value === open) {
      setOpen(null);
    } else {
      setOpen(value);
    }
  };
  console.log(open);
  return (
    // <div className="min-h-screen w-screen flex justify-center pt-[10vh]">
    //   <div className="w-[90vw] flex justify-start">
    //     <div className="w-[20%] p-2">
    //       <div className="flex justify-between bg-white shadow w-[100%] h-[5vh] items-center p-1 rounded">
    //         <div
    //           onClick={() => {
    //             handleOpensettings("cat");
    //           }}
    //         >
    //           Categories
    //         </div>
    //         <KeyboardArrowDownIcon />
    //       </div>
    //       {open === "cat" ? (
    //         <div className="w-[100%] flex justify-center items-center flex-col pt-5 gap-y-5">
    //           <div className="w-[98%] flex border-2 border-slate-100 h-[5vh] justify-center items-center ">
    //             <SearchIcon sx={{ color: "lightgray" }} />
    //             <input
    //               type="text"
    //               className="outline-none border-none bg-white w-[90%] indent-4"
    //               placeholder="Search"
    //             />
    //           </div>
    //           <div className="w-[98%] flex h-[50vh] overflow-y-scroll justify-start items-start flex-col gap-y-2">
    //             {category.map((res, index) => {
    //               return (
    //                 <div key={index}>
    //                   <Checkbox>
    //                     <div className="text-[16px] ">{res.name}</div>
    //                   </Checkbox>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //     <div className="w-[60%]">second</div>
    //   </div>
    // </div>

    <Spin
      spinning={isLoading}
      size="large"
      tip="Loading data..."
      indicator={antIcon}
    >
      <div
        className={`${
          isLoading === true ? "invisible" : "visible"
        } xsm:hidden xxl:block mt-[14vh]`}
      >
        <div className="flex ">
          <div className="w-[16vw]  h-[85vh] overflow-scroll pl-20 leading-10 ">
            <div
              className={`flex items-center  font-bold pt-[3vh] ${
                router.query._id === "123"
                  ? "!text-[--third-color]"
                  : "text-black text-bold cursor-pointer"
              } `}
              onClick={allProductsHandler}
            >
              <ArrowRightIcon
                className={`${
                  active || router.query._id === "123" ? "visible" : "invisible"
                } cursor-pointer`}
              />

              <p
                className={`text-[16px] cursor-pointer   text-[--text-secondary]`}
              >
                All Categories
              </p>
            </div>

            {category.map((data) => {
              return (
                <>
                  <div
                    className="flex flex-col font-normal text-lg leading-10"
                    key={data._id}
                  >
                    <div>
                      <div
                        onClick={() => {
                          handleFilter(data._id);
                          setActive(false);
                        }}
                      >
                        <div
                          className={`${
                            data._id === id
                              ? "text-[--second-color] font-bold"
                              : "text-black"
                          } cursor-pointer flex space-x-10`}
                        >
                          <div className="flex items-center w-[16vw] ">
                            <ArrowRightIcon
                              className={`${
                                data._id === id ? "visible" : "invisible"
                              } `}
                            />
                            <p className="text-[--text-secondary]">
                              {data.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex flex-col w-[80vw]  ">
            <div className="w-[68vw]">
              <div className="ml-10 pt-[2vh]  flex justify-center items-center   !rounded-lg">
                <div className="flex gap-[5vw] pb-5">
                  <div className="pt-[15px]">
                    <Select
                      className="!w-[20vw]  shadow-inner rouned-lg"
                      size="large"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.value ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      value={dummy}
                      placeholder="Filter by Sub Category"
                      onChange={(e) => {
                        handleSubCategoryFilterChange(e);
                      }}
                    >
                      {subCategory
                        ?.filter((res) => {
                          return res.categoryId === router.query.cat_id;
                        })
                        .map((pre, index) => {
                          return (
                            <Select.Option key={index} value={pre._id}>
                              {pre.subcategoryname}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </div>

                  <div className="pt-[15px]">
                    <Select
                      className="!w-[20vw]  shadow-inner  rounded-md"
                      size="large"
                      placeholder="Filter by price"
                      value={priceFilter}
                      onChange={(e) => {
                        handlePriceChange(e);
                      }}
                    >
                      <Select.Option value={`low`}>Low to High</Select.Option>
                      <Select.Option value={`high`}>High to Low</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className=" overflow-y-scroll">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 3,
                  xxl: 4,
                }}
                pagination={{
                  pageSize: 8,
                  align: "end",
                  position: "top",
                  size: "small",
                }}
                className=" !w-[80vw]"
                dataSource={priceval.length > 0 ? priceval : filerProduct}
                renderItem={(data, index) => {
                  return (
                    <List.Item key={index} className="!mt-[1vh]">
                      <div>
                        <div className="flex  justify-end p-2"></div>
                        <Card
                          hoverable
                          style={{
                            width: 295,
                            height: 350,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            border: "none",
                          }}
                          className="shadow-md "
                          actions={[]}
                        >
                          <div
                            onClick={() =>
                              router.push({
                                pathname: `/product/${data._id}`,
                                query: { id: data._id },
                              })
                            }
                            className="flex flex-col items-center "
                          >
                            <Image
                              alt="example"
                              src={data.image[0]}
                              width={80}
                              height={80}
                              preview={false}
                              className="!h-[100px] !w-fit m-auto hover:scale-110 duration-1000"
                            />
                            <h1 className="text-[16px] pt-[2vh] w-[150px]  font-bold text-center  text-[--text-secondary]">
                              <span className="text-ellipsis  overflow-hidden line-clamp-1">
                                {data.title}
                              </span>
                            </h1>
                            <div className="flex gap-x-10 justify-between items-center m-auto">
                              {data.offer !== null || 0 ? (
                                <p className="xl:text-lg xsm:text-[14px] text-green-400 flex flex-row-reverse gap-2 pb-[2vh] xsm:text-md xsm:font-semibold font-medium">
                                  <s className="text-red-400">
                                    &#8377;{data.price}
                                  </s>
                                  &#8377;
                                  {Math.round(
                                    data.price - (data.price / 100) * data.offer
                                  )}
                                </p>
                              ) : (
                                <p className="text-lg   font-medium">
                                  {data.price}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center m-auto pt-[6vh] absolute left-[35px]">
                              {cart.find((res) => {
                                return res.productId === data._id;
                              }) ? (
                                <Link
                                  href={`${
                                    goCart
                                      ? "/profiles/cart"
                                      : "/profiles/SideNavbar#2"
                                  }`}
                                >
                                  <div
                                    className="absolute  xsm:left-0 xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                                  >
                                    <ShoppingCartCheckoutOutlinedIcon />
                                    <div>Go to Cart</div>
                                  </div>
                                </Link>
                              ) : (
                                <div
                                  className="absolute xsm:left-0 xsm:w-[60vw] sm:w-[30vw] md:w-[22vw] lg:w-[20vw] xl:w-[15vw] xxl:w-[12vw] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                                  onClick={() => {
                                    isEmpty(getUser)
                                      ? setLogin(true)
                                      : handleClick(data._id, data);

                                    dispatch(
                                      addproduct(
                                        !get(cartSlice, "products", false)
                                      )
                                    );
                                  }}
                                >
                                  <ShoppingCartCheckoutOutlinedIcon />
                                  <div>Add To Cart</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    </List.Item>
                  );
                }}
              ></List>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20vh] xxl:hidden">
        <div className=" flex h-[4vh] w-[90vw] m-auto p-[10px] items-center  text-black justify-between">
          <p
            className="text-[14px] flex items-end justify-center  text-[--text-secondary]"
            onClick={() => {
              setCatDrawer(!catDrawer);
            }}
          >
            <span>
              <ListIcon style={{ fontSize: "22px", textAlign: "center" }} />
            </span>
            {router.query._id === "123"
              ? "All products"
              : get(
                  category.filter((data) => {
                    return data._id == id;
                  })[0],
                  "name"
                )}
          </p>

          <p
            className={`text-[14px]  flex items-end justify-center  text-[--text-secondary] ${
              router.query.price || router.query.subcat_id
                ? "text-[--third-color] font-bold"
                : "text-black"
            }`}
            onClick={() => {
              setFilDrawer(!filDrawer);
            }}
          >
            <span>
              <FilterAltOutlinedIcon style={{ fontSize: "20px" }} />
            </span>
            Filters
          </p>

          <Drawer
            title="Basic Drawer"
            placement="left"
            onClose={() => {
              setCatDrawer(false);
            }}
            open={catDrawer}
            width={200}
          >
            <div>
              <div className="flex items-center pt-[4vh]">
                <p
                  onClick={allProductsHandler}
                  className={`${
                    router.query._id === "123"
                      ? "text-[--second-color] font-bold"
                      : "text-black"
                  } cursor-pointer flex space-x-8`}
                >
                  <ArrowRightIcon
                    className={`${
                      router.query._id === "123" ? "visible" : "invisible"
                    } text-[--second-color] pb-[3px] !text-2xl`}
                  />
                  <span className=" text-[--text-secondary]">All Products</span>
                </p>
              </div>

              {category.map((data) => {
                return (
                  <>
                    <div
                      className="flex flex-col font-normal text-md leading-8 "
                      key={data._id}
                    >
                      <div>
                        <div
                          onClick={() => {
                            handleFilter(data._id);
                          }}
                        >
                          <div
                            className={`${
                              data._id === id
                                ? "text-[--second-color] font-bold"
                                : "text-black"
                            } cursor-pointer flex space-x-10`}
                          >
                            <div className="flex items-center w-[100%]">
                              <ArrowRightIcon
                                className={`${
                                  data._id === id ? "visible" : "invisible"
                                }`}
                              />

                              <p className=" !text-[--text-secondary]">
                                {data.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </Drawer>

          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={() => {
              setFilDrawer(false);
            }}
            open={filDrawer}
            width={200}
          >
            <div className="flex flex-col  text-[--text-secondary]">
              <div>
                <h1 className="text-md  text-[--text-secondary]">
                  Select product Brands
                </h1>
                <Select
                  className="!w-[150px]  shadow-inner rouned-lg"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.value ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={dummy}
                  placeholder="Filter by Sub Category"
                  onChange={(e) => {
                    handleSubCategoryFilterChange(e);
                  }}
                >
                  {subCategory
                    ?.filter((res) => {
                      return res.categoryId === router.query.cat_id;
                    })
                    .map((pre, index) => {
                      return (
                        <Select.Option key={index} value={pre._id}>
                          {pre.subcategoryname}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
              <div className="pt-[4vh]">
                <h1 className="text-md  text-[--text-secondary]">
                  Filter By Price
                </h1>
                <Select
                  className="!w-[150px]   shadow-inner  rounded-md"
                  size="large"
                  placeholder="Filter by price"
                  value={priceFilter}
                  onChange={(e) => {
                    handlePriceChange(e);
                  }}
                >
                  <Select.Option value={`low`}>Low to High</Select.Option>
                  <Select.Option value={`high`}>High to Low</Select.Option>
                </Select>
              </div>
            </div>
          </Drawer>
        </div>
        <div className="  flex  justify-center items-center !w-[90vw] m-auto">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5,
            }}
            pagination={{
              pageSize: 20,
              align: "end",
              position: "top",
              size: "small",
            }}
            className="!w-[90vw]"
            dataSource={priceval.length > 0 ? priceval : filerProduct}
            renderItem={(data, index) => {
              return (
                <List.Item
                  key={index}
                  className="flex items-center justify-center "
                >
                  <Card
                    hoverable
                    style={{
                      width: 265,
                      height: 340,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "white",
                      alignSelf: "center",
                      margin: "auto",
                      border: "none",
                      marginTop: "30px",
                    }}
                    className="!shadow-lg "
                    actions={[]}
                  >
                    <div
                      onClick={() =>
                        router.push({
                          pathname: `/product/${data._id}`,
                          query: { id: data._id },
                        })
                      }
                      className="flex flex-col items-center justify-center"
                    >
                      <Image
                        alt="example"
                        src={data.image[0]}
                        width={50}
                        height={50}
                        preview={false}
                        className="xsm:!h-[10vh] md:!h-[10vh] pt-[1vh]  xl:!h-[10vh] w-fit hover:scale-110 duration-1000"
                      />
                      <h1 className="xsm:text-[14px]  text-[--text-secondary] md:text-[14px] md:leading-tight md:tracking-tight xsm:!pt-[5vh] md:!pt-[5vh] lg:pt-[1vh] xl:pt-[2vh]">
                        {data.title}
                      </h1>

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
                      <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center m-auto pt-[6vh] absolute left-[35px]">
                          {cart.find((res) => {
                            return res.productId === data._id;
                          }) ? (
                            <Link
                              href={`${
                                goCart
                                  ? "/profiles/cart"
                                  : "/profiles/SideNavbar#2"
                              }`}
                            >
                              <div
                                className="absolute  xsm:left-0 xsm:w-[180px] sm:w-[30vw] md:w-[160px] lg:w-[190px] flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
                  "
                              >
                                <ShoppingCartCheckoutOutlinedIcon />
                                <div>Go to Cart</div>
                              </div>
                            </Link>
                          ) : (
                            <div
                              className="absolute xsm:left-0 xsm:w-[180px] sm:w-[30vw] md:w-[160px] lg:w-[190px]  flex items-center justify-center gap-x-2 bg-[--second-color] text-white p-2 rounded
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
                  </Card>
                </List.Item>
              );
            }}
          ></List>
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
    </Spin>
  );
}

export default AllCat;
