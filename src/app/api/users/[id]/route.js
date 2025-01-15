import { NextResponse } from "next/server";
import DBConnection from "../../../utils/config/db";
import UserModel from "../../../utils/models/User";

export async function GET(request, { params }) {
  await DBConnection();
  const { id } = params;

  console.log("Dynamic id:", id);

  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "No User Found" },
        { status: 404 }
      );
    }

    const user = await UserModel.findById(id);
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "ID Is Missing" });
  }
}
