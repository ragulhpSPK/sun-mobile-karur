import dbconnect from "@/connection/conn";
import Product from "../../../models/product";

export default async function bestController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
      } catch (err) {}
    }
    case "PUT": {
      try {
        await Product.findByIdAndUpdate({ _id: req.body.id }, { ...req.body });
        return res.status(200).send({ message: "success" });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
    }
  }
}
