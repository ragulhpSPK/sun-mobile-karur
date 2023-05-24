import jwt from "jsonwebtoken";
import { decrypt } from "./crypt";

export const middleware = async (req, res) => {
  try {
    if (req.headers["cookie"]) {
      const hasedToken = req.headers["cookie"].split("=")[1];
      const result = await decrypt(hasedToken);
      const id = jwt.verify(JSON.parse(result), process.env.SECRET_KEY);
      if (req.method === "GET" || req.method === "DELETE") {
        return (req.query.uid = id);
      } else {
        return (req.body.uid = id);
      }
    } else {
      if (req.method === "GET" || req.method === "DELETE") {
        return (req.query.uid = 1);
      } else {
        return (req.body.uid = 1);
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
