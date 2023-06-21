import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Upload, notification } from "antd";
import { createDasProfile } from "../../../helper/utilities/apiHelper";
import { isEmpty } from "lodash";

function FooterSettings({ data, fetchData }) {
  const { form } = Form.useForm();

  const handleFooter = async (value) => {
    try {
      const formData = {
        address: value.address,
        number: value.number,
        alternatenumber: value.alternatenumber,
        workinghours: value.workinghours,
        footercolor: value.footercolor,
        navColor: value.navColor,
      };

      await createDasProfile(formData);
      notification.success({ message: "profile created successfully" });
      fetchData();
    } catch (e) {
      console.log(e, "Ebhn");
      notification.error({ message: "something went wrong" });
    }
  };

  return (
    <div>
      <Form
        className=" p-1 flex flex-col  "
        layout="vertical"
        form={form}
        initialValues={{
          address: data?.address,
          number: data?.number,
          alternatenumber: data?.alternatenumber,
          workinghours: data?.workinghours,
          workinghours: data?.workinghours,
          workinghours: data?.workinghours,
          navColor: data?.navColor,
          footercolor: data?.footercolor,
        }}
        onFinish={handleFooter}
      >
        <div className="grid grid-cols-2 gap-1">
          <Form.Item
            name="address"
            label={
              <span>
                Address
                <span className="text-slate-400">(optional)</span>
              </span>
            }
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea placeholder="Enter Address here" size="small" />
          </Form.Item>

          <Form.Item
            name="number"
            label={
              <span>
                Alternate Mobile number
                <span className="text-slate-400">(optional)</span>
              </span>
            }
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="small" placeholder="Enter Number" />
          </Form.Item>

          <Form.Item
            name="alternatenumber"
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
            name="workinghours"
            label={
              <span>
                Working Hours
                <span className="text-slate-400">(optional)</span>
              </span>
            }
          >
            <Input size="small" placeholder="Enter Working hours" />
          </Form.Item>

          <Form.Item
            name="footercolor"
            label={
              <span>
                Footer Color
                <span className="text-slate-400">(optional)</span>
              </span>
            }
          >
            <Input size="small" placeholder="Enter Working hours" />
          </Form.Item>
          <Form.Item
            name="navColor"
            label={
              <span>
                NavBar Color
                <span className="text-slate-400">(optional)</span>
              </span>
            }
          >
            <Input size="small" placeholder="Enter Working hours" />
          </Form.Item>
        </div>

        <div className="!w-[50vw] !text-2xl flex items-center justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="!w-[15vw] !h-[5vh]"
          >
            {isEmpty(
              data?.address ||
                data?.number ||
                data?.alternatenumber ||
                data?.workinghours
            )
              ? " Save"
              : "Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FooterSettings;
