import dbconnect from "@/connection/conn";
import User from "@/models/user";
import { notification } from "antd";
import { isEmpty } from "lodash";
import Jwt from "jsonwebtoken";
import { encrypt } from "../../../helper/utilities/crypt";
import { middleware } from "@/helper/utilities/middleware";
import { authHandler } from "@/helper/utilities/apiHelper";

export default async function MessageController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        await middleware(req, res);
        const result = await User.find({ _id: req.query.uid.id });
        return res.send({ message: result });
      } catch (err) {
        return res.send({ message: "failed" });
      }
    }

    case "POST": {
      try {
        const validateEntry = await User.find({ number: req.body.number });
        if (isEmpty(validateEntry)) {
          const user = new User({ ...req.body });
          const result = await user.save();
          const mediatordata = {
            id: result._id,
          };
          const token = await Jwt.sign(mediatordata, process.env.SECRET_KEY);
          const data = encrypt(token);
          return res.status(200).send({ data: data });
        } else {
          const mediatordata = {
            id: validateEntry[0]._id,
          };
          const token = await Jwt.sign(mediatordata, process.env.SECRET_KEY);
          const data = encrypt(token);
          return res.status(200).send({ data: data });
        }

        return res.status(200).send({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "failed" });
      }
    }
  }
}
