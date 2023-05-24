import dbconnect from "@/connection/conn";
import Order from "../../../models/order";
import { middleware } from "../../../helper/utilities/middleware";

export default async function orderController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        await middleware(req, res);
        const order = await Order.find({ userId: req.query.uid.id });

        return res.status(200).send({ data: order });
      } catch (err) {
        return res.status(500).send({ data: "failed" });
      }
    }

    case "POST": {
      try {
        await middleware(req, res);
        req.body.data.userId = req.body.uid.id;
        const order = await new Order({ ...req.body.data });
        const result = order.save();
        return res.status(200).send({ message: result });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
    }

    case "PUT": {
      try {
        const order = await Order.findByIdAndUpdate(
          { _id: req.body.id },
          req.body
        );
        return res.status(200).send({ message: order });
      } catch (errr) {
        return res.status(500).send({ message: "failed" });
      }
    }
  }
}
