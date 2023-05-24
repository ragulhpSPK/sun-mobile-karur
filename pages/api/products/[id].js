import dbconnect from "@/connection/conn";
import Product from "../../../models/product";
import Banner from "../../../models/banner";
import { isEmpty } from "lodash";

export default async function productsController(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      break;
    case "DELETE":
      try {
        const bannerData = await Banner.find({ productid: req.query.id });
        if (isEmpty(bannerData)) {
          await Product.findByIdAndDelete({ _id: req.query.id });
          return res.status(200).json({ message: "Product Deleted" });
        } else {
          return res
            .status(200)
            .json({ message: "Product mapped with Banner" });
        }
      } catch (err) {
        return res.status(500).json({ message: "failed" });
      }
      break;
  }
}
