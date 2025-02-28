const express = require("express");
const mdb = require("mongoose");
const dotenv=require('dotenv')
const app = express();
const PORT = 3001;
dotenv.config()
mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MBD sucess");
  })
  .catch((err) => {
    console.log("cheack you string", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>welcome back<h1>");
});
// app.get("/static", (req, res) => {
//   res.sendFile(
//     "C:\\Users\\joans\\OneDrive\\Documents\\desktop\\mern\\html_css\\index.html"
//   );
// });

app.listen(PORT, () => console.log("server started successfully"));