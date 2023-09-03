import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/mongoose/mongoose";
import User from "@/lib/model/userModel";
import { sendEmail } from "@/lib/mailer/mailer";
import { isErrorResponse } from "../../types-guards/type";

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    const user = await User.findOne({ email })

    if (user) return NextResponse.json({error: "User already exists"}, {status: 400})

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id
    })

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    })

  } catch (error) {
    if (isErrorResponse(error)) {
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }
}
