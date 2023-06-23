import dbconnect from "@/connection/conn";
import wishList from "@/models/wishList";
import { middleware } from "../../../helper/utilities/middleware";

export default async function wishListController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      {
        try {
          await middleware(req, res);
          const result = await wishList.find({ userId: req.query.uid.id });
          res.status(200).send({ data: result });
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case "POST":
      {
        try {
          await middleware(req, res);
          console.log(req.body.uid.id, "jjnjnhivfnvhjvbfj");
          req.body.userId = req.body.uid.id;
          const result = await new wishList({ ...req.body });
          const wish = result.save();
          res.status(200).send({ message: req.body.uid });
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
      break;
    case "PUT": {
    }
  }
}
