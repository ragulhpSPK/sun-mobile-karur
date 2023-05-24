import dbconnect from "@/connection/conn";
import Product from "@/models/product";

export default async function productController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find();
        return res.status(200).send({ data: products });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
    case "POST":
      try {
        const product = new Product({ ...req.body });
        const result = await product.save();

        return res.status(200).send({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ message: "failed" });
      }
      break;

    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(
          { _id: req.body.data._id },
          req.body.data
        );
        return res.status(200).send({ data: product });
      } catch (err) {
        return res.status(400).send({ message: "failed" });
      }
      break;
  }
}
