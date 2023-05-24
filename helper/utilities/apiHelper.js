import axios from "axios";
import Cookies from "js-cookie";

// Categories starting
export const createCatagory = (formData) => {
  return axios.post("/api/catagory", formData);
};

export const getAllCatagory = () => {
  return axios.get("/api/catagory");
};

export const updateCatagory = (formData) => {
  return axios.put("/api/catagory", formData);
};

export const deleteCatagory = (formData) => {
  return axios.delete(`/api/catagory/${formData}`);
};
// categories ended...

//SubCategory Starting
export const createSubCatagory = (formData) => {
  return axios.post("/api/subcategory", formData);
};
export const getAllSubCatagory = () => {
  return axios.get("/api/subcategory");
};

export const updateSubCategory = (formData) => {
  return axios.put("/api/subcategory", formData);
};

export const deleteSubCategory = (formData) => {
  return axios.delete(`/api/subcategory/${formData}`);
};
//SubCategory ended...

//products Starting...
export const createProducts = (formData) => {
  return axios.post("/api/products", formData);
};

export const getAllproducts = () => {
  return axios.get("/api/products");
};

export const updateProducts = (formData) => {
  return axios.put("/api/products", formData);
};

export const deleteProducts = (formData) => {
  return axios.delete(`/api/products/${formData}`);
};
//product Ended...

//Banner starting...
export const createBanner = (formData) => {
  return axios.post("/api/banner", formData);
};

export const getAllBanner = () => {
  return axios.get("/api/banner");
};

export const updateBanner = (formData) => {
  return axios.put("/api/banner", formData);
};

export const deleteBanner = (formData) => {
  return axios.delete(`/api/banner/${formData}`);
};

//Banner ended....

//Cart Starting...
export const createCart = (formData) => {
  return axios.post("/api/cart", formData);
};

export const getAllCart = () => {
  return axios.get("/api/cart");
};

export const updateCart = (formData) => {
  return axios.put("/api/cart", formData);
};

export const deleteCart = (formData) => {
  return axios.delete(`/api/cart/${formData}`);
};
// Banner

// Order Stating

export const createOrder = (formData) => {
  return axios.post("/api/order", formData);
};

export const getAllOrder = () => {
  return axios.get("/api/order");
};

export const updateOrder = (formData) => {
  return axios.put("/api/order/", formData);
};

export const deleteOrder = (formData) => {
  return axios.delete(`/api/order/${formData}`);
};

// Order Ended

//dashboard orders

export const getDashBoardOrder = () => {
  return axios.get("/api/dasboard");
};

//dashboard emded

// Auth Started

export const getAllMessage = () => {
  return axios.get("/api/auth");
};

export const createMessage = (formData) => {
  return axios.post("/api/auth", formData);
};

//Auth Ended

//Top Products

export const addOrRemoveTopProducts = (formData) => {
  axios.put(`/api/TopProducts/`, formData);
};

//Flash deals

export const addOrRemoveFlash = (formData) => {
  axios.put(`/api/flashDeals/`, formData);
};

//best deals

export const addOrRemoveBest = (formData) => {
  console.log(formData);
  axios.put(`/api/bestDeals/`, formData);
};

// authentication

export const authHandler = (formData) => {
  return axios.post(`/api/auth/`, formData);
};

export const getOneUer = (formData) => {
  return axios.get(`/api/auth/${formData}`);
};

export const getOneUerforNav = () => {
  return axios.get(`/api/auth/`);
};

export const userProfile = (formData) => {
  console.log(formData, "deuhrinj");
  return axios.put(`/api/auth/raw`, formData);
};
