import dbconnect from "@/connection/conn";
import Cart from "../../../models/cart";
import { middleware } from "../../../helper/utilities/middleware";

export default async function cartController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      {
        try {
          await middleware(req, res);
          const cart = await Cart.find({ userId: req.query.uid.id });
          return res.status(200).send({ message: cart });
        } catch (err) {
          console.log(err);
          return res.status(500).send({ message: "failed" });
        }
      }
      break;
    case "POST":
      {
        try {
          await middleware(req, res);
          req.body.data.userId = req.body.uid.id;
          const cart = await new Cart({ ...req.body.data });
          const result = await cart.save();
          return res.status(200).send({ message: result });
        } catch (err) {
          console.log("errR", err);
          return res.status(500).send({ message: "failed" });
        }
      }
      break;

    case "PUT":
      {
        try {
          const cart = await Cart.findByIdAndUpdate(
            { _id: req.body.id },
            req.body
          );

          return res.status(200).send({ data: cart });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;
  }
}
