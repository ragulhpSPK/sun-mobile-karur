import React from "react";

import { Button, Form, notification } from "antd";
import { Colorpicker, ColorPickerValue } from "antd-colorpicker";
import { createDasProfile } from "@/helper/utilities/apiHelper";
import { isEmpty } from "lodash";

function Themes({ data, fetchData }) {
  const initialValues = { color: { r: 26, g: 14, b: 85, a: 1 } };

  // const handleOnFinish = async (val) => {
  //   try {
  //     await createDasProfile({
  //       primary: val.primary.hex,
  //       secondary: val.secondary.hex,
  //     });
  //     notification.success({ message: "color added succesfully" });
  //     fetchData();
  //   } catch (e) {
  //     notification.success({ message: "something went wrong" });
  //   }
  // };

  const handleChangePc = async (pc) => {
    try {
      await createDasProfile({
        primary: pc.hex,
      });
      notification.success({ message: "color added succesfully" });
      fetchData();
    } catch (e) {
      notification.success({ message: "something went wrong" });
    }
  };

  const handleChangeSc = async (sc) => {
    try {
      await createDasProfile({
        secondary: sc.hex,
      });
      notification.success({ message: "color added succesfully" });
      fetchData();
    } catch (e) {
      notification.success({ message: "something went wrong" });
    }
  };

  return (
    <Form
      // onFinish={handleOnFinish}
      initialValues={initialValues}
      layout="vertical"
    >
      <div className="flex gap-10 items-center justify-center">
        <Form.Item label={"Primary Color"} name="primary">
          <Colorpicker
            onChange={(e) => {
              handleChangePc(e);
            }}
          />
        </Form.Item>
        <Form.Item label={"secondary Color"} name="secondary">
          <Colorpicker
            onChange={(e) => {
              handleChangeSc(e);
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
}

export default Themes;
