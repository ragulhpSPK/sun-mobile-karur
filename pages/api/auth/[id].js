import dbconnect from "@/connection/conn";
import User from "@/models/user";

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
