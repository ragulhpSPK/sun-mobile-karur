import dbconnect from "@/connection/conn";
import Cart from "../../../models/cart";

export default async function cartController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
      } catch (err) {}
    }

    case "DELETE": {
      try {
        await Cart.findByIdAndDelete({ _id: req.query.id });
        return res.status(200).json({ message: "cart deleted successfully" });
      } catch (err) {
        return res.status(500).json({ message: "failed" });
      }
    }
  }
}
