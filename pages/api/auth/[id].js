import dbconnect from "@/connection/conn";
import User from "@/models/user";
import { notification } from "antd";
import { isEmpty } from "lodash";
import Jwt from "jsonwebtoken";
import { excrypt } from "@/helper/shared";

// const twilio = require("twilio");
// require("dotenv").config();
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

export default async function MessageController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        const result = await User.find({ number: req.query.id });
        return res.status(200).send({ message: result });
      } catch (err) {
        return res.send({ message: "failed" });
      }
    }
  }
}
