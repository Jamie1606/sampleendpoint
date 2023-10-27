const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes.js");

let app = express();
app.use(cors());

// Server Settings
const PORT = 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(
  express.static(path.join(__dirname, "public"), {
    // Set the MIME type explicitly for .css and .js files
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

routes.get("/", (req, res, next) => {
  res.status(200).json({ message: "success" });
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({
    statusCode: status,
    ok: false,
    message: error.message || "Internal Server Error",
  });
});

// Listen for incoming requests
app.listen(PORT, (err) => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server is Listening on: http://localhost:${PORT}/`);
});
