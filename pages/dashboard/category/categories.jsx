import {
  Collapse,
  Form,
  Modal,
  Table,
  Input,
  Button,
  notification,
  Upload,
  Image,
  Tooltip,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  createCatagory,
  getAllCatagory,
  updateCatagory,
  deleteCatagory,
} from "../../../helper/utilities/apiHelper";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import { InboxOutlined } from "@ant-design/icons";
import { get } from "lodash";
import SearchIcon from "@mui/icons-material/Search";

const { Dragger } = Upload;
const { Search } = Input;

const Categories = (properties) => {
  const { category, fetchData, loading, setLoading } = properties;
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [updateId, setUpdateId] = React.useState("");
  const [imagename, setImageName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleFinish = async (values) => {
    if (updateId === "") {
      setLoading(true);

      try {
        const formData = {
          name: values.name,
          image: imagename,
        };
        await createCatagory(formData);
        notification.success({ message: "Category Added successfully" });
        form.resetFields();
        setImageName("");
        setOpen(false);
        setLoading(false);

        fetchData();
      } catch (err) {
        setLoading(false);

        setOpen(false);
        notification.success({ message: "Somthing went wrong" });
      }
    } else {
      try {
        setLoading(true);
        const formData = {
          data: {
            name: values.name,
            image: imagename,
          },
          id: updateId,
        };
        await updateCatagory(formData);
        notification.success({ message: "Category Updated successfully" });
        form.resetFields();
        setOpen(false);
        setUpdateId("");
        setImageName("");

        setLoading(false);

        fetchData();
      } catch (err) {
        setLoading(false);

        setOpen(false);
        notification.error({ message: "Somthing went wrong" });
      }
    }
  };

  const handleEdit = (value) => {
    setUpdateId(value._id);
    setImageName(value.image);
    setOpen(true);
    form.setFieldsValue(value);
  };

  const handleDelete = async (value) => {
    try {
      const result = await deleteCatagory(value._id);

      if (get(result, "data.message", "") === "mapped with subcategory") {
        Modal.warning({
          title: "This Category Mapped With SubCategory",
          content: "if you really wanna delete this delete subcategory first",
        });
      } else {
        notification.success({ message: "Category Deleted successfully" });
      }
      fetchData();
    } catch (err) {
      notification.error({
        message: "something went wrong",
      });
    }
  };

  useEffect(() => {
    setCategories(category);
    setCategories(
      category.filter((res) => {
        return res.name.toLowerCase().includes(data);
      })
    );
  }, [category, data]);

  const columns = [
    {
      title: <h1 className="!text-md">Image</h1>,
      dataIndex: "image",
      key: "image",
      align: "start",
      render: (name) => {
        return (
          <Image
            alt="logo"
            className="!w-[50px] !h-[50px] rounded-box"
            src={name}
          />
        );
      },
      width: 200,
    },
    {
      align: "start",
      title: <h1 className="!text-md">Category Name</h1>,
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <h1 className="text-md">{name}</h1>;
      },
    },
    {
      title: <h1 className="!text-md">Update</h1>,
      align: "end",
      width: 100,
      render: (values) => {
        return (
          <EditNoteOutlinedIcon
            className=" text-green-500 cursor-pointer"
            onClick={() => handleEdit(values)}
          />
        );
      },
    },
    {
      width: 100,
      title: <h1 className="!text-lg">Delete</h1>,
      align: "end",
      render: (values) => {
        return (
          <DeleteOutlineOutlinedIcon
            className=" text-red-500 cursor-pointer"
            onClick={() => handleDelete(values)}
          />
        );
      },
    },
  ];

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setImageName(reader.result);
      };
    },
    showUploadList: false,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="flex flex-col gap-[4vh]">
      {/* <Search
        placeholder="input search text"
        allowClear
        style={{
          width: 600,
        }}
      /> */}

      <div className="relative w-[42vw]">
        <input
          type="search"
          placeholder="Type here"
          className="input input-bordered  !w-[100%] "
          onChange={(e) => setData(e.target.value)}
        />
        <SearchIcon className="absolute top-[8px] right-1 text-3xl" />
      </div>

      <Collapse
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        collapsible="icon"
      >
        <Panel
          header={<h1 className="text-md">Category</h1>}
          extra={
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            >
              <FileAddOutlined className="!text-[#943074] !text-xl" />
            </div>
          }
          key="1"
          className="!w-[42vw]"
        >
          <div className="flex flex-col ">
            <div className="flex flex-col gap-y-2">
              <div className="p-2">
                <Table
                  key="id"
                  loading={loading}
                  size="middle"
                  pagination={{
                    pageSize: 6,
                  }}
                  dataSource={categories}
                  columns={columns}
                />
              </div>
            </div>
          </div>
          <Modal open={open} destroyOnClose footer={false}>
            <Form onFinish={handleFinish} form={form} autoComplete="off">
              <div className="flex flex-col gap-y-2 items-center">
                <Form.Item
                  className="!w-[100%]"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Category Name!",
                    },
                  ]}
                  name="name"
                >
                  <Input placeholder="Category Name" className="w-[25vw]" />
                </Form.Item>

                <Form.Item className="w-[100%]" name="name">
                  <>
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
                          alt="logo"
                          src={imagename}
                          className=" w-[100%]"
                        />
                      </div>
                    ) : (
                      <Dragger {...props} style={{ width: "25vw" }}>
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
                  </>
                </Form.Item>
                <div className="flex flex-row items-end gap-x-2 self-end">
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpen(!open);
                      setImageName("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {updateId === "" ? "Save" : "Update"}
                  </Button>
                </div>
              </div>
            </Form>
          </Modal>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Categories;
