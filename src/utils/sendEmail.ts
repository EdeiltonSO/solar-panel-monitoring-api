import { env } from '@/env'
import { MailGenerator, transporter } from '@/app'
import { SendingEmailError } from '../services/errors/sending-email-error'
import { User } from '@prisma/client';

export function sendEmail(user: User, subject: string, intro: string, outro = '') {
  const emailBodyObject = {
    body: {
      greeting: false,
      intro,
      outro,
      signature: false
    }
  }
  const emailBody = MailGenerator.generate(emailBodyObject);

  const mailOptions = {
    from: env.SMTP_EMAIL,
    to: user.email,
    subject,
    html: emailBody
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new SendingEmailError()
    }
  });
}