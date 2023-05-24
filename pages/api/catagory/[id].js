import dbconnect from "../../../connection/conn";
import Catagory from "../../../models/catagories";
import subCategory from "../../../models/subcategories";
import { isEmpty } from "lodash";

export default async function catagoryController(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      break;
    case "DELETE":
      try {
        const subcategoryData = await subCategory.find({
          categoryId: req.query.id,
        });
        if (isEmpty(subcategoryData)) {
          await Catagory.findByIdAndDelete({ _id: req.query.id });
          return res.status(200).send({ message: "deleted" });
        } else {
          return res.status(200).send({ message: "mapped with subcategory" });
        }
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
  }
}
