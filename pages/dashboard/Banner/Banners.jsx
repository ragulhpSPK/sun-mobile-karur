import React, { useState, useEffect } from "react";
import {
  CloseCircleOutlined,
  EllipsisOutlined,
  PlusOutlined,
  InboxOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Form,
  Tooltip,
  Upload,
  notification,
  Image,
  Skeleton,
  Badge,
  Spin,
} from "antd";

import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  getAllproducts,
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
} from "@/helper/utilities/apiHelper";
import { get, update } from "lodash";
import Sidenavbar from "../shared/Sidenavbar";
import AdminNavbar from "../shared/AdminNavbar";
import { storage } from "../../../components/firebase/firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  list,
} from "firebase/storage";
import { v4 } from "uuid";

function Banner() {
  const { Dragger } = Upload;

  const [allProducts, setAllProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [updateid, setUpdateId] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [imageList, setImageList] = useState("");

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

  const uploadImage = (imageList) => {
    console.log(imageList.name);
    if (imageList == null) return;

    const imageRef = ref(
      storage,
      `images/${v4()}-${imageList && imageList.name}`
    );

    uploadBytes(imageRef, imageList).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList(url);
      });
      alert("image uploaded");
    });
  };

  const handleFinish = async (value) => {
    if (updateid === "") {
      setLoading(true);
      try {
        const formData = {
          data: {
            image: imageList,
            name: value.name,
            productid: productId,
            productname: allProducts.filter((data) => {
              return data._id == productId;
            })[0].title,
            status: value.status,
          },
        };
        await createBanner(formData);
        setOpen(false);
        fetchData();
        setLoading(false);
        setimageList("");
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
            image: imageList,
            name: value.name,
            productid: productId,
            productname: allProducts.filter((data) => {
              return data._id == productId;
            })[0].title,
            status: value.status,
          },
          id: updateid,
        };

        await updateBanner(formData);
        setLoading(false);
        setimageList("");
        fetchData();
        setUpdateId("");
        form.resetFields();
        notification.success({ message: "Banner updated successfully" });
      } catch (err) {
        console.log(err);
        notification.error({ message: "something went wrong" });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const props = {
  //   name: "file",
  //   multiple: true,
  //   onChange(info) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(info.file.originFileObj);
  //     reader.onload = () => {
  //       setimageList(reader.result);
  //     };
  //   },
  //   showUploadList: true,

  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };

  const handleEdit = (data) => {
    setOpen(!open);
    form.setFieldsValue(data);
    setimageList(data.image);
    setProductId(
      allProducts.map((data) => {
        return data._id;
      })
    );
  };

  const handleDelete = (updateid) => {
    try {
      deleteBanner(updateid);

      setLoading(false);
      fetchData();
      notification.success({ message: "Banner deleted successfully" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex gap-[18px] items-start justify-start">
        <div>
          <Sidenavbar />
        </div>
        <Spin spinning={loading}>
          <div className="w-[80vw] flex flex-col pt-[5vh]">
            <div
              className=" bg-white shadow-lg p-2 float-right self-end"
              onClick={() => setOpen(!open)}
            >
              <AddOutlinedIcon className="text-[--third-color] mr-2" />
            </div>

            <div className="mt-5 grid grid-cols-5  gap-14 justify-start relative">
              {banner.map((data) => {
                return (
                  <Skeleton
                    active
                    loading={loading ? true : false}
                    key={data._id}
                  >
                    <Card className="w-[16vw] h-[34vh]  shadow-lg">
                      <div className="float-left relative pl-[15px] w-[25px]">
                        <Badge.Ribbon
                          text={data.status}
                          color={`${
                            data.status === "Bottom"
                              ? "volcano"
                              : data.status === "Top"
                              ? "purple"
                              : data.status === "Best Deals"
                              ? "#faad14"
                              : "#magenta"
                          }`}
                          className="absolute top-[-20px] left-[-35px]"
                        ></Badge.Ribbon>
                      </div>

                      <EditNoteOutlinedIcon
                        className="absolute right-8 top-[3px] text-[--third-color]"
                        onClick={() => {
                          setUpdateId(data._id);
                          handleEdit(data);
                        }}
                      />
                      <CloseIcon
                        className=" absolute right-0 top-0 pr-2 font-bold text-3xl text-[--third-color]"
                        onClick={() => {
                          // setUpdateId(data._id);
                          handleDelete(data._id);
                        }}
                      />

                      <div className="flex flex-col gap-2  items-center justify-center w-[100%]">
                        <div className="text-center h-[10vh] pt-[10px] ">
                          <Image
                            src={data.image}
                            alt="not found"
                            className=" !w-[12vw] !h-[12vh]  mt-4"
                          />
                        </div>

                        <div className="pt-10 ">
                          <h1 className="text-center font-bold text-[16px] ">
                            {data.name}
                          </h1>
                        </div>
                        <div className="flex gap-[15px] h-[5vh]">
                          <p className="text-[15px] font-bold ">
                            {data.productname}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Skeleton>
                );
              })}
            </div>
          </div>
        </Spin>

        <Modal open={open} footer={false} destroyOnClose>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input
                size="large"
                placeholder="Enter Banner Name"
                className="w-[25vw]"
              />
            </Form.Item>
            <Form.Item name="productname" rules={[{ required: true }]}>
              <Select
                size="large"
                placeholder="Select product name here"
                onChange={(e) => setProductId(e)}
                className="!w-[25vw]"
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

            <Form.Item name="status" rules={[{ required: true }]}>
              <Select
                size="large"
                placeholder="Select your status here.."
                onChange={(e) => setStatus(e)}
                className="!w-[25vw]"
              >
                <Option value="Best Deals">Best Deals</Option>
                <Option value="Left">left</Option>
                <Option value="Top">Top</Option>
                <Option value="Bottom">Bottom</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Form.Item className="w-[100%]" name="image">
                <Upload
                  listType="picture"
                  onRemove={(e) => {
                    setImageList("");
                  }}
                  fileList={
                    imageList !== ""
                      ? [
                          {
                            url: imageList,
                          },
                        ]
                      : []
                  }
                  maxCount={1}
                  onChange={(e) => uploadImage(e.file.originFileObj)}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
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
