import Head from "next/head";
import Swiper from "../components/swiper";
import Delivery from "@/components/delivery";
import Categories from "@/components/categories";
import Bestdeals from "@/components/bestdeals";
import Topproducts from "@/components/topproducts";
import ProductFilter from "@/components/productFilter";
import TopRated from "@/components/flashdeals";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import SyncIcon from "@mui/icons-material/Sync";

export default function Home() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [loading, setLoading] = useState(true);
  const result = useSelector((data) => {
    return data.search.searches;
  });

  const antIcon = (
    <ReloadOutlined style={{ fontSize: 40 }} className="animate-spin" />
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <Spin
          spinning={loading}
          tip="Loading Data..."
          size="large"
          indicator={antIcon}
        > */}
        <div className={`${loading ? "invisible" : "visible"}`}>
          {result.length > 0 ? (
            <ProductFilter />
          ) : (
            <>
              <Swiper setLoading={setLoading} />
              <Delivery />
              <Categories setLoading={setLoading} />
              <Bestdeals />
              <TopRated />
              <Topproducts setLoading={setLoading} />
            </>
          )}
        </div>
        {/* </Spin> */}
      </main>
    </>
  );
}
