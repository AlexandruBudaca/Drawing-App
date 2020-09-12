var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const body = require("body-parser");
const app = express();
app.use(body.json());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ msg: "Welcome!" });
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  auth: {
    user: "alex.andrul10@gmail.com",
    pass: "ypxbpjirelulgoiu",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("All works fine, congratz!");
  }
});

router.post("/send", (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  const subject = request.body.subject;
  const toEmail = request.body.toEmail;
  const message = request.body.message;
  const draw = request.body.draw;

  let mail = {
    from: {
      name: name,
      address: email,
    },
    replyTo: email,
    to: ["alex.andrul10@gmail.com"],
    subject: subject,
    html: message,
    attachments: [
      {
        filename: "draw.jpg",
        content: draw.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };
  if (request.body.toEmail) {
    mail.to.push(toEmail);
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      response.json({
        msg: "fail",
      });
    } else {
      response.json({
        msg: "success",
      });
    }
  });
});

module.exports = router;
