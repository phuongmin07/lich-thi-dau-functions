import * as functions from "firebase-functions";
import nodemailer from "nodemailer";

// Thông tin email gửi
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "taphuong26633@gmail.com", // Thay bằng Gmail bạn
    pass: "otot famo lkhp tcom", // Mật khẩu ứng dụng Gmail
  },
});

// Cloud Function gửi mail
export const sendMatchScheduleEmail = functions.https.onRequest((req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "taphuong26633@gmail.com", // Hoặc chính email bạn
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    res.set("Access-Control-Allow-Origin", "*"); // Nếu gọi từ web
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully!");
    }
  });
});
