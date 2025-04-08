const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Bật CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Nếu trình duyệt gửi preflight OPTIONS thì trả về luôn
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Chỉ chấp nhận POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Lịch thi đấu" <${process.env.EMAIL_USER}>`,
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
