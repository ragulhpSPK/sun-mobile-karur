import dbconnect from "../../../connection/conn";
import Catagory from "../../../models/catagories";

export default async function catagoryController(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      try {
        const catagory = await Catagory.find();
        return res.status(200).send({ data: catagory });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
    case "POST":
      try {
        const category = new Catagory({ ...req.body });
        const result = await category.save();
        return res.status(200).send({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "failed" });
      }
      break;
    case "PUT":
      try {
        const category = await Catagory.findByIdAndUpdate(
          { _id: req.body.id },
          req.body.data
        );

        return res.status(200).send({ data: category });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
  }
}
