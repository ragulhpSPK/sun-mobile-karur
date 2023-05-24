import dbconnect from "@/connection/conn";
import TopProductSchema from "../../../models/topProducts";

export default async function topProductsController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
      } catch (err) {}
    }
    case "DELETE": {
      try {
        const res = await TopProductSchema.findByIdAndDelete({
          _id: req.query.id,
        });
        return res.status(200).json({ Message: res });
      } catch (err) {
        return res.status(500).json({ Message: "failed" });
      }
    }
  }
}
