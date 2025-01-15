import DBConnection from "../../utils/config/db";
import UserModel from "../../utils/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await DBConnection();

  try {
    const users = await UserModel.find(
      { role: { $ne: "admin" } },
      { password: 0 }
    );
    if (!users) {
      return NextResponse.json(
        { success: false, message: "No users" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to get Users" },
      { status: 500 }
    );
  }
}
