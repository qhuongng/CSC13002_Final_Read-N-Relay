import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", function (req, res) {
  res.send("helloooo");
});

app.listen(3000, function serverStartedHandler() {
  console.log("Web server is running at http://localhost:3000");
});
