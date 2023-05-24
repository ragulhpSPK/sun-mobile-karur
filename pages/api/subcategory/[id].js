import dbconnect from "../../../connection/conn";
import subCategory from "../../../models/subcategories";

export default async function subCategoryControler(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      break;
    case "DELETE":
      try {
        await subCategory.findByIdAndDelete({ _id: req.query.id });

        return res.status(200).send({ message: "deleted" });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
  }
}
