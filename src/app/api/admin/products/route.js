import DBConnection from "../../../utils/config/db";
import ProductModel from "../../../utils/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await DBConnection();
  try {
    const products = await ProductModel.find({});
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {}
}
