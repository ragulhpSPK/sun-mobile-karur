import React from "react";
import {
  getAllproducts,
  createOrder,
  getOneUerforNav,
} from "../helper/utilities/apiHelper";
import { useEffect } from "react";
import { get } from "lodash";
import { useState } from "react";
import {
  Form,
  Image,
  Input,
  InputNumber,
  Checkbox,
  Button,
  notification,
  Skeleton,
} from "antd";
import { v1 as uuidv1 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loadingSlice";

function Buy({ id, address }) {
  const [products, setProducts] = useState();
  const [qty, setQty] = useState(1);
  const [UID, setUID] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [payment, setPayment] = useState("");
  const isLoading = useSelector((state) => state.loader.isLoading);

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
      showLoader();
      const result = [await getAllproducts()];
      setProducts(get(result, "[0]data.data", []));
    } catch (err) {
      console.error(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (data, i) => {
    setQty(i);
  };

  const handleSubmit = async (e) => {
    try {
      const formData = {
        data: {
          customerId: UID,
          customer: e.firstName,
          productname: products.filter((data) => {
            return data._id === id;
          })[0].title,
          cartId: products.filter((data) => {
            return data._id === id;
          })[0]._id,
          image: products.filter((data) => {
            return data._id === id;
          })[0].image[0],
          address: e.address,
          total:
            qty *
            products.filter((data) => {
              return data._id === id;
            })[0].price,
          status: "Confirmed",
          price: products.filter((data) => {
            return data._id === id;
          })[0].price,
          paymentMethod: payment,
        },
      };
      await createOrder(formData);
      notification.success({ message: "order placed successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const onChangeHandler = (e) => {
    setPayment(e.target.defaultValue);
  };

  return (
    <div className="flex flex-col gap-[10vh]">
      {products &&
        products
          .filter((data) => {
            return data._id === id;
          })
          .map((res, i) => {
            return (
              <Skeleton key={i} active loading={isLoading}>
                <div className="grid grid-cols-2 gap-[2vh] pt-[5vh]">
                  <div>
                    <Image
                      src={res.image[0]}
                      alt="img"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="xsm:text-[10px] lg:text-lg text-slate-500">
                    {res.title}
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg pr-[1vw]">Qty:</span>
                    <InputNumber
                      min={1}
                      max={5}
                      defaultValue={1}
                      onChange={(e) => {
                        // setQty(e);
                        handleChange(res._id, e);
                      }}
                    />
                  </div>
                  <div className="text-lg text-slate-500">Rs:{res.price}</div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl text-slate-500 ">
                      Total:{qty * res.price}
                    </span>
                  </div>
                </div>
              </Skeleton>
            );
          })}

      <Form
        form={form}
        size="small"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          firstName: address[0]?.firstName,
          number: address[0]?.number,
          alternateNumber: address[0]?.alternateNumber,
          address: address[0]?.address,
          email: address[0]?.email,
        }}
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
        <Form.Item name="number" label="Mobile Number">
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
          <Checkbox onChange={onChangeHandler} defaultValue="Cash On Delivery">
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
  );
}

export default Buy;
