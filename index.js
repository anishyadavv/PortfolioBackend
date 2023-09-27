const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "anishyadav7853@gmail.com",
          pass: "ceaqjzkdrecljnde",
        },
      });
      var success = false;
      const mailOptions = {
        from: "anishyadav7853@gmail.com",
        to: "anishyadav7853@gmail.com",
        subject: "Message from Portfolio",
        html: `<h3>Name: ${name}</h3><h4>Email: ${email}</h4><p>Message: ${message}</p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message);
          res.json({ message: "Error occured",success:success })
        } else {
          console.log("Email sent: " + info.response);
          success = true;
          res.json({ message: "Email sent",success:success })
        }
      });
    } catch (error) {
      console.log(error.message);
    }

});

app.listen(3000||process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});
