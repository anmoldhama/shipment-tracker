

import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function PUT(request) {
  let payload = await request.json();

  if (!payload.shipmentid) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }
//  console.log(payload.username);
  try {
    const query = `update shipments 
    set shipmentstatus = $2,
	actualdeliverydate = $3
    where shipmentid = $1;
    `;
    // const values = [payload.email, payload.password];
    const values = [payload.shipmentid,payload.shipmentstatus,payload.actualdeliverydate];
    const client = await pool.connect();
    // if(values[0])
   
    const rows = await client.query(query, values);
    

    if (rows.rowCount === 1) {
      return NextResponse.json(
        {
          values: values,
          result: "Shipment Updated Successfully", 
          success: true

        },
        { status: 201 }
      );

    } else {
      return NextResponse.json({ result: "Enter Correct Data", success: false }, { status: 404 });
    }
  

 
  } catch (error) {
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}