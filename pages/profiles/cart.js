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
} from "../../helper/utilities/apiHelper";
import { get } from "lodash";
import Navbar from "@/components/Navbar";
import { v1 as uuidv1 } from "uuid";
import { addproduct } from "@/redux/cartSlice";
import CloseIcon from "@mui/icons-material/Close";

function Cart() {
  const [check, setCheck] = useState(false);
  const [Qty, setQty] = useState(1);
  const [bqty, setBqty] = useState(1);
  const [UID, setUID] = useState("");
  const router = useRouter();
  const [price, setPrice] = useState(router.query.price);
  const [products, setProduts] = useState();
  const [Buy, setBuy] = useState(false);
  const [draw, setDrawOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState([]);
  const [payment, setPayment] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState();
  uuidv1();

  const handleCheck = () => {
    setBuy(false);

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
    setLoading(true);
    try {
      const result = [await getAllCart(), await getAllproducts()];

      setProduts(get(result, "[0].data.message"));
      setAllProducts(get(result, "[1].data.data"));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    if (Object.keys(router.query).length > 0) {
      setBuy(true);
    }

    setPrice(bqty * router.query.price);
  }, [router.query, bqty]);

  useEffect(() => {
    setId(
      products &&
        products.map((data) => {
          return data._id;
        })
    );
  }, [products]);

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
      const formData = {
        quantity: e,
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
    console.log(e);
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
        },
      };
      await createOrder(formData);
      notification.success({ message: "order placed successfully" });
    } catch (err) {
      notification.failure({ message: "something went wrong" });
    }
  };

  const onChangeHandler = (e) => {
    setPayment(e.target.defaultValue);
  };

  const BuyId = allProducts
    .filter((data) => {
      return data._id === router.query._id;
    })
    .map((res) => {
      return res._id;
    });

  const antIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  return (
    <Spin
      spinning={loading}
      tip="Loading Data..."
      size="large"
      indicator={antIcon}
    >
      <div className="bg-[#ecf0f1] xsm:!w-[100vw] xsm:p-[1vh] sm:p-0 sm:w-[80vw] sm:h-[90vh]">
        <div className="flex gap-[4vw]">
          <div className=" m-auto flex flex-col  !gap-6   h-fit xsm:mt-[6vh] lg:mt-[20vh] ">
            <div className="flex justify-between  p-[1vh]">
              <h1 className="sm:!text-xl xl:text-3xl text-slate-700 ">
                Shopping cart
              </h1>
              <Button
                onClick={() => {
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
                        <p className="xsm:text-[8px] sm:text-[12px] lg:text-[16px] w-[25vw] font-semibold pl-[8px]">
                          {data.name}
                        </p>
                        <div
                          className="absolute top-10 right-0 pr-[10px]"
                          onClick={() => {
                            // setDeleteId(data._id);
                            deleteHandler(data._id);
                            dispatch(addproduct({ ...data }));
                          }}
                        >
                          <CloseIcon className="text-[20px]" />
                        </div>
                        <div className="pt-[10px] pr-[3vw]">
                          <p>&#8377;{data.price}</p>
                          <div className="flex justify-center items-center">
                            <InputNumber
                              min={1}
                              max={5}
                              defaultValue={data.quantity}
                              onChange={(e) => {
                                // setQty(e);
                                handleChange(data._id, e);
                              }}
                              className="xsm:w-[15vw] md:w-[4vw]"
                            />
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
          <Drawer open={draw} onClose={() => setDrawOpen(false)} width={size}>
            <div className=" shadow mt-[8vh] py-[5vh] pt-[2vh] mr-[3vw] rounded-md">
              <Form
                form={form}
                size="small"
                width={400}
                layout="vertical"
                onFinish={handleSubmit}
                className=" m-auto !text-white !text-lg"
              >
                <Form.Item
                  name="firstName"
                  label="Name"
                  rules={[
                    { required: true, message: "Please Enter Your Name" },
                  ]}
                  className="!text-white"
                >
                  <Input placeholder="Enter Your Name" />
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
                      Alternate Mobile number{" "}
                      <span className="text-slate-400">(optional)</span>
                    </span>
                  }
                  rules={[
                    { message: "Please Enter Your Alternate Mobile number" },
                  ]}
                >
                  <Input placeholder="Enter Your Alternate Mobile number" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={
                    <span>
                      Email Address
                      <span className="text-slate-400">(optional)</span>
                    </span>
                  }
                  rules={[{ message: "Please Enter Your Email Address" }]}
                >
                  <Input placeholder="Enter Your Alternate Mobile number" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label={<span>Address</span>}
                  rules={[
                    { required: true, message: "Please Enter Your Address" },
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
      </div>
    </Spin>
  );
}

export default Cart;
