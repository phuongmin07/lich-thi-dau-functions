const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Lịch thi đấu" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `${name} đã đăng ký nhận lịch thành công`,
      html: `<p>${name} đã đăng ký thành công để nhận thông báo <strong>trận đấu</strong> và <strong>kết quả</strong>.</p>`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Lỗi gửi mail:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
