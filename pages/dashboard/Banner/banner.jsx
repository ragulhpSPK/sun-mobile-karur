import React, { useEffect, useState } from "react";
import Sidenavbar from "../shared/Sidenavbar";
import {
  Modal,
  Table,
  Upload,
  Form,
  Input,
  Select,
  Button,
  Tooltip,
  Image,
  notification,
  message,
} from "antd";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import {
  FileAddOutlined,
  InboxOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  getAllproducts,
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
} from "@/helper/utilities/apiHelper";
import { get, update } from "lodash";
import AdminNavbar from "../shared/AdminNavbar";

function Banner() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [imagename, setImageName] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState([]);
  const [banner, setBanner] = useState([]);
  const [updateid, setUpdateId] = useState("");
  const { Dragger } = Upload;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = [await getAllproducts(), await getAllBanner()];
      setAllProducts(get(result, "[0].data.data", []));
      setBanner(get(result, "[1].data.data", []));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = async (value) => {
    if (updateid === "") {
      setLoading(true);
      try {
        const formData = {
          data: {
            image: imagename,
            name: value.name,
            productid: value.productid,
            productname: allProducts.filter((data) => {
              return data._id == productId;
              // if (data._id == productId) console.log(data.title);
            })[0].title,
          },
        };
        await createBanner(formData);
        setOpen(false);
        fetchData();
        setLoading(false);
        setImageName("");
        form.resetFields();
        notification.success({ message: "Banner created successfully" });
      } catch (err) {
        notification.error({ message: "something went wrong" });
      }
    } else {
      try {
        setLoading(true);
        const formData = {
          data: {
            image: imagename,
            name: value.name,
            productid: value.productid,
            productname: allProducts.filter((data) => {
              return data._id == productId;
              // if (data._id == productId) console.log(data.title);
            })[0].title,
          },
          id: updateid,
        };
        await updateBanner(formData);
        fetchData();
        setLoading(false);
         setImageName("");
        notification.success({ message: "Banner updated successfully" });
      } catch (err) {
        notification.error({ message: "something went wrong" });
      }
    }
  };

  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setImageName(reader.result);
      };
    },
    showUploadList: true,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleEdit = (value) => {
   
    setUpdateId(value._id);
    setImageName(value.image);
    setOpen(!open);
    form.setFieldsValue(value);
  };

  const handleDelete = (value) => {
    setLoading(true);
    try {
      deleteBanner(value._id);
      fetchData();
      setLoading(false);
      notification.success({ message: "Banner deleted successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const columns = [
    {
      title: <h1 className="!text-md">Image</h1>,
      dataIndex: "image",
      key: "image",
      render: (name) => {
        return <Image src={name} alt="not found" className="!w-[3vw] "></Image>;
      },
    },
    {
      title: <h1 className="!text-md">Banner Name</h1>,
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <h1>{name}</h1>;
      },
    },
    {
      title: <h1 className="!text-md">Product Id</h1>,
      dataIndex: "productid",
      key: "productid",
      render: (name) => {
        return <h1>{name}</h1>;
      },
    },
    {
      title: <h1 className="!text-md">Product Name</h1>,
      dataIndex: "productname",
      key: "productname",
      render: (name) => {
        return <h1>{name}</h1>;
      },
    },

    {
      title: "Update",
      render: (value) => {
        return (
          <div className="flex gap-x-5">
            <EditNoteOutlinedIcon
              className="text-green-500 !cursor-pointer"
              onClick={() => handleEdit(value)}
            />
          </div>
        );
      },
    },
    {
      title: "Delete",
      render: (value) => {
        return (
          <div className="flex gap-x-5">
            <DeleteOutlineOutlinedIcon
              className="text-red-500 !cursor-pointer"
              onClick={() => handleDelete(value)}
            />
          </div>
        );
      },
    },
  ];

  // const handlevalue = (value) => {
  //   console.log("pro", value);
  // };
  return (
    <div className="flex flex-col">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex pt-5">
        <div>
          <Sidenavbar />
        </div>

        <div className="w-[80vw] pl-5 relative  pt-20">
          <div onClick={() => setOpen(!open)}>
            <FileAddOutlined className="!text-[#943074] !bg-white !text-2xl float-right mr-[1vw]" />
          </div>

          <Table
            className="pt-4"
            dataSource={banner}
            columns={columns}
            loading={loading}
          />
        </div>

        <Modal open={open} footer={false} destroyOnClose>
          <Form onFinish={handleFinish} form={form}>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input size="large" placeholder="Enter Banner Name" />
            </Form.Item>
            <Form.Item name="productid" rules={[{ required: true }]}>
              <Select
                size="large"
                placeholder="Select product name here"
                onChange={(e) => setProductId(e)}
              >
                {allProducts.map((data) => {
                  return (
                    <Option value={data._id} key={data._id}>
                      {data.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            {/* <Form.Item name="Product Id" rules={[{ required: true }]}>
            {/* <Input
              size="large"
              value={productId}
              placeholder="Enter product Id"
            /> */}

            {/* <Select size="large">
              <Option value={productId}>{productId}</Option>
            </Select>
          </Form.Item>  */}
            <Form.Item>
              <Tooltip>
                {imagename ? (
                  <div className="flex flex-row-reverse justify-start gap-x-10">
                    <Tooltip
                      onClick={() => setImageName("")}
                      title="change image"
                      className="!cursor-pointer !text-red-500"
                    >
                      <RedoOutlined />
                    </Tooltip>
                    <Image
                      src={imagename}
                      className=" w-[100%]"
                      alt="not found"
                    />
                  </div>
                ) : (
                  <Dragger {...props} multiple={true}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag category image to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single upload.
                    </p>
                  </Dragger>
                )}
              </Tooltip>
            </Form.Item>

            <div className="flex gap-5 justify-end ">
              <Button
                type="Primary"
                className="bg-[--third-color] shadow-xl  !text-white"
                onClick={() => {
                  form.resetFields();
                  setOpen(!open);
                  setUpdateId("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="Primary"
                className="bg-[--third-color] shadow-xl !text-white"
                htmlType="submit"
                onClick={() => setOpen(!open)}
              >
                {updateid === "" ? "Save" : "Update"}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default Banner;
