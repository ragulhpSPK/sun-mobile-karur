import dbconnect from "@/connection/conn";
import DasProfile from "../../../models/dasprofile";
import { isEmpty } from "lodash";

export default async function dasboardProfileController(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      try {
        const profile = await DasProfile.find();
        return res.status(200).send({ data: profile });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;

    case "POST":
      try {
        const result = await DasProfile.findOne();
        console.log("tri");
        if (isEmpty(result)) {
          const result = new DasProfile({ ...req.body });
          console.log("trig");
          await result.save();
        } else {
          let targetId = result._id;
          console.log(targetId, req.body, "dfbhb");
          await DasProfile.findByIdAndUpdate({ _id: targetId }, req.body);
        }
        return res.status(200).send({ data: "success" });
      } catch (err) {
        return res.status(500).send({ data: "failed" });
      }

      break;
  }
}
