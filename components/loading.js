import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

function loading() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <div>
      <div>
        <Spin spinning={isLoading}></Spin>
      </div>
    </div>
  );
}

export default loading;
