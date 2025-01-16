"use server";

import { auth } from "../auth";
import DBConnection from "../utils/config/db";
import UserModel from "../utils/models/User";
import BookingModel from "../utils/models/Booking";

export async function bookingAction(bookingDetails) {
  await DBConnection();
  //   console.log("Booking details:", bookingDetails);
  const session = await auth();
  //   console.log("Session", session);
  try {
    const user = await UserModel.findOne({ email: session.email });
    if (!user) {
      return { success: false, message: "User not Found" };
    }
    const userId = user._id.toString();
    console.log(bookingDetails);
    console.log("title", bookingDetails.record.data.title);
    const userBookingDetails = await BookingModel.create({
      startDate: bookingDetails.selectedDates.startDate,
      endDate: bookingDetails.selectedDates.endDate,
      productName: bookingDetails.record.data.title,
      price: bookingDetails.record.data.price,
      offer: bookingDetails.record.data.offer,
      image: bookingDetails.record.data.image,
    });

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { bookings: userBookingDetails._id } },
      { new: true }
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Failed to create booking" };
  }
}
