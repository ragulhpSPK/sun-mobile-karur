import dbconnect from "@/connection/conn";
import Banner from "../../../models/banner";

export default async function bannerController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      {
        try {
          const banner = await Banner.find();
          return res.status(200).send({ data: banner });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;

    case "POST":
      {
        try {
          const banner = await new Banner({ ...req.body.data });
          const result = banner.save();
          return res.status(200).send({ data: result });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;

    case "PUT":
      {
        try {
          const banner = await Banner.findByIdAndUpdate(
            { _id: req.body.id },
            req.body.data
          );

          return res.status(200).send({ data: banner });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;
  }
}
