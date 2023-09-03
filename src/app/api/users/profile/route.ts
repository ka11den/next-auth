import User from "@/lib/model/userModel";
import { connect } from "@/lib/mongoose/mongoose";
import { getToken } from "@/lib/token/getToken";
import { NextRequest, NextResponse } from "next/server";
import { isErrorResponse } from "../../types-guards/type";

connect();

export async function GET(request:NextRequest) {
  try {
    const userId = await getToken(request);
    const user = await User.findOne({_id: userId}).select("-password");

    return NextResponse.json({
      mesaaage: "User found",
      data: user
    })
  } catch (error) {
    if (isErrorResponse(error)) {
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }
}
