import nodemailer, { SentMessageInfo } from "nodemailer";
import User from "../model/userModel";
import { isErrorResponse } from "@/app/api/types-guards/type";
import { NextResponse } from "next/server";

type userEmail = {
  email: string;
  userId: string;
}

export const sendEmail = async({ email, userId }: userEmail): Promise<SentMessageInfo> => {
  try {
    const hashedToken = Math.round(Math.random() * 90000);

    await User.findByIdAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000
    })

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "",
        pass: ""
      }
    });


    const mailOptions = {
      from: "next-auth@gmail.com",
      to: email,
      subject: "Verify your email",
      html:
      `
        <h1>Yor code ${hashedToken}</h1>
        <p>Click and enter code <a href="http://localhost:3000/verify">here</a>
      `
    }

    const mail = await transport.sendMail(mailOptions);

    return mail;
  } catch (error) {
    if (isErrorResponse(error)) {
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }
}
