import DashboardUser from "@/models/dashBoardUser";
import dbconnect from "@/connection/conn";

export default async function dashboardUserController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        const result = await DashboardUser.find();
        console.log(result, "pooo");
        res.send({ message: result });
      } catch (err) {
        console.log(e);
      }
    }
    // case "POST": {
    //   try {
    //     const dashboardUser = await new DashboardUser({ ...req.body });
    //     const result = dashboardUser.save();
    //     res.send({ message: result });
    //   } catch (e) {
    //     console.log(e);
    //     res.send({ message: "failure" });
    //   }
    // }
  }
}
