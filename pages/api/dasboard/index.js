import dbconnect from "@/connection/conn";
import Order from "../../../models/order";

export default async function orderController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        const order = await Order.find();

        return res.status(200).send({ data: order });
      } catch (err) {
        return res.status(500).send({ data: "failed" });
      }
    }
    case "POST": {
      try {
      } catch (err) {}
    }
  }
}
