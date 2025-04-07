const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ message: 'Thiếu thông tin' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'taphuong26633@gmail.com',
      pass: 'mfaoafjpquvzesvv' // mật khẩu ứng dụng từ Google
    },
  });

  try {
    await transporter.sendMail({
      from: 'taphuong26633@gmail.comcom',
      to: email,
      subject,
      text: message,
    });

    res.status(200).json({ message: 'Email đã được gửi!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi gửi email', error });
  }
}
