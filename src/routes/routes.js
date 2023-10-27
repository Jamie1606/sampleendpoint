const express = require("express");
const path = require("path");
const appController = require("../controller/appController.js");

const router = express.Router();

router.get("/hello", appController.printHello);
router.get("/hello/:name", appController.printHelloWithNameParam);
router.get("/isprime/:number", appController.testPrimeNumber);
router.get("/previous_number/:number", appController.getPreviousNumber);

router.get("/stopwatch", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "stopwatch.html"));
});

module.exports = router;
