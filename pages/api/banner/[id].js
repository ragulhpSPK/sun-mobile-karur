import dbconnect from "@/connection/conn";
import Banner from "../../../models/banner";

export default async function bannerController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      {
        try {
        } catch (err) {}
      }
      break;

    case "DELETE":
      try {
        await Banner.findByIdAndDelete({ _id: req.query.id });
        return res.status(200).json({ message: "Banner Deleted" });
      } catch (err) {
        return res.status(500).json({ message: "failed" });
      }
      break;
  }
}
