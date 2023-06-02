import React from "react";

import { Button, Form, notification } from "antd";
import { Colorpicker, ColorPickerValue } from "antd-colorpicker";
import { createDasProfile } from "@/helper/utilities/apiHelper";

function Themes({ fetchData }) {
  const initialValues = { color: { r: 26, g: 14, b: 85, a: 1 } };

  const handleOnFinish = async (val) => {
    try {
      const formData = {
        primary: val.primary.hex,
      };
      await createDasProfile(formData);
      notification.success({ message: "color added succesfully" });
      fetchData();
    } catch (e) {
      notification.success({ message: "something went wrong" });
    }
  };

  return (
    <Form
      onFinish={handleOnFinish}
      initialValues={initialValues}
      layout="vertical"
    >
      <div className="flex gap-10 items-center justify-center">
        <Form.Item label={"Pimary Color"} name="primary">
          <Colorpicker />
        </Form.Item>
        {/* <Form.Item label={"secondary Color"} name="secondary">
          <Colorpicker />
        </Form.Item> */}
      </div>

      <Form.Item className="flex items-center justify-center">
        <Button type="primary" htmlType="submit" className="!w-[15vw]">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Themes;
