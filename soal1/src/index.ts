import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
