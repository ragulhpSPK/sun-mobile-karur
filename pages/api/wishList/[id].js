import dbconnect from "@/connection/conn";
import wishList from "@/models/wishList";

export default async function wishListController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      {
      }
      break;
    case "DELETE":
      {
        try {
          await wishList.findByIdAndDelete({ _id: req.query.id });
          return res.status(200).send({ message: "deleted" });
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
      break;
    case "PUT": {
    }
  }
}
