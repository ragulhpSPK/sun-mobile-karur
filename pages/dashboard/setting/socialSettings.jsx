import { createDasProfile } from "@/helper/utilities/apiHelper";
import { Form, Input, Button, notification } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";

function SocialSettings({ data, fetchData }) {
  const { form } = Form.useForm;
  const handleFinish = async (val) => {
    try {
      //   const formData = {
      //     fblink: val.fblink,
      //     wplink: val.wplink,
      //     twlink: val.twlink,
      //     inlink: val.inlink,
      //   };
      await createDasProfile(val);
      notification.success({ message: "profile created successfully" });
      fetchData();
    } catch (e) {
      notification.error({ message: "something went wrong" });
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="p-2"
        initialValues={{
          fblink: data?.fblink,
          wplink: data?.wplink,
          twlink: data?.twlink,
          inlink: data?.inlink,
        }}
      >
        <Form.Item label="Facebook Link" name="fblink">
          <Input placeholder="Give Facebook Link" />
        </Form.Item>
        <Form.Item label="Whatsapp Link" name="wplink">
          <Input placeholder="Give Whatsapp Link" />
        </Form.Item>
        <Form.Item label="Twitter Link" name="twlink">
          <Input placeholder="Give Twitter Link" />
        </Form.Item>
        <Form.Item label="Instagram Link" name="inlink">
          <Input placeholder="Give Instagram Link" />
        </Form.Item>
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-[15vw] h-[4.5vh]"
          >
            {isEmpty(
              data?.fblink || data?.inlink || data?.twlink || data?.wplink
            )
              ? " Save"
              : "Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SocialSettings;
