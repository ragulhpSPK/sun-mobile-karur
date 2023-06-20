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
    <div className="min-h-screen w-screen flex justify-center pt-[10vh]">
      <div className="w-[90vw] flex justify-start">
        <div className="w-[20%] p-2">
          <div className="flex justify-between bg-white shadow w-[100%] h-[5vh] items-center p-1 rounded">
            <div
              onClick={() => {
                handleOpensettings("cat");
              }}
            >
              Categories
            </div>
            <KeyboardArrowDownIcon />
          </div>
          {open === "cat" ? (
            <div className="w-[100%] flex justify-center items-center flex-col pt-5 gap-y-5">
              <div className="w-[98%] flex border-2 border-slate-100 h-[5vh] justify-center items-center ">
                <SearchIcon sx={{ color: "lightgray" }} />
                <input
                  type="text"
                  className="outline-none border-none bg-white w-[90%] indent-4"
                  placeholder="Search"
                />
              </div>
              <div className="w-[98%] flex h-[50vh] overflow-y-scroll justify-start items-start flex-col gap-y-2">
                {category.map((res, index) => {
                  return (
                    <div key={index}>
                      <Checkbox>
                        <div className="text-[16px] ">{res.name}</div>
                      </Checkbox>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-[60%]">second</div>
      </div>
    </div>
  );
}

export default AllCat;

// import React from "react";

// function allCat() {
//   return <div>allCat</div>;
// }

// export default allCat;
