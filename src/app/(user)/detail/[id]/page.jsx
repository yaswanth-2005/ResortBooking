"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import UserNavigation from "../../../components/UserNavigation";
import Link from "next/link";

const DynamicPage = () => {
  const [record, setRecord] = useState("");

  const params = useParams();
  const { id } = params;
  console.log("Product Individual Id:", id);

  const dynamicProductHandler = async () => {
    const response = await fetch(
      `http://localhost:3000/api/admin/product/${id}`
    );

    const newData = await response.json();
    setRecord(newData);

    console.log("Dynamic product data", newData);
  };

  useEffect(() => {
    dynamicProductHandler();
  }, []);

  return (
    <div>
      <UserNavigation />
      <Link href="/">
        <p>Go Back</p>
      </Link>
      {record ? (
        <div className="">
          <div className="singleSection">
            <div className="singleLeft">
              <div className="">
                <h2>{record.data.title}</h2>
              </div>
              <img
                src={record.data.image}
                alt={record.data.title}
                className="singleImage"
              />
            </div>
            <div className="singleCenter">
              <div className="singlePrice">Rs.{record.data.price}</div>
              <p className="singleDesc">{record.data.desc}</p>
              <div className="">
                {record.data.amen.map((item, i) => {
                  return (
                    <div className="singleAmen" key={i}>
                      <span>*</span> {item}
                    </div>
                  );
                })}
              </div>
              <div className="offer">
                <span>*</span>
                <button> Discount {record.data.offer}</button>
              </div>
              <div className="singleBtn">
                <button className="">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ position: "absolute", top: "50%", left: "50%" }}>
          {" "}
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </h1>
      )}
    </div>
  );
};

export default DynamicPage;
