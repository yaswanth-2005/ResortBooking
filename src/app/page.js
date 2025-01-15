import React from "react";
import { Toaster } from "react-hot-toast";
import DBConnection from "./utils/config/db";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import UserNavigation from "./components/UserNavigation";
import AdminPage from "./admin/page";
import ProductCollection from "../app/components/ProductCollection";

const HomePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  // const productsData = await fetch(
  //   `http://localhost:3000/api/admin/add-product`
  // );
  // const response = await productsData.json();
  // console.log(response.data[0]);

  // console.log("user name: ", session.user.name);
  // console.log(session);
  await DBConnection();
  return (
    <div>
      {session.role === "user" && (
        <>
          <UserNavigation userName={session.username} />
          <h2>welcome to Resort Bookings</h2>
          <ProductCollection />
        </>
      )}

      {session.role === "admin" && (
        <>
          <AdminPage />
        </>
      )}

      <Toaster />
    </div>
  );
};

export default HomePage;
