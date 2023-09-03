import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { isErrorResponse } from "@/app/api/types-guards/type";

type DecodedToken = {
  id: string;
}

export const getToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: DecodedToken = jwt.verify(token, "JWT") as DecodedToken;

    return decodedToken.id;
  } catch (error) {
    if (isErrorResponse(error)) {
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }
}
