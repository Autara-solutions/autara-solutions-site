const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const { name, email, message } = data;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  

  const msg = {
    to: 'autarasolutions@gmail.com', // your real email
    from: 'autarasolutions@gmail.com', // verified sender in SendGrid
    subject: `New Contact Form Submission from ${name}`,
    text: `From: ${name} (${email})\n\nMessage:\n${message}`
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Email failed to send' })
    };
  }
};
