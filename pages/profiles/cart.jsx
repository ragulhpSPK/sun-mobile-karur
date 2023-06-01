/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "../../styles/form.module.css";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  getAllCart,
  deleteCart,
  updateCart,
  createOrder,
  getAllOrder,
  getAllproducts,
  getOneUerforNav,
} from "../../helper/utilities/apiHelper";
import { get } from "lodash";
import { v1 as uuidv1 } from "uuid";
import { addproduct } from "@/redux/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { showLoader, hideLoader } from "@/redux/loadingSlice";

function Cart() {
  const [check, setCheck] = useState(false);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const cart = useSelector((state) => state.cart);
  const [Qty, setQty] = useState("");
  const [bqty, setBqty] = useState(1);
  const [UID, setUID] = useState("");
  const router = useRouter();
  const [price, setPrice] = useState(router.query.price);
  const [products, setProduts] = useState();
  const [draw, setDrawOpen] = useState(false);
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [address, setAddress] = useState([]);
  const [size, setSize] = useState();
  uuidv1();

  console.log(cart, "erbjh");

  const handleCheck = () => {
    var today = new Date();
    const v1options = {
      clockseq: 0x1234,
      time: today.toLocaleTimeString({
        hour: "numeric",
        hour12: true,
        minute: "numeric",
      }),
      seconds: today.getSeconds(),
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
    };

    const res = uuidv1(v1options);
    setUID(res);
  };

  const fetchData = async () => {
    try {
      dispatch(showLoader());
      const result = [await getAllCart(), await getOneUerforNav()];
      setProduts(get(result, "[0].data.message"), []);
      setAddress(get(result, "[1].data.message"), []);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (data) => {
    try {
      await deleteCart(data);
      fetchData();
      notification.success({ message: "cart deleted successfully" });
    } catch {
      notification.error({ message: "Something went wrong" });
    }
  };

  const handleChange = async (data, e) => {
    try {
      // const formData = {
      //   quantity: e,
      //   id: data,
      // };
      // await updateCart(formData);
      // fetchData();
      notification.success({ message: "cart updated successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const IncrementQty = async (data) => {
    console.log(
      products.find((item) => {
        return item._id === data;
      }).quantity
    );

    try {
      const formData = {
        quantity:
          products.find((item) => {
            return item._id === data;
          }).quantity + 1,
        id: data,
      };
      await updateCart(formData);
      fetchData();
      notification.success({ message: "cart updated successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const DecrementQty = async (data) => {
    try {
      const formData = {
        quantity:
          products.find((item) => {
            return item._id === data;
          }).quantity - 1,
        id: data,
      };
      await updateCart(formData);
      fetchData();
      notification.success({ message: "cart updated successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  var prices = 0;
  products &&
    products.map((data) => {
      prices += data.quantity * data.total;
    });

  const handleSubmit = async (e) => {
    try {
      const formData = {
        data: {
          customerId: UID,
          customer: e.firstName,
          productname: products.map((data) => {
            return data.name + data.name;
          }),
          cartId: products.map((data) => {
            return data._id;
          }),
          image: products.map((data) => {
            return data.image;
          }),
          address: e.address,
          total: prices,
          status: "Confirmed",
          price: products.map((data) => {
            return data.price;
          }),
          paymentMethod: payment,
          number: e.number,
          alternateNumber: e.alternateNumber,
        },
      };
      await createOrder(formData);
      notification.success({ message: "order placed successfully" });
      fetchData();
    } catch (err) {
      notification.failure({ message: "something went wrong" });
    }
  };

  const onChangeHandler = (e) => {
    setPayment(e.target.defaultValue);
  };

  const antIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
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
        } bg-[#ecf0f1] overflow-y-scroll xsm:!w-[100vw] xsm:p-[1vh] xsm:pt-[10vh] sm:pt-0 sm:p-0 sm:w-[80vw] sm:h-[88vh]`}
      >
        {products && products.length === 0 ? (
          <div>
            <Image
              alt="cart"
              src="/assets/No_Product_Found.png"
              width={300}
              height={300}
              className="absolute  sm:left-[40vw] top-[30vh] animate-pulse"
            />
          </div>
        ) : (
          <div className="flex gap-[4vw]">
            <div className=" m-auto flex flex-col  !gap-6   h-fit xsm:mt-[6vh] lg:mt-[20vh] ">
              <div className="flex justify-between  p-[1vh]">
                <h1 className="sm:!text-xl xl:text-3xl text-slate-700 ">
                  Shopping cart
                </h1>
                <Button
                  onClick={() => {
                    form.setFieldValue({ address: "hfgkugh" });
                    setDrawOpen(true);
                    setSize(250);
                  }}
                  type="primary"
                  className="float-right sm:hidden"
                >
                  CheckOut
                </Button>
                <Button
                  onClick={() => {
                    setDrawOpen(true);
                    setSize(400);
                  }}
                  type="primary"
                  className="float-right xsm:hidden sm:block"
                >
                  CheckOut
                </Button>
              </div>
              {products &&
                products.map((data) => {
                  return (
                    <>
                      <div className="flex flex-col  sm:w-[50vw] xl:w-[50vw] shadow-sm p-[2vh] bg-[#E5E9EA] relative ">
                        <div className="flex justify-between items-center p-[10px]  py-[16px]">
                          <Image
                            src={data.image[0]}
                            alt="Image"
                            height={100}
                            width={100}
                            className="xsm:h-[4vh] xsm:w-fit lg:h-[6vh] xl:h-[6vh] rounded-full ml-[10px]"
                          />
                          <p className="xsm:text-[10px] sm:text-[12px] lg:text-[16px] w-[25vw] font-semibold pl-[8px]">
                            {data.name}
                          </p>
                          <div
                            className="absolute top-10 right-0 pr-[10px] cursor-pointer"
                            onClick={() => {
                              // setDeleteId(data._id);
                              deleteHandler(data._id);
                            }}
                          >
                            <CloseIcon
                              className="text-[20px]"
                              onClick={() => {
                                dispatch(
                                  addproduct(!get(cart, "products", false))
                                );
                              }}
                            />
                          </div>
                          <div className="pt-[10px] pr-[3vw]">
                            <p>&#8377;{data.price}</p>
                            <div className="flex justify-center items-center">
                              {/* <InputNumber
                                min={1}
                                max={5}
                                defaultValue={data.quantity}
                                onChange={(e) => {
                                  handleChange(data._id, e);
                                }}
                                className="xsm:w-[15vw] md:w-[4vw]"
                              /> */}

                              <div className="md:!w-[4vw] border-2 md:bg-white flex xsm:flex-col md:flex-row items-center justify-center gap-x-4">
                                <button
                                  onClick={() => {
                                    DecrementQty(data._id);
                                  }}
                                  className="text-black xsm:text-md md:text-2xl bg-[--third-color] xsm:px-[11px] md:!px-[11px]"
                                >
                                  -
                                </button>
                                <span>{data.quantity}</span>
                                <button
                                  onClick={() => {
                                    IncrementQty(data._id);
                                  }}
                                  className="text-black xsm:text-md xsm:!px-[9px] md:text-2xl bg-[--third-color]  md:!px-[8px]"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              <div className="flex flex-row-reverse shadow-sm bg-[#E5E9EA] justify-between  ">
                <div className="flex  p-[10px] xsm:text-lg sm:text-xl">
                  <p>Total Price:</p>
                  <p>{prices}</p>
                </div>
                <div className="flex  p-[10px] xsm:text-lg sm:text-xl">
                  <p>Total Products:</p>
                  <p className="pr-[12px]">{products && products.length}</p>
                </div>
              </div>
              <div className="p-[1vh]">
                <Button
                  type="primary"
                  onClick={() => router.push({ pathname: "/" })}
                  className="float-right !h-[35px]"
                >
                  Continue to Shopping
                </Button>
              </div>
            </div>

            <Drawer
              open={draw}
              destroyOnClose
              onClose={() => setDrawOpen(false)}
              width={size}
            >
              <div className=" shadow mt-[8vh] py-[5vh] pt-[2vh] mr-[3vw] rounded-md">
                <Form
                  size="small"
                  width={400}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className=" m-auto !text-white !text-lg"
                  form={form}
                  initialValues={{
                    firstName: address[0]?.firstName,
                    number: address[0]?.number,
                    alternateNumber: address[0]?.alternateNumber,
                    address: address[0]?.address,
                    email: address[0]?.email,
                  }}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name="firstName"
                    label="Name"
                    rules={[
                      { required: true, message: "Please Enter Your Name" },
                      {
                        type: "text",
                        message: "Name must be atleast 2 characters",
                      },
                      { min: 2 },
                    ]}
                    className="!text-white"
                  >
                    <Input placeholder="Enter Your Name" type="text" />
                  </Form.Item>
                  <Form.Item
                    name="number"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Mobile Number",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Your  Mobile number" />
                  </Form.Item>
                  <Form.Item
                    name="alternateNumber"
                    label={
                      <span>
                        Alternate Mobile number
                        <span className="text-slate-400">(optional)</span>
                      </span>
                    }
                  >
                    <Input
                      placeholder="Enter Your Alternate Mobile number"
                      defaultValue={91}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={
                      <span>
                        Email Address
                        <span className="text-slate-400">(optional)</span>
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                      },
                      { type: "email", message: "Enter valid email" },
                    ]}
                  >
                    <Input placeholder="Enter Your Alternate Mobile number" />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label={<span>Address</span>}
                    rules={[
                      { required: true, message: "Please Enter Your Address" },
                      {
                        min: 15,
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter Your Address" />
                  </Form.Item>
                  <Form.Item name="Payment">
                    <Checkbox
                      onChange={onChangeHandler}
                      defaultValue="Cash On Delivery"
                    >
                      Cash On Delivery
                    </Checkbox>
                  </Form.Item>

                  <Button
                    htmlType="submit"
                    className="w-[100%] m-auto !h-[5vh] !bg-[--second-color] hover:scale-95 hover:bg-[--fifth-color] hover:duration-1000"
                    onClick={handleCheck}
                  >
                    <span className="text-white text-lg tracking-wider">
                      Place Your Order
                    </span>
                  </Button>
                </Form>
              </div>
            </Drawer>
          </div>
        )}
      </div>
    </Spin>
  );
}

export default Cart;
