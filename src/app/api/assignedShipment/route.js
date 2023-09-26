import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  let data = await request.json();
//   console.log(data,'datadddddddddddds');

  if (!data.assigneddriverid) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = `SELECT shipmentid,customername,destinationaddress,shipmentstatus,
    TO_CHAR(shipments.planneddeliverydate, 'YYYY-MM-DD') AS planneddeliverydate,
    TO_CHAR(shipments.actualdeliverydate, 'YYYY-MM-DD') AS actualdeliverydate
FROM shipments
WHERE assigneddriverid = $1;`;
       
    // const values = [data.email, data.password];
    const values = [data.assigneddriverid];
    // console.log(values,'valuesssssssssssssssssssssssssss')
    const client = await pool.connect();
    const result  = await client.query(query, values);

    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "Shipment Searched Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "No Assigned Shipment", success: false }, { status: 404 });
    }
  
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}