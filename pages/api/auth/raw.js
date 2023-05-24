import dbconnect from "@/connection/conn";
import { middleware } from "@/helper/utilities/middleware";
import User from "@/models/user";

export default async function MessageController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        return res.send({ message: "trtu" });
      } catch (err) {
        return res.send({ message: "failed" });
      }
    }

    case "PUT":
      {
        try {
          await middleware(req, res);
          console.log(req);
          const user = await User.findByIdAndUpdate(
            { _id: req.body.uid.id },
            req.body
          );

          return res.status(200).send({ data: user });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;
  }
}
