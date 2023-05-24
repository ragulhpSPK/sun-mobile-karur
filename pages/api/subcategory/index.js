import dbconnect from "../../../connection/conn";
import subCategory from "../../../models/subcategories";

export default async function subCategoryController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      try {
        const sub = await subCategory.find();
        return res.status(200).send({ data: sub });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
    case "POST":
      try {
        const sub = new subCategory({ ...req.body });

        const result = await sub.save();
        return res.status(200).send({ message: "success" });
        await subCategory();
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
    case "PUT":
      try {
        const sub = await subCategory.findByIdAndUpdate(
          { _id: req.body.id },
          req.body.data
        );

        return res.status(200).send({ data: sub });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "failed" });
      }
  }
}
