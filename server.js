const express = require("express");
const routes = require("./routes/index");

const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
// app.use(fileUpload());

app.use(bodyParser.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("home", { title: "Home Page" });
// });

// Routes
app.use("/api", routes);

// app.use((req, res) => {
//   res.status(404).render("404", { title: "404 Page" });
// });

app.listen(PORT);
console.log("Listening on port ", PORT);
