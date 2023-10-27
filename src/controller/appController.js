const fs = require("fs");
const path = require("path");

const appController = {
  printHello: (req, res, next) => {
    const name = req.query.name;
    if (!name) res.status(200).send("hello, banana!");
    else res.status(200).send(`hello, ${name}`);
  },
  printHelloWithNameParam: (req, res, next) => {
    const name = req.params.name;
    res.status(200).send(`hello, ${name}`);
  },
  testPrimeNumber: (req, res, next) => {
    let number = req.params.number;
    number = number.replace(/\{|\}/g, "");
    let status = "yes";

    for (let i = 2, s = Math.sqrt(number); i <= s; i++) {
      if (number % i == 0) {
        status = "no";
        break;
      }
    }

    if (number <= 1) {
      status = "no";
    }

    res.status(200).send(`${status}`);
  },
  getPreviousNumber: (req, res, next) => {
    let number = req.params.number;
    number = number.replace(/\{|\}/g, "");

    let filePath = path.join(__dirname, "../prevNum.txt");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) return res.status(200).send(`${err}`);
      if (data === "") data = "N/A";
      fs.writeFile(filePath, number, (err2, data2) => {
        if (err2) return res.status(200).send(`${err2}`);
        return res.status(200).send(`${data}`);
      });
    });
  },
};

module.exports = appController;
