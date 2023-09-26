import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  
  let data = await request.json();
  // console.log(data,'emailllllllllll');

  if (!data.customerName || !data.destinationAddress || !data.plannedDeliveryDate) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = "INSERT INTO shipments (customerName,destinationAddress,plannedDeliveryDate) VALUES ($1, $2, $3)";
    // const values = [data.email, data.password];
    const values = [data.customerName, data.destinationAddress,data.plannedDeliveryDate];
    // console.log(values,'valuesssssssssssssssssssssssssss')
    const client = await pool.connect();
    const rows  = await client.query(query, values);
    // console.log(rows,'rowuiodhuiofhioudhfuiojhf');
    // console.log(rows,'worsssssssssssssssssssss');
    // let arr = JSON.parse(rows)
    // console.log(rows.rowCount,"arrrr")

    if (rows.rowCount === 1) {
      // console.log(values);
      return NextResponse.json(
        {
          values: values,
          result: "Shipment Added Successfully",
          success: true
          
        },
        { status: 201}
      );

    } else {
      return NextResponse.json({ result: "Enter Correct Data", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}