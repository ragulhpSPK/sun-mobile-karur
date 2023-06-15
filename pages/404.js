import React from "react";
import { useRouter } from "next/router";
import { Image } from "antd";

function CustomPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-1 items-center justify-center m-auto h-screen">
      <Image src="/assets/auth/unauth.png" alt="Logo" preview={false} />
      <h1 className="text-2xl flex items-center justify-center text-slate-500">
        You are not authorized person to enter this page...
      </h1>
      <button
        onClick={() => {
          router.push({ pathname: "/" });
        }}
        className="bg-[--third-color] text-white p-2 rounded-md"
      >
        Go to Homepage
      </button>
    </div>
  );
}

export default CustomPage;
