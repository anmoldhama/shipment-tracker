

import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function DELETE(request) {
  
  let payload = await request.json();


  if (!payload.driverid) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = `
    WITH deleted_users AS (
        DELETE FROM users
        WHERE driverid = $1
        RETURNING *
    ),
    deleted_drivers AS (
        DELETE FROM drivers
        WHERE driverid = $1
        RETURNING *
    )
    SELECT 1;
    `;
    // const values = [payload.email, payload.password];
    const values = [payload.driverid];
    const client = await pool.connect();
    // if(values[0])
   
    const rows = await client.query(query, values);
    

    if (rows.rowCount === 1) {
      return NextResponse.json(
        {
          values: values,
          result: "Driver Delete Successfully", 
          success: true

        },
        { status: 201 }
      );

    } else {
      return NextResponse.json({ result: "Enter Correct Data", success: false }, { status: 404 });
    }
  

 
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}