import {
  Input,
  Modal,
  Table,
  Form,
  Button,
  Select,
  notification,
  Collapse,
  Upload,
  Tooltip,
  Image,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import React, { useEffect, useState } from "react";
import {
  FileAddOutlined,
  RedoOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import {
  createSubCatagory,
  getAllCatagory,
  getAllSubCatagory,
  updateSubCategory,
  deleteSubCategory,
} from "@/helper/utilities/apiHelper";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { get } from "lodash";
import SearchIcon from "@mui/icons-material/Search";

const Subcategories = (properties) => {
  const { subcategory, category, fetchData, loading, setLoading } = properties;
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [imagename, setImageName] = useState("");
  const [subCategories, setsubCategories] = useState([]);

  const [selectedcategorieName, selectedSetcategorieName] = useState("");

  const [update, setUpdate] = useState([]);
  const { Dragger } = Upload;



  const handleFinish = async (value) => {
    if (update === "") {
      setLoading(true);
      try {
        const formData = {
          categoryId: value.categoryId,
          subcategoryname: value.subcategoryname,
          image: imagename,
          categoryname: category.filter((category) => {
            return category._id === selectedcategorieName;
          })[0].name,
        };
        await createSubCatagory(formData);
        notification.success({ message: "Subcategory added successfully" });
        fetchData();
        setOpen(false);
        form.resetFields();
        setLoading(false);
        setImageName("");
      } catch (err) {
        notification.error({ message: "something went wrong" });
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const formdata = {
          data: {
            categoryId: value.categoryId,
            subcategoryname: value.subcategoryname,
            image: imagename,
            categoryname: category.filter((category) => {
              return category._id === selectedcategorieName;
            })[0].name,
          },
          id: update,
        };
        await updateSubCategory(formdata);

        form.resetFields();
        fetchData();
        setOpen(false);
        setLoading(false);
        setImageName("");

        notification.success({ message: "Subcategory updated successfully" });
      } catch (err) {
        notification.error({ message: "something went wrong" });
        setLoading(false);
      }
    }
  };

  const handleEdit = (value) => {
  
    
    setOpen(true);
    setUpdate(value._id);
    setImageName(value.image);

    form.setFieldsValue(value);
  };
  const handleDelete = async (value) => {
    setLoading(true);
    try {
      await deleteSubCategory(value._id);

      notification.success({ message: "Subcategory deleted successfully" });
      setLoading(false);
      fetchData();
    } catch (err) {
      notification.error({ message: "something went wrong" });
      setLoading(false);
    }
  };

  useEffect(() => {
    setsubCategories(subcategory);
    setsubCategories(
      subcategory.filter((res) => {
        return (
          res.subcategoryname.toLowerCase().includes(data) ||
          res.categoryname.toLowerCase().includes(data)
        );
      })
    );
  }, [subcategory, data]);

  const columns = [
    {
      title: <h1 className="!text-md">Image</h1>,
      dataIndex: "image",
      key: "image",
      render: (name) => {
        return (
          <Image
            alt="logo"
            className="!w-[50px] !h-[50px] rounded-box"
            src={name}
          />
        );
      },
    },
    {
      title: <h1 className="!text-md">Subcategory Name</h1>,
      dataIndex: "subcategoryname",
      key: "subcategoryname",
      align: "start",

      render: (name) => {
        return <h1 className="text-md">{name}</h1>;
      },
      width: 200,
    },
    {
      title: <h1 className="!text-md">Category Name</h1>,
      dataIndex: "categoryname",
      key: "categoryname",
      align: "start",

      render: (name) => {
        return <h1 className="text-md">{name}</h1>;
      },
      width: 200,
    },
    {
      title: <h1 className="!text-md">Update</h1>,
      align: "end",
      width: 100,
      render: (values) => {
        return (
          <EditNoteOutlinedIcon
            className="text-green-500 !cursor-pointer"
            onClick={() => handleEdit(values)}
          />
        );
      },
    },
    {
      width: 100,
      title: <h1 className="!text-md">Delete</h1>,
      align: "end",
      render: (values) => {
        return (
          <DeleteOutlineOutlinedIcon
            className="text-red-500 !cursor-pointer"
            onClick={() => handleDelete(values)}
          />
        );
      },
    },
  ];

  const props = {
    name: "file",
    multiple: "false",
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
          header={<h1 className="text-md">Sub Category</h1>}
          extra={
            <div
              className=" !bg-white  cursor-pointer"
              onClick={() => {
                setOpen(true);
                setUpdate("");
              }}
            >
              <FileAddOutlined className="!text-[#943074] !text-xl" />
            </div>
          }
          key="1"
          className="!w-[42vw]"
        >
          <div className="flex flex-col ">
            <div className="flex flex-col gap-y-2 ">
              <div>
                <Table
                  dataSource={subCategories}
                  columns={columns}
                  size="middle"
                  loading={loading}
                 pagination={{
                    pageSize: 6,
                  }}
                />
              </div>
              <Modal footer={false} open={open} destroyOnClose>
                <Form form={form} onFinish={handleFinish}>
                  <div className="flex flex-col gap-y-2 items-center">
                    <Form.Item
                      className="!w-[100%]"
                      rules={[
                        {
                          required: true,
                          message: "please Enter SubCategory",
                        },
                      ]}
                      name="subcategoryname"
                    >
                      <Input
                        size="large"
                        placeholder="Enter SubCategory Name"
                       className="!w-[25vw]"
                      />
                    </Form.Item>
                    <Form.Item
                   className="!w-[25vw]"
                      name="categoryId"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Category"
                        size="large"
                        onChange={(e) => {
                          selectedSetcategorieName(e);
                        }}
                        className="!w-[25vw]"
                      >
                        {category && category.map((res) => {
                          return (
                            <Option value={res._id} key={res._id}>
                              {res.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <>
                        {imagename ? (
                          <div className="flex flex-row-reverse">
                            <Tooltip
                              onClick={() => setImageName("")}
                              title="change image"
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
                          <Dragger {...props} className="!bg-[red] !ml-40" style={{marginLeft:"525px",width:"25vw"}}>
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag category image to this area to
                              upload
                            </p>
                            <p className="ant-upload-hint">
                              Support for a single upload.
                            </p>
                          </Dragger>
                        )}
                      </>
                    </Form.Item>

                    <div className="flex gap-5 justify-end self-end">
                      <Button
                        type="primary"
                        onClick={() => {
                          form.resetFields();
                          setOpen(!open);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="primary" htmlType="submit">
                        {update === "" ? "Save" : "Update"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Modal>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Subcategories;
